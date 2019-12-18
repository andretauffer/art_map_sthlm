DROP TABLE IF EXISTS "users"
CASCADE;
DROP TABLE IF EXISTS "images"
CASCADE;

SET timezone
= "Europe/Stockholm";


CREATE TABLE "users"
(
    id serial primary key,
    username varchar not null unique,
    password varchar not null,
    name varchar not null,
    role boolean not null
);

CREATE TABLE "images"
(
    id serial primary key,
    name varchar not null unique,
    image bytea not null
);
