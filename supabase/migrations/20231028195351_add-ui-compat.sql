-- Table Definition ----------------------------------------------

CREATE TABLE "User"
(
    id           text PRIMARY KEY,
    email        text                           NOT NULL,
    "createdAt"  timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"  timestamp(3) without time zone NOT NULL,
    name         text                           NOT NULL,
    "telegramId" bigint
);

CREATE UNIQUE INDEX "User_email_key" ON "User" (email text_ops);


-- Table Definition ----------------------------------------------

CREATE TABLE "Friend"
(
    "leftId"    text REFERENCES "User" (id) ON DELETE CASCADE ON UPDATE CASCADE,
    "rightId"   text REFERENCES "User" (id) ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Friend_pkey" PRIMARY KEY ("leftId", "rightId")
);


-- Triggers -------------------------------------------------------
create function mirror_friend() returns trigger
    language plpgsql
as
$$
BEGIN
    INSERT INTO "Friend" ("leftId", "rightId", "createdAt")
    VALUES (new."rightId", new."leftId", new."createdAt")
    ON CONFLICT DO NOTHING;
    RETURN NEW;
END
$$;

create function delete_mirror_friend() returns trigger
    language plpgsql
as
$$
BEGIN
    DELETE
    FROM "Friend"
    WHERE "leftId" = old."rightId"
      AND "rightId" = old."leftId";
    RETURN OLD;
END
$$;


CREATE TRIGGER mirror_friend_trigger
    AFTER INSERT
    ON public."Friend"
    FOR EACH ROW
EXECUTE FUNCTION public.mirror_friend();

CREATE TRIGGER delete_mirror_friend_trigger
    AFTER DELETE
    ON public."Friend"
    FOR EACH ROW
EXECUTE FUNCTION public.delete_mirror_friend();


-- Table Definition ----------------------------------------------

CREATE TABLE "FriendRequest"
(
    id          text PRIMARY KEY,
    "ownerId"   text                           NOT NULL REFERENCES "User" (id) ON DELETE CASCADE ON UPDATE CASCADE,
    "userId"    text                           NOT NULL REFERENCES "User" (id) ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "FriendRequest_ownerId_key" ON "FriendRequest" ("ownerId" text_ops);
CREATE UNIQUE INDEX "FriendRequest_userId_key" ON "FriendRequest" ("userId" text_ops);

-- Table Definition ----------------------------------------------

create type "HabitMakingCadence" as enum ('MONTHLY', 'WEEKLY', 'DAILY');
create type "HabitType" as enum ('MAKING', 'BREAKING');

CREATE TABLE "Habit"
(
    id          text PRIMARY KEY,
    title       text                           NOT NULL,
    description text                           NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    type        "HabitType"                    NOT NULL DEFAULT 'BREAKING'::"HabitType",
    cadence     "HabitMakingCadence"           NOT NULL DEFAULT 'DAILY'::"HabitMakingCadence",
    frequency   integer                        NOT NULL DEFAULT 0
);

-- Table Definition ----------------------------------------------

CREATE TABLE "HabitChat"
(
    "habitId" text REFERENCES "Habit" (id) ON DELETE CASCADE ON UPDATE CASCADE,
    "chatId"  bigint,
    CONSTRAINT "HabitChat_pkey" PRIMARY KEY ("habitId", "chatId")
);

-- Table Definition ----------------------------------------------

CREATE TABLE "HabitFollower"
(
    id          text PRIMARY KEY,
    "userId"    text                           NOT NULL REFERENCES "User" (id) ON DELETE CASCADE ON UPDATE CASCADE,
    "habitId"   text                           NOT NULL REFERENCES "Habit" (id) ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table Definition ----------------------------------------------

CREATE TABLE "HabitEvent"
(
    id                text PRIMARY KEY,
    "habitFollowerId" text                           NOT NULL REFERENCES "HabitFollower" (id) ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt"       timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table Definition ----------------------------------------------

CREATE TABLE "Password"
(
    hash        text                           NOT NULL,
    "userId"    text                           NOT NULL REFERENCES "User" (id) ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL
);

-- Table Definition ----------------------------------------------

CREATE TABLE "UserChat"
(
    "chatId" bigint,
    "userId" text REFERENCES "User" (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserChat_pkey" PRIMARY KEY ("chatId", "userId")
);