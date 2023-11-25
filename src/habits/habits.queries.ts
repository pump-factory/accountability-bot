/** Types generated for queries found in "src/habits/habits.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type HabitMakingCadence = 'DAILY' | 'MONTHLY' | 'WEEKLY';

export type HabitType = 'BREAKING' | 'MAKING';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

/** 'FindUserByTelegramId' parameters type */
export interface IFindUserByTelegramIdParams {
  telegramId: number | string;
}

/** 'FindUserByTelegramId' return type */
export interface IFindUserByTelegramIdResult {
  createdAt: Date;
  email: string;
  id: string;
  name: string;
  telegramId: string | null;
  timezone: string | null;
  updatedAt: Date;
}

/** 'FindUserByTelegramId' query type */
export interface IFindUserByTelegramIdQuery {
  params: IFindUserByTelegramIdParams;
  result: IFindUserByTelegramIdResult;
}

const findUserByTelegramIdIR: any = {"usedParamSet":{"telegramId":true},"params":[{"name":"telegramId","required":true,"transform":{"type":"scalar"},"locs":[{"a":42,"b":53}]}],"statement":"select *\nfrom \"User\"\nwhere \"telegramId\" = :telegramId!\nlimit 1"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from "User"
 * where "telegramId" = :telegramId!
 * limit 1
 * ```
 */
export const findUserByTelegramId = new PreparedQuery<IFindUserByTelegramIdParams,IFindUserByTelegramIdResult>(findUserByTelegramIdIR);


/** 'FindUsersInChat' parameters type */
export interface IFindUsersInChatParams {
  chatId: number | string;
}

/** 'FindUsersInChat' return type */
export interface IFindUsersInChatResult {
  chatId: string;
  createdAt: Date;
  email: string;
  id: string;
  name: string;
  telegramId: string | null;
  timezone: string | null;
  updatedAt: Date;
  userId: string;
}

/** 'FindUsersInChat' query type */
export interface IFindUsersInChatQuery {
  params: IFindUsersInChatParams;
  result: IFindUsersInChatResult;
}

const findUsersInChatIR: any = {"usedParamSet":{"chatId":true},"params":[{"name":"chatId","required":true,"transform":{"type":"scalar"},"locs":[{"a":109,"b":116}]}],"statement":"SELECT *\nFROM \"User\"\n         JOIN \"UserChat\" ON \"User\".id = \"UserChat\".\"userId\"\nWHERE \"UserChat\".\"chatId\" = :chatId!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "User"
 *          JOIN "UserChat" ON "User".id = "UserChat"."userId"
 * WHERE "UserChat"."chatId" = :chatId!
 * ```
 */
export const findUsersInChat = new PreparedQuery<IFindUsersInChatParams,IFindUsersInChatResult>(findUsersInChatIR);


/** 'CreateUser' parameters type */
export interface ICreateUserParams {
  chatId: number | string;
  name: string;
  telegramId: number | string;
}

/** 'CreateUser' return type */
export type ICreateUserResult = void;

/** 'CreateUser' query type */
export interface ICreateUserQuery {
  params: ICreateUserParams;
  result: ICreateUserResult;
}

const createUserIR: any = {"usedParamSet":{"telegramId":true,"name":true,"chatId":true},"params":[{"name":"telegramId","required":true,"transform":{"type":"scalar"},"locs":[{"a":140,"b":151}]},{"name":"name","required":true,"transform":{"type":"scalar"},"locs":[{"a":154,"b":159}]},{"name":"chatId","required":true,"transform":{"type":"scalar"},"locs":[{"a":319,"b":326}]}],"statement":"with new_user as (\n    insert into \"User\" (id, \"telegramId\", \"name\", \"createdAt\", \"updatedAt\", \"email\")\n        values (uuid_generate_v4(), :telegramId!, :name!, now(), now(),\n                uuid_generate_v4()::text || '@example.com'::text)\n        returning id)\ninsert\ninto \"UserChat\" (\"userId\", \"chatId\")\nselect id, :chatId!\nfrom new_user"};

/**
 * Query generated from SQL:
 * ```
 * with new_user as (
 *     insert into "User" (id, "telegramId", "name", "createdAt", "updatedAt", "email")
 *         values (uuid_generate_v4(), :telegramId!, :name!, now(), now(),
 *                 uuid_generate_v4()::text || '@example.com'::text)
 *         returning id)
 * insert
 * into "UserChat" ("userId", "chatId")
 * select id, :chatId!
 * from new_user
 * ```
 */
export const createUser = new PreparedQuery<ICreateUserParams,ICreateUserResult>(createUserIR);


/** 'CreateHabitFollower' parameters type */
export interface ICreateHabitFollowerParams {
  habitId?: string | null | void;
  telegramId: number | string;
}

/** 'CreateHabitFollower' return type */
export type ICreateHabitFollowerResult = void;

/** 'CreateHabitFollower' query type */
export interface ICreateHabitFollowerQuery {
  params: ICreateHabitFollowerParams;
  result: ICreateHabitFollowerResult;
}

const createHabitFollowerIR: any = {"usedParamSet":{"habitId":true,"telegramId":true},"params":[{"name":"habitId","required":false,"transform":{"type":"scalar"},"locs":[{"a":98,"b":105}]},{"name":"telegramId","required":true,"transform":{"type":"scalar"},"locs":[{"a":147,"b":158}]}],"statement":"insert into \"HabitFollower\" (id, \"userId\", \"habitId\", \"createdAt\")\nselect uuid_generate_v4(), id, :habitId, now()\nfrom \"User\"\nwhere \"telegramId\" = :telegramId!"};

/**
 * Query generated from SQL:
 * ```
 * insert into "HabitFollower" (id, "userId", "habitId", "createdAt")
 * select uuid_generate_v4(), id, :habitId, now()
 * from "User"
 * where "telegramId" = :telegramId!
 * ```
 */
export const createHabitFollower = new PreparedQuery<ICreateHabitFollowerParams,ICreateHabitFollowerResult>(createHabitFollowerIR);


/** 'FindUsersWithoutHabitCompletions' parameters type */
export interface IFindUsersWithoutHabitCompletionsParams {
  chatId: number | string;
}

/** 'FindUsersWithoutHabitCompletions' return type */
export interface IFindUsersWithoutHabitCompletionsResult {
  createdAt: Date;
  email: string;
  id: string;
  name: string;
  telegramId: string | null;
  timezone: string | null;
  updatedAt: Date;
}

/** 'FindUsersWithoutHabitCompletions' query type */
export interface IFindUsersWithoutHabitCompletionsQuery {
  params: IFindUsersWithoutHabitCompletionsParams;
  result: IFindUsersWithoutHabitCompletionsResult;
}

const findUsersWithoutHabitCompletionsIR: any = {"usedParamSet":{"chatId":true},"params":[{"name":"chatId","required":true,"transform":{"type":"scalar"},"locs":[{"a":274,"b":280},{"a":555,"b":562}]}],"statement":"SELECT DISTINCT \"User\".*\nFROM \"User\"\n         JOIN \"UserChat\" ON \"User\".id = \"UserChat\".\"userId\"\n         JOIN \"HabitFollower\" HF on \"User\".id = HF.\"userId\"\n         JOIN \"Habit\" H on HF.\"habitId\" = H.id\n         JOIN \"HabitChat\" HC on H.id = HC.\"habitId\" AND HC.\"chatId\" = :chatId\n         LEFT JOIN \"HabitEvent\" ON (\n            \"HabitEvent\".\"habitFollowerId\" = HF.id AND\n            \"HabitEvent\".\"createdAt\" AT TIME ZONE \"User\".\"timezone\" >= (CURRENT_DATE AT TIME ZONE \"User\".\"timezone\")\n    )\nWHERE \"HabitEvent\".id IS NULL\n  AND \"UserChat\".\"chatId\" = :chatId!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT DISTINCT "User".*
 * FROM "User"
 *          JOIN "UserChat" ON "User".id = "UserChat"."userId"
 *          JOIN "HabitFollower" HF on "User".id = HF."userId"
 *          JOIN "Habit" H on HF."habitId" = H.id
 *          JOIN "HabitChat" HC on H.id = HC."habitId" AND HC."chatId" = :chatId
 *          LEFT JOIN "HabitEvent" ON (
 *             "HabitEvent"."habitFollowerId" = HF.id AND
 *             "HabitEvent"."createdAt" AT TIME ZONE "User"."timezone" >= (CURRENT_DATE AT TIME ZONE "User"."timezone")
 *     )
 * WHERE "HabitEvent".id IS NULL
 *   AND "UserChat"."chatId" = :chatId!
 * ```
 */
export const findUsersWithoutHabitCompletions = new PreparedQuery<IFindUsersWithoutHabitCompletionsParams,IFindUsersWithoutHabitCompletionsResult>(findUsersWithoutHabitCompletionsIR);


/** 'FindRecentHabitEvents' parameters type */
export interface IFindRecentHabitEventsParams {
  habitId: string;
}

/** 'FindRecentHabitEvents' return type */
export interface IFindRecentHabitEventsResult {
  name: string;
  recentCutoff: Date | null;
  timezone: Date | null;
  title: string;
  userId: string;
}

/** 'FindRecentHabitEvents' query type */
export interface IFindRecentHabitEventsQuery {
  params: IFindRecentHabitEventsParams;
  result: IFindRecentHabitEventsResult;
}

const findRecentHabitEventsIR: any = {"usedParamSet":{"habitId":true},"params":[{"name":"habitId","required":true,"transform":{"type":"scalar"},"locs":[{"a":528,"b":536}]}],"statement":"SELECT U.id as \"userId\", H.title, U.name, \"HabitEvent\".\"createdAt\" AT TIME ZONE 'UTC' AT TIME ZONE U.\"timezone\", DATE_TRUNC('day', current_date at time zone U.\"timezone\") as \"recentCutoff\"\nFROM \"HabitEvent\"\n         JOIN \"HabitFollower\" HF on \"HabitEvent\".\"habitFollowerId\" = HF.id\n         JOIN \"Habit\" H on HF.\"habitId\" = H.id\n         JOIN \"User\" U on HF.\"userId\" = U.id\nWHERE (\"HabitEvent\".\"createdAt\" AT TIME ZONE 'UTC' AT TIME ZONE U.\"timezone\") >= DATE_TRUNC('day', current_date at time zone U.\"timezone\")\n  AND H.\"id\" = :habitId!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT U.id as "userId", H.title, U.name, "HabitEvent"."createdAt" AT TIME ZONE 'UTC' AT TIME ZONE U."timezone", DATE_TRUNC('day', current_date at time zone U."timezone") as "recentCutoff"
 * FROM "HabitEvent"
 *          JOIN "HabitFollower" HF on "HabitEvent"."habitFollowerId" = HF.id
 *          JOIN "Habit" H on HF."habitId" = H.id
 *          JOIN "User" U on HF."userId" = U.id
 * WHERE ("HabitEvent"."createdAt" AT TIME ZONE 'UTC' AT TIME ZONE U."timezone") >= DATE_TRUNC('day', current_date at time zone U."timezone")
 *   AND H."id" = :habitId!
 * ```
 */
export const findRecentHabitEvents = new PreparedQuery<IFindRecentHabitEventsParams,IFindRecentHabitEventsResult>(findRecentHabitEventsIR);


/** 'FindDistinctChatIds' parameters type */
export type IFindDistinctChatIdsParams = void;

/** 'FindDistinctChatIds' return type */
export interface IFindDistinctChatIdsResult {
  chatId: string;
}

/** 'FindDistinctChatIds' query type */
export interface IFindDistinctChatIdsQuery {
  params: IFindDistinctChatIdsParams;
  result: IFindDistinctChatIdsResult;
}

const findDistinctChatIdsIR: any = {"usedParamSet":{},"params":[],"statement":"select distinct \"chatId\"\nfrom \"UserChat\""};

/**
 * Query generated from SQL:
 * ```
 * select distinct "chatId"
 * from "UserChat"
 * ```
 */
export const findDistinctChatIds = new PreparedQuery<IFindDistinctChatIdsParams,IFindDistinctChatIdsResult>(findDistinctChatIdsIR);


/** 'DeleteUser' parameters type */
export interface IDeleteUserParams {
  telegramId: number | string;
}

/** 'DeleteUser' return type */
export type IDeleteUserResult = void;

/** 'DeleteUser' query type */
export interface IDeleteUserQuery {
  params: IDeleteUserParams;
  result: IDeleteUserResult;
}

const deleteUserIR: any = {"usedParamSet":{"telegramId":true},"params":[{"name":"telegramId","required":true,"transform":{"type":"scalar"},"locs":[{"a":40,"b":51}]}],"statement":"delete\nfrom \"User\"\nwhere \"telegramId\" = :telegramId!"};

/**
 * Query generated from SQL:
 * ```
 * delete
 * from "User"
 * where "telegramId" = :telegramId!
 * ```
 */
export const deleteUser = new PreparedQuery<IDeleteUserParams,IDeleteUserResult>(deleteUserIR);


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


/** 'FindHabitFollower' parameters type */
export interface IFindHabitFollowerParams {
  habitId?: string | null | void;
  telegramId?: number | string | null | void;
}

/** 'FindHabitFollower' return type */
export interface IFindHabitFollowerResult {
  createdAt: Date;
  habitId: string;
  id: string;
  userId: string;
}

/** 'FindHabitFollower' query type */
export interface IFindHabitFollowerQuery {
  params: IFindHabitFollowerParams;
  result: IFindHabitFollowerResult;
}

const findHabitFollowerIR: any = {"usedParamSet":{"telegramId":true,"habitId":true},"params":[{"name":"telegramId","required":false,"transform":{"type":"scalar"},"locs":[{"a":96,"b":106}]},{"name":"habitId","required":false,"transform":{"type":"scalar"},"locs":[{"a":226,"b":233}]}],"statement":"with cur_user as (select *\n                  from \"User\"\n                  where \"telegramId\" = :telegramId\n                  LIMIT 1)\nSELECT * FROM \"HabitFollower\"\nWHERE \"userId\" = (select id from cur_user)\n  AND \"habitId\" = :habitId"};

/**
 * Query generated from SQL:
 * ```
 * with cur_user as (select *
 *                   from "User"
 *                   where "telegramId" = :telegramId
 *                   LIMIT 1)
 * SELECT * FROM "HabitFollower"
 * WHERE "userId" = (select id from cur_user)
 *   AND "habitId" = :habitId
 * ```
 */
export const findHabitFollower = new PreparedQuery<IFindHabitFollowerParams,IFindHabitFollowerResult>(findHabitFollowerIR);


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


