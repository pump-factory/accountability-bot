import 'dotenv/config'
import { Markup } from 'telegraf'
import {
	createHabit,
	createHabitChat,
	deleteHabitFollowersForUserAndChat,
	deleteUserChat,
	findHabit,
	findHabitByTitle,
	findHabitsByChatId,
	logHabitCompletion,
} from '../habits/habits.queries'
import {
	createHabitFollower,
	createUser,
	findUserByTelegramId,
	findUsersInChat,
	IFindUserByTelegramIdResult,
} from '../users/users.queries'
import { client } from '../db'
import { bot } from '../bot'
import { sendEveningReminder, sendMorningReminder } from '../checkins'
import { createServer } from 'http'
import { invariant } from '../invariant'

const start = async () => {
	await client.connect()

	// Register logger middleware
	bot.use((ctx, next) => {
		console.log('new message', ctx.message)
		return next()
	})

	// Register middleware to find or create user and user_chats rows
	bot.use(async (ctx, next) => {
		invariant(ctx.from, 'ctx.from is undefined')
		invariant(ctx.chat, 'ctx.chat is undefined')

		const telegramId = ctx.from.id

		const results = await findUserByTelegramId.run({ telegramId }, client)
		if (results.length >= 1) {
			// @ts-ignore
			ctx.user = results[0]
			return next()
		}

		await createUser.run(
			{
				name: ctx.from.first_name,
				chatId: ctx.chat.id,
				telegramId,
			},
			client,
		)

		await next()
	})

	await bot.telegram.setMyCommands([
		{
			command: 'log',
			description: 'log the completion of a habit',
		},
		{
			command: 'create',
			description: 'create a new habit',
		},
	])

	/**
	 * When a new user joins a chat, create a user, user_chat, and habit_follower record for each habit in the chat
	 */
	bot.on('new_chat_members', async (ctx) => {
		const newUsers = ctx.update.message.new_chat_members

		for (const newUser of newUsers) {
			await createUser.run(
				{
					name: newUser.first_name,
					chatId: ctx.chat.id,
					telegramId: newUser.id,
				},
				client,
			)

			// Find all habits in this chat
			const habits = await findHabitsByChatId.run(
				{ chatId: ctx.chat.id },
				client,
			)
			for (const habit of habits) {
				await createHabitFollower.run(
					{ habitId: habit.id, telegramId: newUser.id },
					client,
				)
			}
		}
	})

	bot.on('left_chat_member', async (ctx) => {
		const leftUser = ctx.update.message.left_chat_member
		await deleteHabitFollowersForUserAndChat.run(
			{ telegramId: leftUser.id, chatId: ctx.chat.id },
			client,
		)

		await deleteUserChat.run(
			{ telegramId: leftUser.id, chatId: ctx.chat.id },
			client,
		)
	})

	bot.command('create', async (ctx) => {
		if (!ctx.payload) {
			ctx.reply('please provide a habit name')
			return
		}

		const results = await findHabitByTitle.run(
			{ title: ctx.payload, chatId: ctx.chat.id },
			client,
		)
		if (results.length > 0) {
			ctx.reply('habit already exists')
			return
		}

		/**
		 * Create a new habit, which now has a few parts:
		 * 1. Create the Habit record
		 * 2. Create the HabitChat record
		 * 3. Create a HabitFollower record for each user in the chat
		 */
		try {
			const habitResult = await createHabit.run({ title: ctx.payload }, client)
			const habit = habitResult[0]

			await createHabitChat.run(
				{ habitId: habit.id, chatId: ctx.chat.id },
				client,
			)

			const chatId = ctx.update.message.chat.id
			const users = await findUsersInChat.run({ chatId }, client)

			for (const user of users) {
				if (!user.telegramId) {
					console.log('user does not have a telegram id', user.name)
					continue
				}

				await createHabitFollower.run(
					{ habitId: habit.id, telegramId: user.telegramId },
					client,
				)
			}
		} catch (err) {
			ctx.reply('error creating habit. please try again')
			return
		}

		await ctx.reply(`Created habit '${ctx.payload}'`)
	})

	bot.command('log', async (ctx) => {
		const habits = await findHabitsByChatId.run({ chatId: ctx.chat.id }, client)
		if (habits.length === 0) {
			ctx.reply(
				'There are no habits being tracked in this chat. Create one with /create',
			)
			return
		}

		if (habits.length === 1) {
			const habit = habits[0]
			const user = (ctx as any).user as IFindUserByTelegramIdResult

			await logHabitCompletion.run(
				{
					telegramId: user.telegramId,
					habitId: habit.id,
				},
				client,
			)

			return ctx.reply(`🥳 ${ctx.from.first_name} completed: ${habit.title}!`)
		}

		ctx.reply(
			'Which habit do you want to complete?',
			Markup.inlineKeyboard(
				habits.map((habit) =>
					Markup.button.callback(habit.title, habit.id.toString()),
				),
			),
		)
	})

	bot.command('morning', sendMorningReminder)
	bot.command('evening', sendEveningReminder)

	bot.action(/.+/, async (ctx) => {
		invariant(ctx.chat, 'ctx.chat is undefined')
		invariant(ctx.from, 'ctx.from is undefined')

		await ctx.editMessageReplyMarkup(undefined)
		if (!ctx.match[0]) {
			ctx.reply('error logging habit completion. please try again')
			return
		}
		const habitId = ctx.match[0]
		const results = await findHabit.run(
			{ habitId, chatId: ctx.chat.id },
			client,
		)
		if (results.length === 0) {
			ctx.reply(`habit with ID ${habitId} does not exist`)
			return
		}

		const habit = results[0]
		const user = (ctx as any).user as IFindUserByTelegramIdResult

		try {
			await logHabitCompletion.run(
				{
					telegramId: user.telegramId,
					habitId: habit.id,
				},
				client,
			)
		} catch (err) {
			ctx.reply('error logging habit completion. please try again')
			return
		}

		ctx.reply(`🥳 ${ctx.from.first_name} completed: ${habit.title}!`)
	})

	try {
		await bot.launch()
	} catch (error) {
		// NOTE: We do this to work around Render's zero-downtime deploys.
		// When the new version rolls out, Render keeps the old version running for some time period.
		// If the old version is still running, we'll get an error that there is already a bot instance.

		// TODO: Check for the specific error and only retry if it's multiple instances error

		console.log('Error launching bot. Retrying in 3 seconds', error)
		setTimeout(async () => {
			await bot.launch()
		}, 3000)
	}
}

function startServer() {
	const server = createServer((req, res) => {
		if (req.url === '/health-w234kj234lkj234lk2j34' && req.method === 'GET') {
			console.log('health check. ok')
			res.writeHead(200, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify({ status: 'healthy' }))
		} else {
			res.writeHead(404, { 'Content-Type': 'text/plain' })
			res.end('Not Found')
		}
	})

	if (process.env.PORT) {
		server.listen(process.env.PORT, () => {
			console.log(`Server is running on port ${process.env.PORT}`)
		})
	}
}

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

start().then(() => console.log('Bot died'))
startServer()
