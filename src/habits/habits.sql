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
insert
into "HabitEvent" (id, "habitFollowerId")
values (uuid_generate_v4(), (select id
                             from "HabitFollower"
                             where "userId" = (select id from "User" where "telegramId" = :telegramId)
                               and "habitId" = :habitId))
ON CONFLICT DO NOTHING;

/*  @name FindHabitsGroupedByChatId */
SELECT "chatId", json_agg("Habit".*) AS habits
FROM "Habit"
         join public."HabitChat" HC on "Habit".id = HC."habitId"
GROUP BY "chatId";
