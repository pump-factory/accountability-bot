import { Telegraf } from 'telegraf'

export const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply("Welcome! Let's get accountable baby"))
bot.help((ctx) => ctx.reply('Implement me daddy!'))
