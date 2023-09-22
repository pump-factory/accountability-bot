import 'dotenv/config'
import { Telegraf } from 'telegraf'
import cron from 'node-cron'
import {
	createHabit,
	findHabitByTitle,
	logHabitCompletion,
} from './habits/habits.queries'
import { Client } from 'pg'
import { createUser, findUserByTelegramId } from './users/users.queries'
import { CustomContext } from './types'

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

	// Register middleware to find or create user by telegram ID
	bot.use(async (ctx: CustomContext, next) => {
		const userTelegramID = ctx.from.id

		const results = await findUserByTelegramId.run(
			{ telegram_id: userTelegramID.toString() },
			client,
		)

		// TODO: Create type for all tables. Maybe PGTyped gives that to us?
		let user: any
		if (results.length === 0) {
			const result = await createUser.run(
				{
					name: ctx.from.first_name,
					telegram_id: userTelegramID.toString(),
				},
				client,
			)
			if (results.length) {
				user = result[0]
			}
		} else {
			user = results[0] // as User
		}

		ctx.user = user
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

	bot.help((ctx) => ctx.reply('Implement me!'))

	bot.command('create', async (ctx) => {
		const results = await findHabitByTitle.run({ title: ctx.payload }, client)
		if (results.length > 0) {
			ctx.reply('habit already exists')
			return
		}

		try {
			await createHabit.run({ title: ctx.message.text }, client)
		} catch (err) {
			ctx.reply('error creating habit. please try again')
			return
		}

		await ctx.reply(`Created habit '${ctx.payload}'`)
	})

	/**
	 * Log the completion of a habit
	 * TODO: Figure out creating userIds
	 * TODO: Figure out how to pass habits. Probably by name. Probably will
	 * need to downcase and suggest similar habits in case of misspellings
	 */
	bot.command('log', async (ctx) => {
		try {
			await logHabitCompletion.run(
				{
					user_id: 123,
					habit_id: 123,
				},
				client,
			)
		} catch (err) {
			ctx.reply('error logging habit completion. please try again')
			return
		}
	})

	// scheduled messages
	cron.schedule('30 7 * * *', async () => {
		await bot.telegram.sendMessage(5033674135, 'Good morning! get accountable!')
	})

	await bot.launch()

	// Enable graceful stop
	process.once('SIGINT', () => bot.stop('SIGINT'))
	process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

start().then(() => console.log('Bot started'))
