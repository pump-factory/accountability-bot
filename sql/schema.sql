CREATE ROLE "accountability-bot" WITH LOGIN PASSWORD 'password';

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "accountability-bot";
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "accountability-bot";
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO "accountability-bot";

CREATE TABLE IF NOT EXISTS users (
	name TEXT NOT NULL,
	telegram_id integer PRIMARY KEY NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

create table if not exists habits (
	id SERIAL PRIMARY KEY,
    chat_id integer NOT NULL,
	title TEXT NOT NULL,
	description TEXT,
	created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS habit_completions (
	user_id INTEGER REFERENCES users(telegram_id),
	habit_id INTEGER REFERENCES habits(id),
	completed_at DATE NOT NULL,
    PRIMARY KEY (user_id, completed_at)
);
