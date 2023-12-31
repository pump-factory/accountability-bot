import {
	findHabitsByChatId,
	findHabitsGroupedByChatId,
	findRecentHabitEvents,
	findUsersInChat,
	IFindUsersInChatResult,
} from './habits/habits.queries'
import { client } from './db'
import { bot } from './bot'
import {
	buildEveningChatRequest,
	buildMorningChatRequest,
	generateChatMessage,
} from './openai'
import { ChatCompletionMessageParam } from 'openai/resources'
import { Markup } from 'telegraf'

const defaultMorningMessage = `Good morning, accountability champions! 🌞 Today is a brand new opportunity to find your inner peace and clarity through meditation. Take a deep breath, commit to your practice, and let's make today another successful day on our journey to mindfulness and well-being. 🧘‍♀️🧘‍♂️ #MeditationMasters`

export async function sendMorningReminder() {
	console.log('Sending morning motivation')

	const results = await findHabitsGroupedByChatId.run(undefined, client)
	if (results.length === 0) {
		console.log('No habits found for any chats')
		return
	}

	for (const { chatId, habits: habitJson } of results) {
		const habits = habitJson as { title: string; id: number }[]
		const users = await findUsersInChat.run({ chatId }, client)

		console.log('Generating message for chat..', {
			chatId,
			habitCount: habits.length,
			userCount: users.length,
		})

		const userMessage: ChatCompletionMessageParam = buildMorningChatRequest(
			users,
			habits,
		)

		let chatMessage = defaultMorningMessage
		if (process.env.ENABLE_AI_MESSAGES === 'true') {
			console.log('Generating chat message with 🪄 AI', { chatId })

			try {
				const maybeChatMessage = await generateChatMessage([userMessage])

				if (maybeChatMessage) {
					chatMessage = maybeChatMessage
				}
			} catch (error) {
				console.error(
					'Failed to generate chat message with 🪄 AI. Falling back to default',
					error,
				)
			}
		}

		await bot.telegram.sendMessage(
			chatId,
			chatMessage,
			Markup.inlineKeyboard(
				habits.map((habit) =>
					Markup.button.callback(habit.title, habit.id.toString()),
				),
			),
		)
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
		console.log('No habits found for any chats')
		return
	}

	// For each chat ID, find users without a habit completion for each habit
	for (const { chatId } of chatIdResults) {
		const habits = await findHabitsByChatId.run({ chatId }, client)
		const users = await findUsersInChat.run({ chatId }, client)

		if (habits.length === 0) {
			console.log(`No habits found for chat. Skipping`, chatId)
			continue
		}

		if (users.length === 0) {
			console.log(`No users found for chat. Skipping`, chatId)
			continue
		}

		const incompleteHabits: Record<string, IFindUsersInChatResult[]> = {}
		for (const habit of habits) {
			incompleteHabits[habit.title] = [...users]

			const habitEvents = await findRecentHabitEvents.run(
				{
					habitId: habit.id,
				},
				client,
			)

			console.log(`Recent HabitEvents for habit: ${habit.title}`, habitEvents)

			// remove users from incompleteHabits[habit.title] if they have a habitEvent
			for (const habitEvent of habitEvents) {
				const index = incompleteHabits[habit.title].findIndex(
					(user) => user.id === habitEvent.userId,
				)
				if (index !== -1) {
					incompleteHabits[habit.title].splice(index, 1)
				}
			}
		}

		// flatten and filter array for unique values
		const usersWithoutCompletion = Object.values(incompleteHabits)
			.flat()
			.filter(
				(user, index, users) =>
					users.findIndex((u) => u.id === user.id) === index,
			)

		console.log('Users without habit completions today', usersWithoutCompletion)
		let chatMessage = buildDefaultEveningMessage(usersWithoutCompletion)

		if (process.env.ENABLE_AI_MESSAGES === 'true') {
			console.log('Generating chat message with 🪄 AI', { chatId })
			const userMessage: ChatCompletionMessageParam = buildEveningChatRequest(
				usersWithoutCompletion,
				habits,
			)

			try {
				const maybeChatMessage = await generateChatMessage([userMessage])

				if (maybeChatMessage) {
					chatMessage = maybeChatMessage
				}
			} catch (error) {
				console.error(
					'Failed to generate chat message with 🪄 AI. Falling back to default',
					error,
				)
			}
		}

		await bot.telegram.sendMessage(chatId, chatMessage)
	}
}

function buildDefaultEveningMessage(users: IFindUsersInChatResult[]) {
	return users.length === 0
		? `Congrats everyone! You've all rocked your habits today 🎉`
		: `${users
				.map((user) => user.name)
				.join(
					', ',
				)} still need to complete their habits. Give them some encouragement.`
}
