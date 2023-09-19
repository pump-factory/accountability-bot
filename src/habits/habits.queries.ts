/** Types generated for queries found in "src/habits/habits.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindHabits' parameters type */
export type IFindHabitsParams = void;

/** 'FindHabits' return type */
export interface IFindHabitsResult {
  created_at: Date;
  description: string | null;
  id: number;
  title: string;
  updated_at: Date;
}

/** 'FindHabits' query type */
export interface IFindHabitsQuery {
  params: IFindHabitsParams;
  result: IFindHabitsResult;
}

const findHabitsIR: any = {"usedParamSet":{},"params":[],"statement":"select\n\t*\nfrom\n\thabits"};

/**
 * Query generated from SQL:
 * ```
 * select
 * 	*
 * from
 * 	habits
 * ```
 */
export const findHabits = new PreparedQuery<IFindHabitsParams,IFindHabitsResult>(findHabitsIR);


/** 'FindHabitCompletionsForUser' parameters type */
export interface IFindHabitCompletionsForUserParams {
  user_id?: number | null | void;
}

/** 'FindHabitCompletionsForUser' return type */
export interface IFindHabitCompletionsForUserResult {
  completed_at: Date;
  habit_id: number | null;
  id: number;
  user_id: number | null;
}

/** 'FindHabitCompletionsForUser' query type */
export interface IFindHabitCompletionsForUserQuery {
  params: IFindHabitCompletionsForUserParams;
  result: IFindHabitCompletionsForUserResult;
}

const findHabitCompletionsForUserIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":51,"b":58}]}],"statement":"select\n\t*\nfrom\n\thabit_completions\nwhere\n\tuser_id = :user_id"};

/**
 * Query generated from SQL:
 * ```
 * select
 * 	*
 * from
 * 	habit_completions
 * where
 * 	user_id = :user_id
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
  id: number;
  user_id: number | null;
}

/** 'FindHabitCompletionsForUserToday' query type */
export interface IFindHabitCompletionsForUserTodayQuery {
  params: IFindHabitCompletionsForUserTodayParams;
  result: IFindHabitCompletionsForUserTodayResult;
}

const findHabitCompletionsForUserTodayIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":51,"b":58}]}],"statement":"select\n\t*\nfrom\n\thabit_completions\nwhere\n\tuser_id = :user_id\n\tand completed_at > now() - interval '1 day'"};

/**
 * Query generated from SQL:
 * ```
 * select
 * 	*
 * from
 * 	habit_completions
 * where
 * 	user_id = :user_id
 * 	and completed_at > now() - interval '1 day'
 * ```
 */
export const findHabitCompletionsForUserToday = new PreparedQuery<IFindHabitCompletionsForUserTodayParams,IFindHabitCompletionsForUserTodayResult>(findHabitCompletionsForUserTodayIR);


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

const logHabitCompletionIR: any = {"usedParamSet":{"user_id":true,"habit_id":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":74,"b":81}]},{"name":"habit_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":84,"b":92}]}],"statement":"insert into\n\thabit_completions (user_id, habit_id, completed_at)\nvalues\n\t(:user_id, :habit_id, now())"};

/**
 * Query generated from SQL:
 * ```
 * insert into
 * 	habit_completions (user_id, habit_id, completed_at)
 * values
 * 	(:user_id, :habit_id, now())
 * ```
 */
export const logHabitCompletion = new PreparedQuery<ILogHabitCompletionParams,ILogHabitCompletionResult>(logHabitCompletionIR);


