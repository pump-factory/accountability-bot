/* @name findUserByTelegramId */
select *
from "User"
where "telegramId" = :telegramId!
limit 1;

/* @name findUsersInChat */
SELECT *
FROM "User"
         JOIN "UserChat" ON "User".id = "UserChat"."userId"
WHERE "UserChat"."chatId" = :chatId!;

/* @name createUser */
with new_user as (
    insert into "User" (id, "telegramId", "name", "createdAt", "updatedAt", "email")
        values (uuid_generate_v4(), :telegramId!, :name!, now(), now(),
                uuid_generate_v4()::text || '@example.com'::text)
        returning id)
insert
into "UserChat" ("userId", "chatId")
select id, :chatId!
from new_user;

/* @name findUsersWithoutHabitCompletions */
SELECT DISTINCT "User".*
FROM "User"
         JOIN "UserChat" ON "User".id = "UserChat"."userId"
         JOIN "HabitFollower" HF on "User".id = HF."userId"
         JOIN "Habit" H on HF."habitId" = H.id
         JOIN "HabitChat" HC on H.id = HC."habitId" AND HC."chatId" = :chatId
         LEFT JOIN "HabitEvent" ON (
            "HabitEvent"."habitFollowerId" = HF.id AND
            "HabitEvent"."createdAt" AT TIME ZONE "User"."timezone" >= (CURRENT_DATE AT TIME ZONE "User"."timezone")
    )
WHERE "HabitEvent".id IS NULL
  AND "UserChat"."chatId" = :chatId!;

/* @name findRecentHabitEvents */
SELECT U.id as "userId", H.title, U.name, "HabitEvent"."createdAt" AT TIME ZONE 'UTC' AT TIME ZONE U."timezone", DATE_TRUNC('day', current_date at time zone U."timezone") as "recentCutoff"
FROM "HabitEvent"
         JOIN "HabitFollower" HF on "HabitEvent"."habitFollowerId" = HF.id
         JOIN "Habit" H on HF."habitId" = H.id
         JOIN "User" U on HF."userId" = U.id
WHERE ("HabitEvent"."createdAt" AT TIME ZONE 'UTC' AT TIME ZONE U."timezone") >= DATE_TRUNC('day', current_date at time zone U."timezone")
  AND H."id" = :habitId!;

/* @name FindDistinctChatIds */
select distinct "chatId"
from "UserChat";

/* @name DeleteUser */
delete
from "User"
where "telegramId" = :telegramId!;

/* @name findHabitsByChatId */
select "Habit".*
from "Habit"
         join "HabitChat"
              on "Habit".id = "HabitChat"."habitId"
where "HabitChat"."chatId" = :chatId;

/* @name findHabit */
select "Habit".*
from "Habit"
         join "HabitChat"
              on "Habit".id = "HabitChat"."habitId"
where "Habit".id = :habitId
  and "chatId" = :chatId;

/* @name findHabitByTitle */
select "Habit".*
from "Habit"
         join "HabitChat"
              on "Habit".id = "HabitChat"."habitId"
where "HabitChat"."chatId" = :chatId
  and "Habit".title = :title;

/* @name findHabitCompletionsForUser */
select "HabitEvent".*
from "HabitEvent"
where "habitFollowerId" = :userId;

/* @name findHabitCompletionsForUserToday */
select "HabitEvent".*
from "HabitEvent"
where "habitFollowerId" = :userId
  and "createdAt" > now() - interval '1 day';

/* @name createHabit */
INSERT INTO "Habit" (id, title, description, type, cadence, frequency)
VALUES (uuid_generate_v4(), :title, 'telegram habit', 'MAKING', 'DAILY', 0)
RETURNING id;

/* @name findHabitFollower */
with cur_user as (select *
                  from "User"
                  where "telegramId" = :telegramId!
                  LIMIT 1)
SELECT * FROM "HabitFollower"
WHERE "userId" = (select id from cur_user)
  AND "habitId" = :habitId!;

/* @name createHabitFollower */
insert into "HabitFollower" (id, "userId", "habitId", "createdAt")
select uuid_generate_v4(), id, :habitId, now()
from "User"
where "telegramId" = :telegramId!;

/* @name createHabitChat */
INSERT INTO "HabitChat" ("habitId", "chatId")
VALUES (:habitId, :chatId);

/* @name logHabitCompletion */
with cur_user as (select *
                  from "User"
                  where "telegramId" = :telegramId
                  LIMIT 1)
insert
into "HabitEvent" (id, "habitFollowerId", "loggedAtUserTz")
values (uuid_generate_v4(), (select id
                             from "HabitFollower"
                             where "userId" = (select id from cur_user)
                               and "habitId" = :habitId), now() AT TIME ZONE (select timezone from cur_user))
ON CONFLICT DO NOTHING;

/*  @name findHabitsGroupedByChatId */
SELECT "chatId", json_agg("Habit".*) AS habits
FROM "Habit"
         join public."HabitChat" HC on "Habit".id = HC."habitId"
GROUP BY "chatId";

/* @name deleteHabitFollowersForUserAndChat */
DELETE
FROM "HabitFollower"
WHERE "userId" = (select id from "User" where "telegramId" = :telegramId)
  AND "habitId" in (select "habitId" from "HabitChat" where "chatId" = :chatId);

/* @name deleteUserChat */
DELETE
FROM "UserChat"
WHERE "userId" = (select id from "User" where "telegramId" = :telegramId)
  AND "chatId" = :chatId;
