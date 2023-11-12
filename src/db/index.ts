import { Client } from 'pg'

export const client: Client = new Client(process.env.DATABASE_URL)
