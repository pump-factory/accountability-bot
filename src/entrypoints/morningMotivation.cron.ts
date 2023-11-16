import { sendEveningReminder, sendMorningReminder } from '../checkins'
import { client } from '../db'

async function main() {
	await client.connect()

	try {
		await sendMorningReminder()
		console.log('Finished without errors')
	} catch (error) {
		console.error('Failed to send morning reminder', error)
	} finally {
		await client.end()
	}
}

main()
