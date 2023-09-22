import { Context } from 'telegraf'

export interface CustomContext extends Context {
	user: any
}
