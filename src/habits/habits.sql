/* @name FindHabitsByChatId */
select *
from habits;

/* @name FindHabit */
select *
from habits
where title = :title
  and chat_id = :chat_id;

/* @name FindHabitCompletionsForUser */
select *
from habit_completions
where user_id = :user_id;

/* @name FindHabitCompletionsForUserToday */
select *
from habit_completions
where user_id = :user_id
  and completed_at > now() - interval '1 day';

/* @name CreateHabit */
insert into habits (title, chat_id)
values (:title, :chat_id);

/* @name LogHabitCompletion */
insert into habit_completions (user_id, habit_id, completed_at)
values (:user_id, :habit_id, now())
ON CONFLICT DO NOTHING;

/*  @name FindHabitsGroupedByChatId */
SELECT chat_id, json_agg(habits.*) AS habits
FROM habits
GROUP BY chat_id;
