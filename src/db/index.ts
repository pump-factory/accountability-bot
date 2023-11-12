import { Client } from 'pg'

export const client: Client = new Client({
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DATABASE,
	host: process.env.POSTGRES_HOST,
})
