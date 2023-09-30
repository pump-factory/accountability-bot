import { Client } from 'pg'
import {
	createUser,
	createUsersChats,
	ICreateUserResult,
} from './users.queries'

export async function createUserAndUsersChats(
	name: string,
	telegramId: number,
	chatId: number,
	client: Client,
): Promise<ICreateUserResult> {
	const result = await createUser.run(
		{
			name,
			telegram_id: telegramId,
		},
		client,
	)

	await createUsersChats.run(
		{
			user_id: telegramId,
			chat_id: chatId,
		},
		client,
	)

	return result[0]
}
