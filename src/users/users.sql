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

/* @name createHabitFollower */
insert into "HabitFollower" (id, "userId", "habitId", "createdAt")
select uuid_generate_v4(), id, :habitId, now()
from "User"
where "telegramId" = :telegramId!;

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
