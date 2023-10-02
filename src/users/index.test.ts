import { afterAll, beforeAll, expect, test } from 'vitest'
import { client } from '../db'

beforeAll(async () => {
	await client.connect()
})

afterAll(async () => {
	await client.end()
})

test('starter', async () => {
	const result = await client.query('SELECT 1 AS "1"')
	expect(result.rows).toEqual([{ '1': 1 }])
})
