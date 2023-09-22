import { Context } from 'telegraf'
import { Message, Update } from 'telegraf/typings/core/types/typegram'

export interface CustomContext
	extends Context<{
		message: Update.New & Update.NonChannel & Message.TextMessage
		update_id: number
	}> {
	// TODO: Do we need to make our own types for returned tables?
	user: any
}
