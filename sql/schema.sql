CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';

CREATE TYPE "HabitMakingCadence" AS ENUM (
    'MONTHLY',
    'WEEKLY',
    'DAILY'
);

CREATE TYPE "HabitType" AS ENUM (
    'MAKING',
    'BREAKING'
);

CREATE FUNCTION delete_mirror_friend() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE
    FROM "Friend"
    WHERE "leftId" = old."rightId"
      AND "rightId" = old."leftId";
    RETURN OLD;
END
$$;

CREATE FUNCTION mirror_friend() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO "Friend" ("leftId", "rightId", "createdAt")
    VALUES (new."rightId", new."leftId", new."createdAt")
    ON CONFLICT DO NOTHING;
    RETURN NEW;
END
$$;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE "Friend" (
    "leftId" text NOT NULL,
    "rightId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "FriendRequest" (
    id text NOT NULL,
    "ownerId" text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "Habit" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type "HabitType" DEFAULT 'BREAKING'::"HabitType" NOT NULL,
    cadence "HabitMakingCadence" DEFAULT 'DAILY'::"HabitMakingCadence" NOT NULL,
    frequency integer DEFAULT 0 NOT NULL
);

CREATE TABLE "HabitChat" (
    "habitId" text NOT NULL,
    "chatId" bigint NOT NULL
);

CREATE TABLE "HabitEvent" (
    id text NOT NULL,
    "habitFollowerId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "HabitFollower" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "habitId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "Password" (
    hash text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);

CREATE TABLE "User" (
    id text NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    name text NOT NULL,
    "telegramId" bigint
);

CREATE TABLE "UserChat" (
    "chatId" bigint NOT NULL,
    "userId" text NOT NULL
);

CREATE TABLE _prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);

ALTER TABLE ONLY "FriendRequest"
    ADD CONSTRAINT "FriendRequest_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "Friend"
    ADD CONSTRAINT "Friend_pkey" PRIMARY KEY ("leftId", "rightId");

ALTER TABLE ONLY "HabitChat"
    ADD CONSTRAINT "HabitChat_pkey" PRIMARY KEY ("habitId", "chatId");

ALTER TABLE ONLY "HabitEvent"
    ADD CONSTRAINT "HabitEvent_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "HabitFollower"
    ADD CONSTRAINT "HabitFollower_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "Habit"
    ADD CONSTRAINT "Habit_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "UserChat"
    ADD CONSTRAINT "UserChat_pkey" PRIMARY KEY ("chatId", "userId");

ALTER TABLE ONLY "User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY _prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);

CREATE UNIQUE INDEX "FriendRequest_ownerId_key" ON "FriendRequest" USING btree ("ownerId");
CREATE UNIQUE INDEX "FriendRequest_userId_key" ON "FriendRequest" USING btree ("userId");

CREATE UNIQUE INDEX "Password_userId_key" ON "Password" USING btree ("userId");

CREATE UNIQUE INDEX "User_email_key" ON "User" USING btree (email);

CREATE TRIGGER delete_mirror_friend_trigger AFTER DELETE ON "Friend" FOR EACH ROW EXECUTE FUNCTION delete_mirror_friend();

CREATE TRIGGER mirror_friend_trigger AFTER INSERT ON "Friend" FOR EACH ROW EXECUTE FUNCTION mirror_friend();

ALTER TABLE ONLY "FriendRequest"
    ADD CONSTRAINT "FriendRequest_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "FriendRequest"
    ADD CONSTRAINT "FriendRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "Friend"
    ADD CONSTRAINT "Friend_leftId_fkey" FOREIGN KEY ("leftId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "Friend"
    ADD CONSTRAINT "Friend_rightId_fkey" FOREIGN KEY ("rightId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "HabitChat"
    ADD CONSTRAINT "HabitChat_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "HabitEvent"
    ADD CONSTRAINT "HabitEvent_habitFollowerId_fkey" FOREIGN KEY ("habitFollowerId") REFERENCES "HabitFollower"(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "HabitFollower"
    ADD CONSTRAINT "HabitFollower_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "HabitFollower"
    ADD CONSTRAINT "HabitFollower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "Password"
    ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
