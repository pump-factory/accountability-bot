SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE ROLE "accountability-bot" WITH LOGIN PASSWORD 'password';

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."habit_completions"
(
    "user_id"      bigint  NOT NULL,
    "habit_id"     integer NOT NULL,
    "completed_at" "date"  NOT NULL
);

ALTER TABLE "public"."habit_completions"
    OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."habits"
(
    "id"         integer                                            NOT NULL,
    "chat_id"    bigint                                             NOT NULL,
    "title"      "text"                                             NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."habits"
    OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."habits_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."habits_id_seq"
    OWNER TO "postgres";

ALTER SEQUENCE "public"."habits_id_seq" OWNED BY "public"."habits"."id";

CREATE TABLE IF NOT EXISTS "public"."users"
(
    "name"        "text"                                             NOT NULL,
    "telegram_id" bigint                                             NOT NULL,
    "created_at"  timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at"  timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."users"
    OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."users_chats"
(
    "user_id" bigint NOT NULL,
    "chat_id" bigint NOT NULL
);

ALTER TABLE "public"."users_chats"
    OWNER TO "postgres";

ALTER TABLE ONLY "public"."habits"
    ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."habits_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."habit_completions"
    ADD CONSTRAINT "habit_completions_pkey" PRIMARY KEY ("user_id", "habit_id", "completed_at");

ALTER TABLE ONLY "public"."habits"
    ADD CONSTRAINT "habits_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users_chats"
    ADD CONSTRAINT "users_chats_pkey" PRIMARY KEY ("user_id", "chat_id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("telegram_id");

ALTER TABLE ONLY "public"."habit_completions"
    ADD CONSTRAINT "habit_completions_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "public"."habits" ("id");

ALTER TABLE ONLY "public"."habit_completions"
    ADD CONSTRAINT "habit_completions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("telegram_id");

ALTER TABLE ONLY "public"."users_chats"
    ADD CONSTRAINT "users_chats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("telegram_id");

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."habit_completions" TO "anon";
GRANT ALL ON TABLE "public"."habit_completions" TO "authenticated";
GRANT ALL ON TABLE "public"."habit_completions" TO "service_role";
GRANT ALL ON TABLE "public"."habit_completions" TO "accountability-bot";

GRANT ALL ON TABLE "public"."habits" TO "anon";
GRANT ALL ON TABLE "public"."habits" TO "authenticated";
GRANT ALL ON TABLE "public"."habits" TO "service_role";
GRANT ALL ON TABLE "public"."habits" TO "accountability-bot";

GRANT ALL ON SEQUENCE "public"."habits_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."habits_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."habits_id_seq" TO "service_role";
GRANT ALL ON SEQUENCE "public"."habits_id_seq" TO "accountability-bot";

GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";
GRANT ALL ON TABLE "public"."users" TO "accountability-bot";

GRANT ALL ON TABLE "public"."users_chats" TO "anon";
GRANT ALL ON TABLE "public"."users_chats" TO "authenticated";
GRANT ALL ON TABLE "public"."users_chats" TO "service_role";
GRANT ALL ON TABLE "public"."users_chats" TO "accountability-bot";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";

RESET ALL;
