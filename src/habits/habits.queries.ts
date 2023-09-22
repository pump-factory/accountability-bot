/** Types generated for queries found in "src/habits/habits.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

/** 'FindHabitsByChatId' parameters type */
export type IFindHabitsByChatIdParams = void;

/** 'FindHabitsByChatId' return type */
export interface IFindHabitsByChatIdResult {
  chat_id: number;
  created_at: Date;
  description: string | null;
  id: number;
  title: string;
  updated_at: Date;
}

/** 'FindHabitsByChatId' query type */
export interface IFindHabitsByChatIdQuery {
  params: IFindHabitsByChatIdParams;
  result: IFindHabitsByChatIdResult;
}

const findHabitsByChatIdIR: any = {"usedParamSet":{},"params":[],"statement":"select *\nfrom habits"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from habits
 * ```
 */
export const findHabitsByChatId = new PreparedQuery<IFindHabitsByChatIdParams,IFindHabitsByChatIdResult>(findHabitsByChatIdIR);


/** 'FindHabit' parameters type */
export interface IFindHabitParams {
  chat_id?: number | null | void;
  title?: string | null | void;
}

/** 'FindHabit' return type */
export interface IFindHabitResult {
  chat_id: number;
  created_at: Date;
  description: string | null;
  id: number;
  title: string;
  updated_at: Date;
}

/** 'FindHabit' query type */
export interface IFindHabitQuery {
  params: IFindHabitParams;
  result: IFindHabitResult;
}

const findHabitIR: any = {"usedParamSet":{"title":true,"chat_id":true},"params":[{"name":"title","required":false,"transform":{"type":"scalar"},"locs":[{"a":35,"b":40}]},{"name":"chat_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":58,"b":65}]}],"statement":"select *\nfrom habits\nwhere title = :title\n  and chat_id = :chat_id"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from habits
 * where title = :title
 *   and chat_id = :chat_id
 * ```
 */
export const findHabit = new PreparedQuery<IFindHabitParams,IFindHabitResult>(findHabitIR);


/** 'FindHabitCompletionsForUser' parameters type */
export interface IFindHabitCompletionsForUserParams {
  user_id?: number | null | void;
}

/** 'FindHabitCompletionsForUser' return type */
export interface IFindHabitCompletionsForUserResult {
  completed_at: Date;
  habit_id: number | null;
  user_id: number;
}

/** 'FindHabitCompletionsForUser' query type */
export interface IFindHabitCompletionsForUserQuery {
  params: IFindHabitCompletionsForUserParams;
  result: IFindHabitCompletionsForUserResult;
}

const findHabitCompletionsForUserIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":48,"b":55}]}],"statement":"select *\nfrom habit_completions\nwhere user_id = :user_id"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from habit_completions
 * where user_id = :user_id
 * ```
 */
export const findHabitCompletionsForUser = new PreparedQuery<IFindHabitCompletionsForUserParams,IFindHabitCompletionsForUserResult>(findHabitCompletionsForUserIR);


/** 'FindHabitCompletionsForUserToday' parameters type */
export interface IFindHabitCompletionsForUserTodayParams {
  user_id?: number | null | void;
}

/** 'FindHabitCompletionsForUserToday' return type */
export interface IFindHabitCompletionsForUserTodayResult {
  completed_at: Date;
  habit_id: number | null;
  user_id: number;
}

/** 'FindHabitCompletionsForUserToday' query type */
export interface IFindHabitCompletionsForUserTodayQuery {
  params: IFindHabitCompletionsForUserTodayParams;
  result: IFindHabitCompletionsForUserTodayResult;
}

const findHabitCompletionsForUserTodayIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":48,"b":55}]}],"statement":"select *\nfrom habit_completions\nwhere user_id = :user_id\n  and completed_at > now() - interval '1 day'"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from habit_completions
 * where user_id = :user_id
 *   and completed_at > now() - interval '1 day'
 * ```
 */
export const findHabitCompletionsForUserToday = new PreparedQuery<IFindHabitCompletionsForUserTodayParams,IFindHabitCompletionsForUserTodayResult>(findHabitCompletionsForUserTodayIR);


/** 'CreateHabit' parameters type */
export interface ICreateHabitParams {
  chat_id?: number | null | void;
  title?: string | null | void;
}

/** 'CreateHabit' return type */
export type ICreateHabitResult = void;

/** 'CreateHabit' query type */
export interface ICreateHabitQuery {
  params: ICreateHabitParams;
  result: ICreateHabitResult;
}

const createHabitIR: any = {"usedParamSet":{"title":true,"chat_id":true},"params":[{"name":"title","required":false,"transform":{"type":"scalar"},"locs":[{"a":44,"b":49}]},{"name":"chat_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":52,"b":59}]}],"statement":"insert into habits (title, chat_id)\nvalues (:title, :chat_id)"};

/**
 * Query generated from SQL:
 * ```
 * insert into habits (title, chat_id)
 * values (:title, :chat_id)
 * ```
 */
export const createHabit = new PreparedQuery<ICreateHabitParams,ICreateHabitResult>(createHabitIR);


/** 'LogHabitCompletion' parameters type */
export interface ILogHabitCompletionParams {
  habit_id?: number | null | void;
  user_id?: number | null | void;
}

/** 'LogHabitCompletion' return type */
export type ILogHabitCompletionResult = void;

/** 'LogHabitCompletion' query type */
export interface ILogHabitCompletionQuery {
  params: ILogHabitCompletionParams;
  result: ILogHabitCompletionResult;
}

const logHabitCompletionIR: any = {"usedParamSet":{"user_id":true,"habit_id":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":72,"b":79}]},{"name":"habit_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":82,"b":90}]}],"statement":"insert into habit_completions (user_id, habit_id, completed_at)\nvalues (:user_id, :habit_id, now())\nON CONFLICT DO NOTHING"};

/**
 * Query generated from SQL:
 * ```
 * insert into habit_completions (user_id, habit_id, completed_at)
 * values (:user_id, :habit_id, now())
 * ON CONFLICT DO NOTHING
 * ```
 */
export const logHabitCompletion = new PreparedQuery<ILogHabitCompletionParams,ILogHabitCompletionResult>(logHabitCompletionIR);


/** 'FindHabitsGroupedByChatId' parameters type */
export type IFindHabitsGroupedByChatIdParams = void;

/** 'FindHabitsGroupedByChatId' return type */
export interface IFindHabitsGroupedByChatIdResult {
  chat_id: number;
  habits: Json | null;
}

/** 'FindHabitsGroupedByChatId' query type */
export interface IFindHabitsGroupedByChatIdQuery {
  params: IFindHabitsGroupedByChatIdParams;
  result: IFindHabitsGroupedByChatIdResult;
}

const findHabitsGroupedByChatIdIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT chat_id, json_agg(habits.*) AS habits\nFROM habits\nGROUP BY chat_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT chat_id, json_agg(habits.*) AS habits
 * FROM habits
 * GROUP BY chat_id
 * ```
 */
export const findHabitsGroupedByChatId = new PreparedQuery<IFindHabitsGroupedByChatIdParams,IFindHabitsGroupedByChatIdResult>(findHabitsGroupedByChatIdIR);


/** 'FindUsersWithoutHabitCompletions' parameters type */
export interface IFindUsersWithoutHabitCompletionsParams {
  habit_ids: readonly (number | null | void)[];
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

const findUsersWithoutHabitCompletionsIR: any = {"usedParamSet":{"habit_ids":true},"params":[{"name":"habit_ids","required":false,"transform":{"type":"array_spread"},"locs":[{"a":173,"b":182}]}],"statement":"SELECT users.*\nFROM users\n         LEFT JOIN habit_completions ON (\n            habit_completions.user_id = users.telegram_id AND\n            habit_completions.habit_id IN (:habit_ids) AND\n            habit_completions.completed_at = CURRENT_DATE\n    )\nWHERE habit_completions.user_id IS NULL"};

/**
 * Query generated from SQL:
 * ```
 * SELECT users.*
 * FROM users
 *          LEFT JOIN habit_completions ON (
 *             habit_completions.user_id = users.telegram_id AND
 *             habit_completions.habit_id IN (:habit_ids) AND
 *             habit_completions.completed_at = CURRENT_DATE
 *     )
 * WHERE habit_completions.user_id IS NULL
 * ```
 */
export const findUsersWithoutHabitCompletions = new PreparedQuery<IFindUsersWithoutHabitCompletionsParams,IFindUsersWithoutHabitCompletionsResult>(findUsersWithoutHabitCompletionsIR);


