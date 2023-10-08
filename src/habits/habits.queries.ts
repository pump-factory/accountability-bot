/** Types generated for queries found in "src/habits/habits.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type HabitMakingCadence = 'DAILY' | 'MONTHLY' | 'WEEKLY';

export type HabitType = 'BREAKING' | 'MAKING';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

/** 'FindHabitsByChatId' parameters type */
export interface IFindHabitsByChatIdParams {
  chatId?: number | string | null | void;
}

/** 'FindHabitsByChatId' return type */
export interface IFindHabitsByChatIdResult {
  cadence: HabitMakingCadence;
  createdAt: Date;
  description: string;
  frequency: number;
  id: string;
  title: string;
  type: HabitType;
}

/** 'FindHabitsByChatId' query type */
export interface IFindHabitsByChatIdQuery {
  params: IFindHabitsByChatIdParams;
  result: IFindHabitsByChatIdResult;
}

const findHabitsByChatIdIR: any = {"usedParamSet":{"chatId":true},"params":[{"name":"chatId","required":false,"transform":{"type":"scalar"},"locs":[{"a":137,"b":143}]}],"statement":"select \"Habit\".*\nfrom \"Habit\"\n         join \"HabitChat\"\n              on \"Habit\".id = \"HabitChat\".\"habitId\"\nwhere \"HabitChat\".\"chatId\" = :chatId"};

/**
 * Query generated from SQL:
 * ```
 * select "Habit".*
 * from "Habit"
 *          join "HabitChat"
 *               on "Habit".id = "HabitChat"."habitId"
 * where "HabitChat"."chatId" = :chatId
 * ```
 */
export const findHabitsByChatId = new PreparedQuery<IFindHabitsByChatIdParams,IFindHabitsByChatIdResult>(findHabitsByChatIdIR);


/** 'FindHabit' parameters type */
export interface IFindHabitParams {
  chatId?: number | string | null | void;
  habitId?: string | null | void;
}

/** 'FindHabit' return type */
export interface IFindHabitResult {
  cadence: HabitMakingCadence;
  createdAt: Date;
  description: string;
  frequency: number;
  id: string;
  title: string;
  type: HabitType;
}

/** 'FindHabit' query type */
export interface IFindHabitQuery {
  params: IFindHabitParams;
  result: IFindHabitResult;
}

const findHabitIR: any = {"usedParamSet":{"habitId":true,"chatId":true},"params":[{"name":"habitId","required":false,"transform":{"type":"scalar"},"locs":[{"a":127,"b":134}]},{"name":"chatId","required":false,"transform":{"type":"scalar"},"locs":[{"a":153,"b":159}]}],"statement":"select \"Habit\".*\nfrom \"Habit\"\n         join \"HabitChat\"\n              on \"Habit\".id = \"HabitChat\".\"habitId\"\nwhere \"Habit\".id = :habitId\n  and \"chatId\" = :chatId"};

/**
 * Query generated from SQL:
 * ```
 * select "Habit".*
 * from "Habit"
 *          join "HabitChat"
 *               on "Habit".id = "HabitChat"."habitId"
 * where "Habit".id = :habitId
 *   and "chatId" = :chatId
 * ```
 */
export const findHabit = new PreparedQuery<IFindHabitParams,IFindHabitResult>(findHabitIR);


/** 'FindHabitByTitle' parameters type */
export interface IFindHabitByTitleParams {
  chatId?: number | string | null | void;
  title?: string | null | void;
}

/** 'FindHabitByTitle' return type */
export interface IFindHabitByTitleResult {
  cadence: HabitMakingCadence;
  createdAt: Date;
  description: string;
  frequency: number;
  id: string;
  title: string;
  type: HabitType;
}

/** 'FindHabitByTitle' query type */
export interface IFindHabitByTitleQuery {
  params: IFindHabitByTitleParams;
  result: IFindHabitByTitleResult;
}

const findHabitByTitleIR: any = {"usedParamSet":{"chatId":true,"title":true},"params":[{"name":"chatId","required":false,"transform":{"type":"scalar"},"locs":[{"a":137,"b":143}]},{"name":"title","required":false,"transform":{"type":"scalar"},"locs":[{"a":167,"b":172}]}],"statement":"select \"Habit\".*\nfrom \"Habit\"\n         join \"HabitChat\"\n              on \"Habit\".id = \"HabitChat\".\"habitId\"\nwhere \"HabitChat\".\"chatId\" = :chatId\n  and \"Habit\".title = :title"};

/**
 * Query generated from SQL:
 * ```
 * select "Habit".*
 * from "Habit"
 *          join "HabitChat"
 *               on "Habit".id = "HabitChat"."habitId"
 * where "HabitChat"."chatId" = :chatId
 *   and "Habit".title = :title
 * ```
 */
export const findHabitByTitle = new PreparedQuery<IFindHabitByTitleParams,IFindHabitByTitleResult>(findHabitByTitleIR);


/** 'FindHabitCompletionsForUser' parameters type */
export interface IFindHabitCompletionsForUserParams {
  userId?: string | null | void;
}

/** 'FindHabitCompletionsForUser' return type */
export interface IFindHabitCompletionsForUserResult {
  createdAt: Date;
  habitFollowerId: string;
  id: string;
}

/** 'FindHabitCompletionsForUser' query type */
export interface IFindHabitCompletionsForUserQuery {
  params: IFindHabitCompletionsForUserParams;
  result: IFindHabitCompletionsForUserResult;
}

const findHabitCompletionsForUserIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":66,"b":72}]}],"statement":"select \"HabitEvent\".*\nfrom \"HabitEvent\"\nwhere \"habitFollowerId\" = :userId"};

/**
 * Query generated from SQL:
 * ```
 * select "HabitEvent".*
 * from "HabitEvent"
 * where "habitFollowerId" = :userId
 * ```
 */
export const findHabitCompletionsForUser = new PreparedQuery<IFindHabitCompletionsForUserParams,IFindHabitCompletionsForUserResult>(findHabitCompletionsForUserIR);


/** 'FindHabitCompletionsForUserToday' parameters type */
export interface IFindHabitCompletionsForUserTodayParams {
  userId?: string | null | void;
}

/** 'FindHabitCompletionsForUserToday' return type */
export interface IFindHabitCompletionsForUserTodayResult {
  createdAt: Date;
  habitFollowerId: string;
  id: string;
}

/** 'FindHabitCompletionsForUserToday' query type */
export interface IFindHabitCompletionsForUserTodayQuery {
  params: IFindHabitCompletionsForUserTodayParams;
  result: IFindHabitCompletionsForUserTodayResult;
}

const findHabitCompletionsForUserTodayIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":66,"b":72}]}],"statement":"select \"HabitEvent\".*\nfrom \"HabitEvent\"\nwhere \"habitFollowerId\" = :userId\n  and \"createdAt\" > now() - interval '1 day'"};

/**
 * Query generated from SQL:
 * ```
 * select "HabitEvent".*
 * from "HabitEvent"
 * where "habitFollowerId" = :userId
 *   and "createdAt" > now() - interval '1 day'
 * ```
 */
export const findHabitCompletionsForUserToday = new PreparedQuery<IFindHabitCompletionsForUserTodayParams,IFindHabitCompletionsForUserTodayResult>(findHabitCompletionsForUserTodayIR);


/** 'CreateHabit' parameters type */
export interface ICreateHabitParams {
  chatId?: number | string | null | void;
  title?: string | null | void;
}

/** 'CreateHabit' return type */
export type ICreateHabitResult = void;

/** 'CreateHabit' query type */
export interface ICreateHabitQuery {
  params: ICreateHabitParams;
  result: ICreateHabitResult;
}

const createHabitIR: any = {"usedParamSet":{"title":true,"chatId":true},"params":[{"name":"title","required":false,"transform":{"type":"scalar"},"locs":[{"a":131,"b":136}]},{"name":"chatId","required":false,"transform":{"type":"scalar"},"locs":[{"a":306,"b":312},{"a":535,"b":541}]}],"statement":"WITH new_habit AS (\n    INSERT INTO \"Habit\" (id, title, description, type, cadence, frequency)\n        VALUES (uuid_generate_v4(), :title, 'telegram habit', 'MAKING', 'DAILY', 0)\n        RETURNING id),\n     new_habit_chat AS (\n         INSERT INTO \"HabitChat\" (\"habitId\", \"chatId\")\n             SELECT id, :chatId\n             FROM new_habit)\nINSERT\nINTO \"HabitFollower\" (id, \"habitId\", \"userId\", \"createdAt\")\nSELECT uuid_generate_v4(), nh.id, uc.\"userId\", now()\nFROM new_habit nh\n         CROSS JOIN \"UserChat\" uc\nWHERE uc.\"chatId\" = :chatId"};

/**
 * Query generated from SQL:
 * ```
 * WITH new_habit AS (
 *     INSERT INTO "Habit" (id, title, description, type, cadence, frequency)
 *         VALUES (uuid_generate_v4(), :title, 'telegram habit', 'MAKING', 'DAILY', 0)
 *         RETURNING id),
 *      new_habit_chat AS (
 *          INSERT INTO "HabitChat" ("habitId", "chatId")
 *              SELECT id, :chatId
 *              FROM new_habit)
 * INSERT
 * INTO "HabitFollower" (id, "habitId", "userId", "createdAt")
 * SELECT uuid_generate_v4(), nh.id, uc."userId", now()
 * FROM new_habit nh
 *          CROSS JOIN "UserChat" uc
 * WHERE uc."chatId" = :chatId
 * ```
 */
export const createHabit = new PreparedQuery<ICreateHabitParams,ICreateHabitResult>(createHabitIR);


/** 'LogHabitCompletion' parameters type */
export interface ILogHabitCompletionParams {
  habitId?: string | null | void;
  telegramId?: number | string | null | void;
}

/** 'LogHabitCompletion' return type */
export type ILogHabitCompletionResult = void;

/** 'LogHabitCompletion' query type */
export interface ILogHabitCompletionQuery {
  params: ILogHabitCompletionParams;
  result: ILogHabitCompletionResult;
}

const logHabitCompletionIR: any = {"usedParamSet":{"telegramId":true,"habitId":true},"params":[{"name":"telegramId","required":false,"transform":{"type":"scalar"},"locs":[{"a":228,"b":238}]},{"name":"habitId","required":false,"transform":{"type":"scalar"},"locs":[{"a":288,"b":295}]}],"statement":"insert\ninto \"HabitEvent\" (id, \"habitFollowerId\")\nvalues (uuid_generate_v4(), (select id\n                             from \"HabitFollower\"\n                             where \"userId\" = (select id from \"User\" where \"telegramId\" = :telegramId)\n                               and \"habitId\" = :habitId))\nON CONFLICT DO NOTHING"};

/**
 * Query generated from SQL:
 * ```
 * insert
 * into "HabitEvent" (id, "habitFollowerId")
 * values (uuid_generate_v4(), (select id
 *                              from "HabitFollower"
 *                              where "userId" = (select id from "User" where "telegramId" = :telegramId)
 *                                and "habitId" = :habitId))
 * ON CONFLICT DO NOTHING
 * ```
 */
export const logHabitCompletion = new PreparedQuery<ILogHabitCompletionParams,ILogHabitCompletionResult>(logHabitCompletionIR);


/** 'FindHabitsGroupedByChatId' parameters type */
export type IFindHabitsGroupedByChatIdParams = void;

/** 'FindHabitsGroupedByChatId' return type */
export interface IFindHabitsGroupedByChatIdResult {
  chatId: string;
  habits: Json | null;
}

/** 'FindHabitsGroupedByChatId' query type */
export interface IFindHabitsGroupedByChatIdQuery {
  params: IFindHabitsGroupedByChatIdParams;
  result: IFindHabitsGroupedByChatIdResult;
}

const findHabitsGroupedByChatIdIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT \"chatId\", json_agg(\"Habit\".*) AS habits\nFROM \"Habit\"\n         join public.\"HabitChat\" HC on \"Habit\".id = HC.\"habitId\"\nGROUP BY \"chatId\""};

/**
 * Query generated from SQL:
 * ```
 * SELECT "chatId", json_agg("Habit".*) AS habits
 * FROM "Habit"
 *          join public."HabitChat" HC on "Habit".id = HC."habitId"
 * GROUP BY "chatId"
 * ```
 */
export const findHabitsGroupedByChatId = new PreparedQuery<IFindHabitsGroupedByChatIdParams,IFindHabitsGroupedByChatIdResult>(findHabitsGroupedByChatIdIR);


