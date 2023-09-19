/* @name FindHabits */
select
	*
from
	habits;

/* @name FindHabitCompletionsForUser */
select
	*
from
	habit_completions
where
	user_id = :user_id;

/* @name FindHabitCompletionsForUserToday */
select
	*
from
	habit_completions
where
	user_id = :user_id
	and completed_at > now() - interval '1 day';

/* @name LogHabitCompletion */
insert into
	habit_completions (user_id, habit_id, completed_at)
values
	(:user_id, :habit_id, now());
