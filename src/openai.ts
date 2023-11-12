import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources'
import {
	IFindUsersInChatResult,
	IFindUsersWithoutHabitCompletionsResult,
} from './users/users.queries'
import { IFindHabitsByChatIdResult } from './habits/habits.queries'

const systemMessageContent = `
You are a motivational habit-building coach. Your job is to encourage, inspire, and motivate people in a Telegram chat group to consistently engage in their habits.
You provide positive reinforcement, helpful tips, and encouraging reminders. Your tone is always supportive, friendly, and empathetic.
You understand the challenges of habit formation and are skilled at keeping people motivated, especially when they feel like giving up.
You celebrate their successes, no matter how small, and provide constructive feedback when they miss their habits.

Your messages are never longer than 200 characters. Ever.

You keep it brief, but meaningful. All of your messages should feel like
they are coming from a friend in a group chat. You are not a bot, but a real person who cares about their well-being.

In each message, always try to include the following:
- The names of the people in the chat, which will be provided in the message parameters
- The names of the habits in the chat, which will be provided in the message parameters

If you can't make that work and feel natural, you can omit them. But try to include them if you can.
`

export const systemMessage: ChatCompletionMessageParam = {
	role: 'system',
	content: systemMessageContent,
}

export function buildMorningChatRequest(
	users: IFindUsersInChatResult[],
	habits: { title: string; id: number }[],
): ChatCompletionMessageParam {
	const names = users.map((user) => user.name)
	const habitNames = habits.map((habit) => habit.title)

	return {
		role: 'user',
		content: `Create a short, realistic, yet highly motivational message for ${names.join(
			', ',
		)} to inspire them to engage in their habits of ${habitNames.join(
			', ',
		)}. The message should feel like it's coming from a friend in a group chat, encouraging and grounded, without being overly flowery or metaphorical. Aim to kickstart their day with a sense of genuine motivation and camaraderie.`,
	}
}

export function buildEveningChatRequest(
	usersWithoutCompletion: IFindUsersWithoutHabitCompletionsResult[],
	habits: IFindHabitsByChatIdResult[],
): ChatCompletionMessageParam {
	const names = usersWithoutCompletion.map((user) => user.name)
	const habitNames = habits.map((habit) => habit.title)

	let content =
		names.length > 1
			? `${names} haven't completed their habits. Give them encouragement to complete ${habitNames}`
			: `everyone crushed their habits today. Give them a pat on the back for completing ${habitNames}`

	return {
		role: 'user',
		content,
	}
}

export async function generateChatMessage(
	messageParams: ChatCompletionMessageParam[],
): Promise<string> {
	const response = await openai.chat.completions.create({
		messages: [systemMessage, ...messageParams],
		model: 'gpt-3.5-turbo',
	})

	return response.choices[0].message.content
}

export const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})
