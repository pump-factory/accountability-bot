/* @name FindUserByTelegramId */
select *
from users
where telegram_id = :telegram_id
limit 1;

/* @name CreateUser */
insert into users (telegram_id, name)
values (:telegram_id, :name)
returning *;

/* @name FindUsersWithoutHabitCompletions */
SELECT users.*
FROM users
         JOIN users_chats ON users.telegram_id = users_chats.user_id
         LEFT JOIN habit_completions ON (
            habit_completions.user_id = users.telegram_id AND
            habit_completions.completed_at = CURRENT_DATE
    )
         LEFT JOIN habits ON habits.id = habit_completions.habit_id
WHERE habit_completions.user_id IS NULL
  AND users_chats.chat_id = :chat_id;

/* @name FindDistinctChatIds */
select distinct chat_id
from users_chats;

/* @name CreateUsersChatsEntryForUser */
insert into users_chats (user_id, chat_id)
values (:user_id, :chat_id);