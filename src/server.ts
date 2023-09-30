import 'dotenv/config'
import { Telegraf } from 'telegraf'
import cron from 'node-cron'
import {
	createHabit,
	findHabit,
	findHabitsGroupedByChatId,
	logHabitCompletion,
} from './habits/habits.queries'
import { Client } from 'pg'
import { findUserByTelegramId } from './users/users.queries'
import { CustomContext } from './types'
import { remindUsersToCompleteHabits } from './habits'
import { createUserAndUsersChats } from './users'

const start = async () => {
	const client = new Client({
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DATABASE,
		host: process.env.POSTGRES_HOST,
	})
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
	cron.schedule('30 23 * * *', () => remindUsersToCompleteHabits(bot, client))

	await bot.launch()

	// Enable graceful stop
	process.once('SIGINT', () => bot.stop('SIGINT'))
	process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

start().then(() => console.log('Bot started'))
