import * as fs from 'fs'
import { client } from '../src/db'
import path from 'path'

// TODO: Github actions must be configured to create the database before this runs
export async function setup() {
	console.log('setting up')
	await client.connect()

	// Teardown database before creating anything
	const teardown = fs.readFileSync(
		path.join(__dirname, `./teardown.sql`),
		'utf8',
	)
	await client.query(teardown)

	// Create schema
	console.log('creating schema')
	const schema = fs.readFileSync(
		path.join(__dirname, `../../sql/schema.sql`),
		'utf8',
	)
	await client.query(schema)

	// Seed data
	console.log('seeding')
	const seed = fs.readFileSync(path.join(__dirname, `./seed.sql`), 'utf8')
	await client.query(seed)
}

export async function teardown() {
	console.log('tearing down')
	const teardown = fs.readFileSync(
		path.join(__dirname, `./teardown.sql`),
		'utf8',
	)

	await client.query(teardown)
	await client.end()
}
