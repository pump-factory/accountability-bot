/* @name FindUserByTelegramId */
select *
from "User"
where "telegramId" = :telegram_id
limit 1;

/* @name CreateUser */
with new_user as (
    insert into "User" (id, "telegramId", "name", "createdAt", "updatedAt", "email")
        values (uuid_generate_v4(), :telegramId, :name, now(), now(),
                uuid_generate_v4()::text || '@example.com'::text)
        returning id)
insert
into "UserChat" ("userId", "chatId")
select id, :chatId
from new_user;

/* @name FindUsersWithoutHabitCompletions */
SELECT "User".*
FROM "User"
         JOIN "UserChat" ON "User".id = "UserChat"."userId"
         JOIN "HabitFollower" HF on "User".id = HF."userId"
         LEFT JOIN "HabitEvent" ON (
            "HabitEvent"."habitFollowerId" = HF.id AND
            "HabitEvent"."createdAt" = CURRENT_DATE
    )
         LEFT JOIN "Habit" H on HF."habitId" = H.id
--LEFT JOIN habits ON habits.id = habit_completions.habit_id
WHERE "HabitEvent".id IS NULL
  AND "UserChat"."chatId" = :chatId;

/* @name FindDistinctChatIds */
select distinct "chatId"
from "UserChat";
