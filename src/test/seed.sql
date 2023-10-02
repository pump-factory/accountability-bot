-- Create four users
INSERT INTO users (name, telegram_id)
VALUES ('User1', 1),
       ('User2', 2),
       ('User3', 3),
       ('User4', 4);

-- Create two habits, one per chatID
INSERT INTO habits (chat_id, title)
VALUES (-999, 'Habit1'),
       (-1000, 'Habit2');

-- Create user-chat associations
INSERT INTO users_chats (user_id, chat_id)
VALUES (1, -999),
       (2, -999),
       (3, -1000),
       (4, -1000);

-- Log a few habits for previous days for each habit
INSERT INTO habit_completions (user_id, habit_id, completed_at)
VALUES (1, 1, '2023-09-10'),
       (1, 1, '2023-09-11'),
       (2, 1, '2023-09-12'),
       (3, 2, '2023-09-10'),
       (4, 2, '2023-09-11');

-- Log a completion for today for one user in one chat
INSERT INTO habit_completions (user_id, habit_id, completed_at)
VALUES (1, 1, CURRENT_DATE);
