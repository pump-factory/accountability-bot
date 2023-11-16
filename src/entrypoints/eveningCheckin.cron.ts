import { sendEveningReminder } from '../checkins'

sendEveningReminder().then(() => {
	console.log('Evening reminder sent!')
})
