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
with new_habit as (
    insert into "Habit" (id, title, description)
        values (uuid_generate_v4(), :title, 'telegram habit')
        returning id)
insert
into "HabitChat" ("habitId", "chatId")
    (select id, :chatId
     from new_habit);

/* @name LogHabitCompletion */
insert into "HabitEvent" (id, "habitFollowerId")
values (uuid_generate_v4(), (select id from "HabitFollower" where "userId" = :userId and "habitId" = :habitId))
ON CONFLICT DO NOTHING;

/*  @name FindHabitsGroupedByChatId */
SELECT "chatId", json_agg("Habit".*) AS habits
FROM "Habit"
         join public."HabitChat" HC on "Habit".id = HC."habitId"
GROUP BY "chatId";
