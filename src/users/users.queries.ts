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


