/* @name FindHabits */
select *
from habits;

/* @name FindHabitByTitle */
select *
from habits
where title = :title;

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
values (:user_id, :habit_id, now());
