import { findHabitsGroupedByChatId } from './habits.queries'
import { findUsersWithoutHabitCompletions } from '../users/users.queries'
import { Client } from 'pg'
import { Context, Telegraf } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'

export async function remindUsersToCompleteHabits(
	bot: Telegraf<Context<Update>>,
	client: Client,
) {
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
}
