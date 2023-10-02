-- Create four users
INSERT INTO users (name, telegram_id)
VALUES ('Quinn', 1),
       ('Dave', 2),
       ('Nicole', 3),
       ('Harrison', 4);

-- Create two habits, one per chatID
INSERT INTO habits (chat_id, title)
VALUES (-1000, 'Meditate'),
       (-999, 'Gym');

-- Create user-chat associations
INSERT INTO users_chats (user_id, chat_id)
VALUES
    -- Harrison & Quinn in a chat tracking Gym
    (1, -999),
    (4, -999),

    -- Dave Nicole & Harrison in a chat tracking Meditation
    (2, -1000),
    (3, -1000),
    (4, -1000);

-- Log a few habits for previous days for each habit
INSERT INTO habit_completions (user_id, habit_id, completed_at)
VALUES (1, 2, '2023-09-10'),
       (1, 2, '2023-09-11'),
       (2, 1, '2023-09-12'),
       (3, 1, '2023-09-10'),
       (4, 2, '2023-09-11'),
       (4, 1, '2023-09-11');

-- Quinn goes to the gym today
INSERT INTO habit_completions (user_id, habit_id, completed_at)
VALUES (1, 2, CURRENT_DATE);

-- Harrison meditates today
INSERT INTO habit_completions (user_id, habit_id, completed_at)
VALUES (4, 1, CURRENT_DATE);
