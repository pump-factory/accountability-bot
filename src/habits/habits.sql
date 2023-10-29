/* @name FindHabitsByChatId */
select "Habit".*
from "Habit"
         join "HabitChat"
              on "Habit".id = "HabitChat"."habitId"
where "HabitChat"."chatId" = :chatId;

/* @name FindHabit */
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

/* @name FindHabitCompletionsForUser */
select "HabitEvent".*
from "HabitEvent"
where "habitFollowerId" = :userId;

/* @name FindHabitCompletionsForUserToday */
select "HabitEvent".*
from "HabitEvent"
where "habitFollowerId" = :userId
  and "createdAt" > now() - interval '1 day';

/* @name CreateHabit */
WITH new_habit AS (
    INSERT INTO "Habit" (id, title, description, type, cadence, frequency)
        VALUES (uuid_generate_v4(), :title, 'telegram habit', 'MAKING', 'DAILY', 0)
        RETURNING id),
     new_habit_chat AS (
         INSERT INTO "HabitChat" ("habitId", "chatId")
             SELECT id, :chatId
             FROM new_habit)
INSERT
INTO "HabitFollower" (id, "habitId", "userId", "createdAt")
SELECT uuid_generate_v4(), nh.id, uc."userId", now()
FROM new_habit nh
         CROSS JOIN "UserChat" uc
WHERE uc."chatId" = :chatId;

/* @name LogHabitCompletion */
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

/*  @name FindHabitsGroupedByChatId */
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
