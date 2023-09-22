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

const findHabitsIR: any = {"usedParamSet":{},"params":[],"statement":"select *\nfrom habits"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from habits
 * ```
 */
export const findHabits = new PreparedQuery<IFindHabitsParams,IFindHabitsResult>(findHabitsIR);


/** 'FindHabitByTitle' parameters type */
export interface IFindHabitByTitleParams {
  title?: string | null | void;
}

/** 'FindHabitByTitle' return type */
export interface IFindHabitByTitleResult {
  created_at: Date;
  description: string | null;
  id: number;
  title: string;
  updated_at: Date;
}

/** 'FindHabitByTitle' query type */
export interface IFindHabitByTitleQuery {
  params: IFindHabitByTitleParams;
  result: IFindHabitByTitleResult;
}

const findHabitByTitleIR: any = {"usedParamSet":{"title":true},"params":[{"name":"title","required":false,"transform":{"type":"scalar"},"locs":[{"a":35,"b":40}]}],"statement":"select *\nfrom habits\nwhere title = :title"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from habits
 * where title = :title
 * ```
 */
export const findHabitByTitle = new PreparedQuery<IFindHabitByTitleParams,IFindHabitByTitleResult>(findHabitByTitleIR);


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
  id: number;
  user_id: number | null;
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
  description?: string | null | void;
  title?: string | null | void;
}

/** 'CreateHabit' return type */
export type ICreateHabitResult = void;

/** 'CreateHabit' query type */
export interface ICreateHabitQuery {
  params: ICreateHabitParams;
  result: ICreateHabitResult;
}

const createHabitIR: any = {"usedParamSet":{"title":true,"description":true},"params":[{"name":"title","required":false,"transform":{"type":"scalar"},"locs":[{"a":48,"b":53}]},{"name":"description","required":false,"transform":{"type":"scalar"},"locs":[{"a":56,"b":67}]}],"statement":"insert into habits (title, description)\nvalues (:title, :description)"};

/**
 * Query generated from SQL:
 * ```
 * insert into habits (title, description)
 * values (:title, :description)
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

const logHabitCompletionIR: any = {"usedParamSet":{"user_id":true,"habit_id":true},"params":[{"name":"user_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":72,"b":79}]},{"name":"habit_id","required":false,"transform":{"type":"scalar"},"locs":[{"a":82,"b":90}]}],"statement":"insert into habit_completions (user_id, habit_id, completed_at)\nvalues (:user_id, :habit_id, now())"};

/**
 * Query generated from SQL:
 * ```
 * insert into habit_completions (user_id, habit_id, completed_at)
 * values (:user_id, :habit_id, now())
 * ```
 */
export const logHabitCompletion = new PreparedQuery<ILogHabitCompletionParams,ILogHabitCompletionResult>(logHabitCompletionIR);


