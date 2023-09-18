import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome! Let's get accountable"));
bot.help((ctx) => ctx.reply("Implement me!"));
bot.on("text", (ctx) => {
  ctx.reply(ctx.message);
});

bot.launch();
// bot.telegram.sendMessage(5033674135, "yoyo");

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
