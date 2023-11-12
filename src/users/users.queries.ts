/** Types generated for queries found in "src/users/users.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'FindUserByTelegramId' parameters type */
export interface IFindUserByTelegramIdParams {
  telegramId?: number | string | null | void;
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

const findUserByTelegramIdIR: any = {"usedParamSet":{"telegramId":true},"params":[{"name":"telegramId","required":false,"transform":{"type":"scalar"},"locs":[{"a":42,"b":52}]}],"statement":"select *\nfrom \"User\"\nwhere \"telegramId\" = :telegramId\nlimit 1"};

/**
 * Query generated from SQL:
 * ```
 * select *
 * from "User"
 * where "telegramId" = :telegramId
 * limit 1
 * ```
 */
export const findUserByTelegramId = new PreparedQuery<IFindUserByTelegramIdParams,IFindUserByTelegramIdResult>(findUserByTelegramIdIR);


/** 'FindUsersInChat' parameters type */
export interface IFindUsersInChatParams {
  chatId?: number | string | null | void;
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

const findUsersInChatIR: any = {"usedParamSet":{"chatId":true},"params":[{"name":"chatId","required":false,"transform":{"type":"scalar"},"locs":[{"a":109,"b":115}]}],"statement":"SELECT *\nFROM \"User\"\n         JOIN \"UserChat\" ON \"User\".id = \"UserChat\".\"userId\"\nWHERE \"UserChat\".\"chatId\" = :chatId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "User"
 *          JOIN "UserChat" ON "User".id = "UserChat"."userId"
 * WHERE "UserChat"."chatId" = :chatId
 * ```
 */
export const findUsersInChat = new PreparedQuery<IFindUsersInChatParams,IFindUsersInChatResult>(findUsersInChatIR);


/** 'CreateUser' parameters type */
export interface ICreateUserParams {
  chatId?: number | string | null | void;
  name?: string | null | void;
  telegramId?: number | string | null | void;
}

/** 'CreateUser' return type */
export type ICreateUserResult = void;

/** 'CreateUser' query type */
export interface ICreateUserQuery {
  params: ICreateUserParams;
  result: ICreateUserResult;
}

const createUserIR: any = {"usedParamSet":{"telegramId":true,"name":true,"chatId":true},"params":[{"name":"telegramId","required":false,"transform":{"type":"scalar"},"locs":[{"a":140,"b":150}]},{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":153,"b":157}]},{"name":"chatId","required":false,"transform":{"type":"scalar"},"locs":[{"a":317,"b":323}]}],"statement":"with new_user as (\n    insert into \"User\" (id, \"telegramId\", \"name\", \"createdAt\", \"updatedAt\", \"email\")\n        values (uuid_generate_v4(), :telegramId, :name, now(), now(),\n                uuid_generate_v4()::text || '@example.com'::text)\n        returning id)\ninsert\ninto \"UserChat\" (\"userId\", \"chatId\")\nselect id, :chatId\nfrom new_user"};

/**
 * Query generated from SQL:
 * ```
 * with new_user as (
 *     insert into "User" (id, "telegramId", "name", "createdAt", "updatedAt", "email")
 *         values (uuid_generate_v4(), :telegramId, :name, now(), now(),
 *                 uuid_generate_v4()::text || '@example.com'::text)
 *         returning id)
 * insert
 * into "UserChat" ("userId", "chatId")
 * select id, :chatId
 * from new_user
 * ```
 */
export const createUser = new PreparedQuery<ICreateUserParams,ICreateUserResult>(createUserIR);


/** 'CreateHabitFollower' parameters type */
export interface ICreateHabitFollowerParams {
  habitId?: string | null | void;
  telegramId?: number | string | null | void;
}

/** 'CreateHabitFollower' return type */
export type ICreateHabitFollowerResult = void;

/** 'CreateHabitFollower' query type */
export interface ICreateHabitFollowerQuery {
  params: ICreateHabitFollowerParams;
  result: ICreateHabitFollowerResult;
}

const createHabitFollowerIR: any = {"usedParamSet":{"habitId":true,"telegramId":true},"params":[{"name":"habitId","required":false,"transform":{"type":"scalar"},"locs":[{"a":98,"b":105}]},{"name":"telegramId","required":false,"transform":{"type":"scalar"},"locs":[{"a":147,"b":157}]}],"statement":"insert into \"HabitFollower\" (id, \"userId\", \"habitId\", \"createdAt\")\nselect uuid_generate_v4(), id, :habitId, now()\nfrom \"User\"\nwhere \"telegramId\" = :telegramId"};

/**
 * Query generated from SQL:
 * ```
 * insert into "HabitFollower" (id, "userId", "habitId", "createdAt")
 * select uuid_generate_v4(), id, :habitId, now()
 * from "User"
 * where "telegramId" = :telegramId
 * ```
 */
export const createHabitFollower = new PreparedQuery<ICreateHabitFollowerParams,ICreateHabitFollowerResult>(createHabitFollowerIR);


/** 'FindUsersWithoutHabitCompletions' parameters type */
export interface IFindUsersWithoutHabitCompletionsParams {
  chatId?: number | string | null | void;
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

const findUsersWithoutHabitCompletionsIR: any = {"usedParamSet":{"chatId":true},"params":[{"name":"chatId","required":false,"transform":{"type":"scalar"},"locs":[{"a":274,"b":280},{"a":555,"b":561}]}],"statement":"SELECT DISTINCT \"User\".*\nFROM \"User\"\n         JOIN \"UserChat\" ON \"User\".id = \"UserChat\".\"userId\"\n         JOIN \"HabitFollower\" HF on \"User\".id = HF.\"userId\"\n         JOIN \"Habit\" H on HF.\"habitId\" = H.id\n         JOIN \"HabitChat\" HC on H.id = HC.\"habitId\" AND HC.\"chatId\" = :chatId\n         LEFT JOIN \"HabitEvent\" ON (\n            \"HabitEvent\".\"habitFollowerId\" = HF.id AND\n            \"HabitEvent\".\"createdAt\" AT TIME ZONE \"User\".\"timezone\" >= (CURRENT_DATE AT TIME ZONE \"User\".\"timezone\")\n    )\nWHERE \"HabitEvent\".id IS NULL\n  AND \"UserChat\".\"chatId\" = :chatId"};

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
 *   AND "UserChat"."chatId" = :chatId
 * ```
 */
export const findUsersWithoutHabitCompletions = new PreparedQuery<IFindUsersWithoutHabitCompletionsParams,IFindUsersWithoutHabitCompletionsResult>(findUsersWithoutHabitCompletionsIR);


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
  telegramId?: number | string | null | void;
}

/** 'DeleteUser' return type */
export type IDeleteUserResult = void;

/** 'DeleteUser' query type */
export interface IDeleteUserQuery {
  params: IDeleteUserParams;
  result: IDeleteUserResult;
}

const deleteUserIR: any = {"usedParamSet":{"telegramId":true},"params":[{"name":"telegramId","required":false,"transform":{"type":"scalar"},"locs":[{"a":40,"b":50}]}],"statement":"delete\nfrom \"User\"\nwhere \"telegramId\" = :telegramId"};

/**
 * Query generated from SQL:
 * ```
 * delete
 * from "User"
 * where "telegramId" = :telegramId
 * ```
 */
export const deleteUser = new PreparedQuery<IDeleteUserParams,IDeleteUserResult>(deleteUserIR);


