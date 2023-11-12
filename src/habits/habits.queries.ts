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
  loggedAtUserTz: Date | null;
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
  loggedAtUserTz: Date | null;
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


/** 'CreateHabitOld' parameters type */
export interface ICreateHabitOldParams {
  chatId?: number | string | null | void;
  title?: string | null | void;
}

/** 'CreateHabitOld' return type */
export type ICreateHabitOldResult = void;

/** 'CreateHabitOld' query type */
export interface ICreateHabitOldQuery {
  params: ICreateHabitOldParams;
  result: ICreateHabitOldResult;
}

const createHabitOldIR: any = {"usedParamSet":{"title":true,"chatId":true},"params":[{"name":"title","required":false,"transform":{"type":"scalar"},"locs":[{"a":131,"b":136}]},{"name":"chatId","required":false,"transform":{"type":"scalar"},"locs":[{"a":306,"b":312},{"a":535,"b":541}]}],"statement":"WITH new_habit AS (\n    INSERT INTO \"Habit\" (id, title, description, type, cadence, frequency)\n        VALUES (uuid_generate_v4(), :title, 'telegram habit', 'MAKING', 'DAILY', 0)\n        RETURNING id),\n     new_habit_chat AS (\n         INSERT INTO \"HabitChat\" (\"habitId\", \"chatId\")\n             SELECT id, :chatId\n             FROM new_habit)\nINSERT\nINTO \"HabitFollower\" (id, \"habitId\", \"userId\", \"createdAt\")\nSELECT uuid_generate_v4(), nh.id, uc.\"userId\", now()\nFROM new_habit nh\n         CROSS JOIN \"UserChat\" uc\nWHERE uc.\"chatId\" = :chatId"};

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
export const createHabitOld = new PreparedQuery<ICreateHabitOldParams,ICreateHabitOldResult>(createHabitOldIR);


/** 'CreateHabit' parameters type */
export interface ICreateHabitParams {
  title?: string | null | void;
}

/** 'CreateHabit' return type */
export interface ICreateHabitResult {
  id: string;
}

/** 'CreateHabit' query type */
export interface ICreateHabitQuery {
  params: ICreateHabitParams;
  result: ICreateHabitResult;
}

const createHabitIR: any = {"usedParamSet":{"title":true},"params":[{"name":"title","required":false,"transform":{"type":"scalar"},"locs":[{"a":99,"b":104}]}],"statement":"INSERT INTO \"Habit\" (id, title, description, type, cadence, frequency)\nVALUES (uuid_generate_v4(), :title, 'telegram habit', 'MAKING', 'DAILY', 0)\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "Habit" (id, title, description, type, cadence, frequency)
 * VALUES (uuid_generate_v4(), :title, 'telegram habit', 'MAKING', 'DAILY', 0)
 * RETURNING id
 * ```
 */
export const createHabit = new PreparedQuery<ICreateHabitParams,ICreateHabitResult>(createHabitIR);


/** 'CreateHabitFollower' parameters type */
export interface ICreateHabitFollowerParams {
  habitId?: string | null | void;
  userId?: string | null | void;
}

/** 'CreateHabitFollower' return type */
export interface ICreateHabitFollowerResult {
  id: string;
}

/** 'CreateHabitFollower' query type */
export interface ICreateHabitFollowerQuery {
  params: ICreateHabitFollowerParams;
  result: ICreateHabitFollowerResult;
}

const createHabitFollowerIR: any = {"usedParamSet":{"habitId":true,"userId":true},"params":[{"name":"habitId","required":false,"transform":{"type":"scalar"},"locs":[{"a":95,"b":102}]},{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":105,"b":111}]}],"statement":"INSERT INTO \"HabitFollower\" (id, \"habitId\", \"userId\", \"createdAt\")\nVALUES (uuid_generate_v4(), :habitId, :userId, now())\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "HabitFollower" (id, "habitId", "userId", "createdAt")
 * VALUES (uuid_generate_v4(), :habitId, :userId, now())
 * RETURNING id
 * ```
 */
export const createHabitFollower = new PreparedQuery<ICreateHabitFollowerParams,ICreateHabitFollowerResult>(createHabitFollowerIR);


/** 'CreateHabitChat' parameters type */
export interface ICreateHabitChatParams {
  chatId?: number | string | null | void;
  habitId?: string | null | void;
}

/** 'CreateHabitChat' return type */
export type ICreateHabitChatResult = void;

/** 'CreateHabitChat' query type */
export interface ICreateHabitChatQuery {
  params: ICreateHabitChatParams;
  result: ICreateHabitChatResult;
}

const createHabitChatIR: any = {"usedParamSet":{"habitId":true,"chatId":true},"params":[{"name":"habitId","required":false,"transform":{"type":"scalar"},"locs":[{"a":54,"b":61}]},{"name":"chatId","required":false,"transform":{"type":"scalar"},"locs":[{"a":64,"b":70}]}],"statement":"INSERT INTO \"HabitChat\" (\"habitId\", \"chatId\")\nVALUES (:habitId, :chatId)"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "HabitChat" ("habitId", "chatId")
 * VALUES (:habitId, :chatId)
 * ```
 */
export const createHabitChat = new PreparedQuery<ICreateHabitChatParams,ICreateHabitChatResult>(createHabitChatIR);


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

const logHabitCompletionIR: any = {"usedParamSet":{"telegramId":true,"habitId":true},"params":[{"name":"telegramId","required":false,"transform":{"type":"scalar"},"locs":[{"a":96,"b":106}]},{"name":"habitId","required":false,"transform":{"type":"scalar"},"locs":[{"a":410,"b":417}]}],"statement":"with cur_user as (select *\n                  from \"User\"\n                  where \"telegramId\" = :telegramId\n                  LIMIT 1)\ninsert\ninto \"HabitEvent\" (id, \"habitFollowerId\", \"loggedAtUserTz\")\nvalues (uuid_generate_v4(), (select id\n                             from \"HabitFollower\"\n                             where \"userId\" = (select id from cur_user)\n                               and \"habitId\" = :habitId), now() AT TIME ZONE (select timezone from cur_user))\nON CONFLICT DO NOTHING"};

/**
 * Query generated from SQL:
 * ```
 * with cur_user as (select *
 *                   from "User"
 *                   where "telegramId" = :telegramId
 *                   LIMIT 1)
 * insert
 * into "HabitEvent" (id, "habitFollowerId", "loggedAtUserTz")
 * values (uuid_generate_v4(), (select id
 *                              from "HabitFollower"
 *                              where "userId" = (select id from cur_user)
 *                                and "habitId" = :habitId), now() AT TIME ZONE (select timezone from cur_user))
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


/** 'DeleteHabitFollowersForUserAndChat' parameters type */
export interface IDeleteHabitFollowersForUserAndChatParams {
  chatId?: number | string | null | void;
  telegramId?: number | string | null | void;
}

/** 'DeleteHabitFollowersForUserAndChat' return type */
export type IDeleteHabitFollowersForUserAndChatResult = void;

/** 'DeleteHabitFollowersForUserAndChat' query type */
export interface IDeleteHabitFollowersForUserAndChatQuery {
  params: IDeleteHabitFollowersForUserAndChatParams;
  result: IDeleteHabitFollowersForUserAndChatResult;
}

const deleteHabitFollowersForUserAndChatIR: any = {"usedParamSet":{"telegramId":true,"chatId":true},"params":[{"name":"telegramId","required":false,"transform":{"type":"scalar"},"locs":[{"a":89,"b":99}]},{"name":"chatId","required":false,"transform":{"type":"scalar"},"locs":[{"a":173,"b":179}]}],"statement":"DELETE\nFROM \"HabitFollower\"\nWHERE \"userId\" = (select id from \"User\" where \"telegramId\" = :telegramId)\n  AND \"habitId\" in (select \"habitId\" from \"HabitChat\" where \"chatId\" = :chatId)"};

/**
 * Query generated from SQL:
 * ```
 * DELETE
 * FROM "HabitFollower"
 * WHERE "userId" = (select id from "User" where "telegramId" = :telegramId)
 *   AND "habitId" in (select "habitId" from "HabitChat" where "chatId" = :chatId)
 * ```
 */
export const deleteHabitFollowersForUserAndChat = new PreparedQuery<IDeleteHabitFollowersForUserAndChatParams,IDeleteHabitFollowersForUserAndChatResult>(deleteHabitFollowersForUserAndChatIR);


/** 'DeleteUserChat' parameters type */
export interface IDeleteUserChatParams {
  chatId?: number | string | null | void;
  telegramId?: number | string | null | void;
}

/** 'DeleteUserChat' return type */
export type IDeleteUserChatResult = void;

/** 'DeleteUserChat' query type */
export interface IDeleteUserChatQuery {
  params: IDeleteUserChatParams;
  result: IDeleteUserChatResult;
}

const deleteUserChatIR: any = {"usedParamSet":{"telegramId":true,"chatId":true},"params":[{"name":"telegramId","required":false,"transform":{"type":"scalar"},"locs":[{"a":84,"b":94}]},{"name":"chatId","required":false,"transform":{"type":"scalar"},"locs":[{"a":114,"b":120}]}],"statement":"DELETE\nFROM \"UserChat\"\nWHERE \"userId\" = (select id from \"User\" where \"telegramId\" = :telegramId)\n  AND \"chatId\" = :chatId"};

/**
 * Query generated from SQL:
 * ```
 * DELETE
 * FROM "UserChat"
 * WHERE "userId" = (select id from "User" where "telegramId" = :telegramId)
 *   AND "chatId" = :chatId
 * ```
 */
export const deleteUserChat = new PreparedQuery<IDeleteUserChatParams,IDeleteUserChatResult>(deleteUserChatIR);


