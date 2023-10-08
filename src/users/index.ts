import { Client } from 'pg'
import { createUser, ICreateUserResult } from './users.queries'

export async function createUserAndUsersChats(
	name: string,
	telegramId: number,
	chatId: number,
	client: Client,
): Promise<ICreateUserResult> {
	const result = await createUser.run(
		{
			name,
			chatId: chatId,
			telegramId: telegramId,
		},
		client,
	)

	return result[0]
}
