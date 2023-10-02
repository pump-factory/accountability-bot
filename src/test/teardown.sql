drop table if exists users_chats;
drop table if exists habit_completions;
drop table if exists habits;
drop table if exists users;

drop role "accountability-bot";

DO
$$
    DECLARE
        seqname text;
    BEGIN
        FOR seqname IN (SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = 'public')
            LOOP
                EXECUTE 'ALTER SEQUENCE ' || seqname || ' RESTART WITH 1';
            END LOOP;
    END
$$;
