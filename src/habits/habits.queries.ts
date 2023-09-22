/** Types generated for queries found in "src/habits/habits.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

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


