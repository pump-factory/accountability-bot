/** Types generated for queries found in "src/users/users.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindUserByTelegramId' parameters type */
export interface IFindUserByTelegramIdParams {
  telegram_id?: number | null | void;
}

/** 'FindUserByTelegramId' return type */
export interface IFindUserByTelegramIdResult {
  created_at: Date;
  name: string;
  telegram_id: number;
  updated_at: Date;
}

/** 'FindUserByTelegramId' query type */
export interface IFindUserByTelegramIdQuery {
  params: IFindUserByTelegramIdParams;
  result: IFindUserByTelegramIdResult;
}

const findUserByTelegramIdIR: any = {"usedParamSet":{"telegram_id":true},"params":[{"name":"telegram_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":40,"b":51}]}],"statement":"select *\nfrom users\nwhere telegram_id = :telegram_id\nlimit 1"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from users
 * where telegram_id = :telegram_id
 * limit 1
 * ```
 */
export const findUserByTelegramId = new PreparedQuery<IFindUserByTelegramIdParams,IFindUserByTelegramIdResult>(findUserByTelegramIdIR);


/** 'CreateUser' parameters type */
export interface ICreateUserParams {
  name?: string | null | void;
  telegram_id?: number | null | void;
}

/** 'CreateUser' return type */
export interface ICreateUserResult {
  created_at: Date;
  name: string;
  telegram_id: number;
  updated_at: Date;
}

/** 'CreateUser' query type */
export interface ICreateUserQuery {
  params: ICreateUserParams;
  result: ICreateUserResult;
}

const createUserIR: any = {"usedParamSet":{"telegram_id":true,"name":true},"params":[{"name":"telegram_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":46,"b":57}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":60,"b":64}]}],"statement":"insert into users (telegram_id, name)\nvalues (:telegram_id, :name)\nreturning *"};

/**
 * Query generated from SQL:
 * ```
 * insert into users (telegram_id, name)
 * values (:telegram_id, :name)
 * returning *
 * ```
 */
export const createUser = new PreparedQuery<ICreateUserParams,ICreateUserResult>(createUserIR);


/** 'FindUsersWithoutHabitCompletions' parameters type */
export interface IFindUsersWithoutHabitCompletionsParams {
  chat_id?: number | string | null | void;
}

/** 'FindUsersWithoutHabitCompletions' return type */
export interface IFindUsersWithoutHabitCompletionsResult {
  created_at: Date;
  name: string;
  telegram_id: number;
  updated_at: Date;
}

/** 'FindUsersWithoutHabitCompletions' query type */
export interface IFindUsersWithoutHabitCompletionsQuery {
  params: IFindUsersWithoutHabitCompletionsParams;
  result: IFindUsersWithoutHabitCompletionsResult;
}

const findUsersWithoutHabitCompletionsIR: any = {"usedParamSet":{"chat_id":true},"params":[{"name":"chat_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":399,"b":406}]}],"statement":"SELECT users.*\nFROM users\n         JOIN users_chats ON users.telegram_id = users_chats.user_id\n         LEFT JOIN habit_completions ON (\n            habit_completions.user_id = users.telegram_id AND\n            habit_completions.completed_at = CURRENT_DATE\n    )\n         LEFT JOIN habits ON habits.id = habit_completions.habit_id\nWHERE habit_completions.user_id IS NULL\n  AND users_chats.chat_id = :chat_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT users.*
 * FROM users
 *          JOIN users_chats ON users.telegram_id = users_chats.user_id
 *          LEFT JOIN habit_completions ON (
 *             habit_completions.user_id = users.telegram_id AND
 *             habit_completions.completed_at = CURRENT_DATE
 *     )
 *          LEFT JOIN habits ON habits.id = habit_completions.habit_id
 * WHERE habit_completions.user_id IS NULL
 *   AND users_chats.chat_id = :chat_id
 * ```
 */
export const findUsersWithoutHabitCompletions = new PreparedQuery<IFindUsersWithoutHabitCompletionsParams,IFindUsersWithoutHabitCompletionsResult>(findUsersWithoutHabitCompletionsIR);


/** 'FindDistinctChatIds' parameters type */
export type IFindDistinctChatIdsParams = void;

/** 'FindDistinctChatIds' return type */
export interface IFindDistinctChatIdsResult {
  chat_id: string;
}

/** 'FindDistinctChatIds' query type */
export interface IFindDistinctChatIdsQuery {
  params: IFindDistinctChatIdsParams;
  result: IFindDistinctChatIdsResult;
}

const findDistinctChatIdsIR: any = {"usedParamSet":{},"params":[],"statement":"select distinct chat_id\nfrom users_chats"};

/**
 * Query generated from SQL:
 * ```
 * select distinct chat_id
 * from users_chats
 * ```
 */
export const findDistinctChatIds = new PreparedQuery<IFindDistinctChatIdsParams,IFindDistinctChatIdsResult>(findDistinctChatIdsIR);


/** 'CreateUsersChats' parameters type */
export interface ICreateUsersChatsParams {
  chat_id?: number | string | null | void;
  user_id?: number | string | null | void;
}

/** 'CreateUsersChats' return type */
export type ICreateUsersChatsResult = void;

/** 'CreateUsersChats' query type */
export interface ICreateUsersChatsQuery {
  params: ICreateUsersChatsParams;
  result: ICreateUsersChatsResult;
}

const createUsersChatsIR: any = {"usedParamSet":{"user_id":true,"chat_id":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":51,"b":58}]},{"name":"chat_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":61,"b":68}]}],"statement":"insert into users_chats (user_id, chat_id)\nvalues (:user_id, :chat_id)\non conflict do nothing"};

/**
 * Query generated from SQL:
 * ```
 * insert into users_chats (user_id, chat_id)
 * values (:user_id, :chat_id)
 * on conflict do nothing
 * ```
 */
export const createUsersChats = new PreparedQuery<ICreateUsersChatsParams,ICreateUsersChatsResult>(createUsersChatsIR);


