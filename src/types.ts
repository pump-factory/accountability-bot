import { Context } from 'telegraf'

export interface CustomContext extends Context {
	// TODO: Do we need to make our own types for returned tables?
	user: any
}
