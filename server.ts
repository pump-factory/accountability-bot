import { Telegraf } from "telegraf";
import cron from "node-cron";

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome! Let's get accountable"));
bot.help((ctx) => ctx.reply("Implement me!"));
bot.on("text", (ctx) => {
  ctx.reply(ctx.message);
});

// scheduled messages
cron.schedule("30 7 * * *", () => {
  bot.telegram.sendMessage(5033674135, "Good morning! get accountable!");
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
