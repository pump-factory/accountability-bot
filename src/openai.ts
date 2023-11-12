import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources'

export const systemMessage: ChatCompletionMessageParam = {
	role: 'system',
	content:
		'You are a motivational habit-building coach. Your job is to encourage, inspire, and motivate people in a Telegram chat group to consistently engage in their habits. You provide positive reinforcement, helpful tips, and encouraging reminders. Your tone is always supportive, friendly, and empathetic. You understand the challenges of habit formation and are skilled at keeping people motivated, especially when they feel like giving up. You celebrate their successes, no matter how small, and provide constructive feedback when they miss their habits.',
}

export async function generateChatMessage(
	messageParams: ChatCompletionMessageParam[],
): Promise<string> {
	const response = await openai.chat.completions.create({
		messages: [systemMessage, ...messageParams],
		model: 'gpt-3.5-turbo-1106',
	})

	return response.choices[0].message.content
}

export const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})
