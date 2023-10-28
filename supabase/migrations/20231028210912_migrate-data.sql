delete
from "User";

insert into "User" (id, email, "createdAt", "updatedAt", "telegramId", name)
SELECT uuid_generate_v4(),
       uuid_generate_v4() || '@example.com',
       created_at,
       updated_at,
       telegram_id,
       name
from users;

delete
from "Habit";

insert into "Habit" (id, title, description, "createdAt", type)
SELECT uuid_generate_v4(), title, '', created_at, 'MAKING'::"HabitType"
from habits;

delete
from "HabitChat";

insert into "HabitChat" ("habitId", "chatId")
SELECT H.id, habits.chat_id
from habits
         join public."Habit" H on habits.title = H.title;

delete
from "UserChat";

insert into "UserChat" ("chatId", "userId")
SELECT users_chats.chat_id, u.id
from users_chats
         join "User" u on u."telegramId" = users_chats.user_id;

delete
from "HabitFollower";

insert into "HabitFollower" (id, "userId", "habitId")
SELECT uuid_generate_v4(), "UserChat"."userId", HC."habitId"
from "UserChat"
         join "HabitChat" HC on "UserChat"."chatId" = HC."chatId";

delete
from "HabitEvent";

insert into "HabitEvent" (id, "habitFollowerId", "createdAt")
SELECT uuid_generate_v4(), HF.id, habit_completions.completed_at
from habit_completions
         join public."User" U on habit_completions.user_id = U."telegramId"
         join public.habits h on h.id = habit_completions.habit_id
         join public."Habit" H2 on h.title = H2.title
         join public."HabitFollower" HF on U.id = HF."userId" and HF."habitId" = H2.id;
