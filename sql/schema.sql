DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'accountability-bot') THEN
CREATE ROLE "accountability-bot" WITH LOGIN PASSWORD 'password';
   END IF;
END $$;

CREATE TABLE IF NOT EXISTS users (
	name TEXT NOT NULL,
	telegram_id bigint PRIMARY KEY NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

create table if not exists habits (
	id SERIAL PRIMARY KEY,
    chat_id bigint NOT NULL,
	title TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS habit_completions (
	user_id bigint REFERENCES users(telegram_id),
	habit_id INTEGER REFERENCES habits(id),
	completed_at DATE NOT NULL,
    PRIMARY KEY (user_id, habit_id, completed_at)
);

CREATE TABLE IF NOT EXISTS users_chats (
    user_id bigint REFERENCES users(telegram_id),
    chat_id bigint NOT NULL,
    PRIMARY KEY (user_id, chat_id)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "accountability-bot";
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "accountability-bot";
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO "accountability-bot";
