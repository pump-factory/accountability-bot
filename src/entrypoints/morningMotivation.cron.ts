import { sendMorningReminder } from '../checkins'

sendMorningReminder().then(() => {
	console.log('Morning reminder sent!')
})
