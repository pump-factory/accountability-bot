import cron from 'node-cron'
import {
	findHabitsByChatId,
	findHabitsGroupedByChatId,
} from './habits/habits.queries'
import { client } from './db'
import { bot } from './bot'
import {
	findUsersInChat,
	findUsersWithoutHabitCompletions,
} from './users/users.queries'
import {
	buildEveningChatRequest,
	buildMorningChatRequest,
	generateChatMessage,
} from './openai'
import { ChatCompletionMessageParam } from 'openai/resources'

const defaultMorningMessage = `Good morning, accountability champions! 🌞 Today is a brand new opportunity to find your inner peace and clarity through meditation. Take a deep breath, commit to your practice, and let's make today another successful day on our journey to mindfulness and well-being. 🧘‍♀️🧘‍♂️ #MeditationMasters`

export async function sendMorningReminder() {
	const results = await findHabitsGroupedByChatId.run(undefined, client)
	if (results.length === 0) {
		return
	}

	for (const { chatId, habits: habitJson } of results) {
		const habits = habitJson as { title: string; id: number }[]
		const users = await findUsersInChat.run({ chatId }, client)

		const userMessage: ChatCompletionMessageParam = buildMorningChatRequest(
			users,
			habits,
		)

		let chatMessage = defaultMorningMessage
		if (process.env.ENABLE_AI_MESSAGES === 'true') {
			try {
				chatMessage = await generateChatMessage([userMessage])
			} catch (error) {
				console.error('Failed to generate chat message', error)
			}
		}

		await bot.telegram.sendMessage(chatId, chatMessage)
	}
}

/**
 * End of day message
 * Finds users without HabitEvents for any habits in the chat
 * and encourages them to complete their habit.
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

		const habits = await findHabitsByChatId.run({ chatId }, client)
		if (habits.length === 0) {
			continue
		}

		// Build default message
		let chatMessage: string =
			usersWithoutCompletion.length === 0
				? `Congrats everyone!  You've all rocked your habits today🎉`
				: `${usersWithoutCompletion
						.map((user) => user.name)
						.join(
							', ',
						)} still need to complete their habits. Give them some encouragement.`

		if (process.env.ENABLE_AI_MESSAGES === 'true') {
			const userMessage: ChatCompletionMessageParam = buildEveningChatRequest(
				usersWithoutCompletion,
				habits,
			)

			try {
				chatMessage = await generateChatMessage([userMessage])
			} catch (error) {
				console.error('Failed to generate chat message', error)
			}
		}

		await bot.telegram.sendMessage(chatId, chatMessage)
	}
}

export function scheduleCronJobs() {
	console.log('scheduling cron jobs')

	// Morning. 10:30AM EST
	cron.schedule(
		'30 10 * * *',
		async function () {
			console.log('CRON: morning reminder')
			await sendMorningReminder()
		},
		{
			timezone: 'America/New_York',
		},
	)

	// Evening. 8PM EST
	cron.schedule(
		'0 20 * * *',
		async function () {
			console.log('CRON: evening reminder')
			await sendEveningReminder()
		},
		{
			timezone: 'America/New_York',
		},
	)

	// Keep the bot alive
	cron.schedule('0/14 * * * *', async function () {
		console.log('CRON: healthcheck')
		await fetch(process.env.HEALTHCHECK_URL)
	})
}
