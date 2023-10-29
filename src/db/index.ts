import { Client } from 'pg'

const client: Client = new Client(process.env.DATABASE_URL)

export { client }
