import cron from 'node-cron'
import { findHabitsGroupedByChatId } from './habits/habits.queries'
import { client } from './db'
import { bot } from './bot'
import { findUsersWithoutHabitCompletions } from './users/users.queries'

export async function sendMorningReminder() {
	const results = await findHabitsGroupedByChatId.run(undefined, client)
	if (results.length === 0) {
		return
	}

	for (const { chatId, habits: habitJson } of results) {
		const habits = habitJson as { title: string; id: number }[]
		const habitStr = habits.map((habit) => habit.title).join(', ')

		await bot.telegram.sendMessage(
			chatId,
			"Good morning, accountability champions! 🌞 Today is a brand new opportunity to find your inner peace and clarity through meditation. Take a deep breath, commit to your practice, and let's make today another successful day on our journey to mindfulness and well-being. 🧘‍♀️🧘‍♂️ #MeditationMasters",
		)
	}
}

/**
 * End of day message
 * For each unique chat ID
 * 	- Get list of habits
 * 	- Find users without a habit_completion for each habit
 * 	- DM each user that hasn't completed habit?
 */
export async function sendEveningReminder() {
	// Find distinct chat IDs
	const chatIdResults = await findHabitsGroupedByChatId.run(undefined, client)
	if (chatIdResults.length === 0) {
		return
	}

	// For each chat ID, find users without a habit completion for each habit
	for (const { chatId } of chatIdResults) {
		const usersWithoutCompletion = await findUsersWithoutHabitCompletions.run(
			{ chatId },
			client,
		)

		// If everyone completed their habit, send congratulations
		if (usersWithoutCompletion.length === 0) {
			await bot.telegram.sendMessage(
				chatId,
				"Congratulations, everyone! 🎉 You've all rocked your meditation practice today, and your dedication is truly inspiring. Let's keep this positive momentum going as we continue to prioritize our well-being together. 🧘‍♀️🧘‍♂️ #MeditationMasters",
			)
			continue
		}

		// Remind any users who haven't completed their habit to do so
		const userNames = usersWithoutCompletion.map((user) => user.name)
		await bot.telegram.sendMessage(
			chatId,
			`${userNames.join(
				', ',
			)} still need to complete their habits, go ahead and give them some encouragement!`,
		)
	}
}

export function scheduleCronJobs() {
	// Morning. 10:30AM EST
	cron.schedule('30 10 * * *', sendMorningReminder, {
		timezone: 'America/New_York',
	})

	// Evening. 8PM EST
	cron.schedule('0 20 * * *', sendEveningReminder, {
		timezone: 'America/New_York',
	})
}
