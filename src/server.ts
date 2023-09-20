import { Telegraf } from 'telegraf'
import cron from 'node-cron'
import { createHabit, findHabitByTitle } from './habits/habits.queries'
import { Client } from 'pg'
import { create } from 'domain'

const client = new Client({
	connectionString: process.env.DATABASE_URL,
})

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply("Welcome! Let's get accountable"))
bot.help((ctx) => ctx.reply('Implement me!'))
bot.on('text', (ctx) => {
	ctx.reply(ctx.message)
})

bot.command('create', async (ctx) => {
	const existing = await findHabitByTitle.run(
		{ title: ctx.message.text },
		client,
	)

	if (existing) {
		ctx.reply('habit already exists')
		return
	}

	try {
		await createHabit.run({ title: ctx.message.text }, client)
	} catch (err) {
		ctx.reply('error creating habit. please try again')
	}

	await ctx.reply('created new daily habit')
})

// scheduled messages
cron.schedule('30 7 * * *', () => {
	bot.telegram.sendMessage(5033674135, 'Good morning! get accountable!')
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
