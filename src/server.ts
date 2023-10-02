import 'dotenv/config'
import { Telegraf } from 'telegraf'
import cron from 'node-cron'
import {
	createHabit,
	findHabit,
	findHabitsGroupedByChatId,
	logHabitCompletion,
} from './habits/habits.queries'
import {
	findUserByTelegramId,
	findUsersWithoutHabitCompletions,
} from './users/users.queries'
import { CustomContext } from './types'
import { createUserAndUsersChats } from './users'
import { client } from './db'

const start = async () => {
	await client.connect()

	const bot = new Telegraf(process.env.BOT_TOKEN)

	// Register logger middleware
	bot.use((ctx, next) => {
		console.log('new message', ctx.message)
		return next()
	})

	// Register middleware to find or create user and user_chats rows
	bot.use(async (ctx: CustomContext, next) => {
		const userTelegramID = ctx.from.id

		const results = await findUserByTelegramId.run(
			{ telegram_id: userTelegramID },
			client,
		)
		if (results.length >= 1) {
			ctx.user = results[0]
			return next()
		}

		ctx.user = await createUserAndUsersChats(
			ctx.from.first_name,
			userTelegramID,
			ctx.chat.id,
			client,
		)
		next()
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

	bot.start((ctx) => ctx.reply("Welcome! Let's get accountable baby"))

	bot.help((ctx) => ctx.reply('Implement me daddy!'))

	bot.command('create', async (ctx) => {
		if (!ctx.payload) {
			ctx.reply('please provide a habit name')
			return
		}

		const results = await findHabit.run(
			{ title: ctx.payload, chat_id: ctx.chat.id },
			client,
		)
		if (results.length > 0) {
			ctx.reply('habit already exists')
			return
		}

		try {
			await createHabit.run(
				{ title: ctx.payload, chat_id: ctx.chat.id },
				client,
			)
		} catch (err) {
			ctx.reply('error creating habit. please try again')
			return
		}

		await ctx.reply(`Created habit '${ctx.payload}'`)
	})

	/**
	 * Log the completion of a habit
	 * TODO: Figure out how to pass habits. Probably by name. Probably will
	 * need to downcase and suggest similar habits in case of misspellings
	 */
	bot.command('log', async (ctx) => {
		const habitName = ctx.payload
		const results = await findHabit.run(
			{ title: habitName, chat_id: ctx.chat.id },
			client,
		)
		if (results.length === 0) {
			ctx.reply(`habit ${habitName} does not exist`)
			return
		}

		const habit = results[0]
		try {
			await logHabitCompletion.run(
				{
					// @ts-ignore
					user_id: ctx.user.telegram_id,
					habit_id: habit.id,
				},
				client,
			)
		} catch (err) {
			ctx.reply('error logging habit completion. please try again')
			return
		}

		ctx.reply(`🥳 ${ctx.from.first_name} completed: ${habitName}!`)
	})

	// Beginning of day message
	cron.schedule('30 12 * * *', async () => {
		const results = await findHabitsGroupedByChatId.run(undefined, client)
		if (results.length === 0) {
			return
		}

		for (const { chat_id, habits: habitJson } of results) {
			const habits = habitJson as { title: string; id: number }[]
			const habitStr = habits.map((habit) => habit.title).join(', ')

			await bot.telegram.sendMessage(
				chat_id,
				"Good morning, accountability champions! 🌞 Today is a brand new opportunity to find your inner peace and clarity through meditation. Take a deep breath, commit to your practice, and let's make today another successful day on our journey to mindfulness and well-being. 🧘‍♀️🧘‍♂️ #MeditationMasters",
			)
		}
	})

	/**
	 * End of day message
	 * For each unique chat ID
	 * 	- Get list of habits
	 * 	- Find users without a habit_completion for each habit
	 * 	- DM each user that hasn't completed habit?
	 */
	cron.schedule('30 23 * * *', async () => {
		// Find distinct chat IDs
		const chatIdResults = await findHabitsGroupedByChatId.run(undefined, client)
		if (chatIdResults.length === 0) {
			return
		}

		// For each chat ID, find users without a habit completion for each habit
		for (const { chat_id } of chatIdResults) {
			const usersWithoutCompletion = await findUsersWithoutHabitCompletions.run(
				{ chat_id },
				client,
			)

			// If everyone completed their habit, send congratulations
			if (usersWithoutCompletion.length === 0) {
				await bot.telegram.sendMessage(
					chat_id,
					"Congratulations, everyone! 🎉 You've all rocked your meditation practice today, and your dedication is truly inspiring. Let's keep this positive momentum going as we continue to prioritize our well-being together. 🧘‍♀️🧘‍♂️ #MeditationMasters",
				)
				continue
			}

			// Remind any users who haven't completed their habit to do so
			const userNames = usersWithoutCompletion.map((user) => user.name)
			await bot.telegram.sendMessage(
				chat_id,
				`${userNames.join(
					', ',
				)} still need to complete their habits, go ahead and give them some encouragement!`,
			)
		}
	})

	await bot.launch()

	// Enable graceful stop
	process.once('SIGINT', () => bot.stop('SIGINT'))
	process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

start().then(() => console.log('Bot started'))
