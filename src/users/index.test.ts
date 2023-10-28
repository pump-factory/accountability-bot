import { afterAll, beforeAll, expect, test } from 'vitest'
import { client } from '../db'
import { findUsersWithoutHabitCompletions } from './users.queries'

beforeAll(async () => {
	await client.connect()
})

afterAll(async () => {
	await client.end()
})

test('find users without habit completions', async () => {
	const result = await findUsersWithoutHabitCompletions.run(
		{ chatId: -1000 },
		client,
	)

	const userNames = result.map((user) => user.name)
	expect(userNames).toEqual(['Dave', 'Nicole'])
})
