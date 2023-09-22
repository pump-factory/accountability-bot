createdb:
    createdb accountability-bot

dropdb:
    dropdb accountability-bot

resetdb:
    just dropdb
    just createdb
    just loadschema

loadschema:
    psql -d accountability-bot -f ./sql/schema.sql