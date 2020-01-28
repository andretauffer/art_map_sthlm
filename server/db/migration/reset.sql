DROP TABLE IF EXISTS "users"
CASCADE;
DROP TABLE IF EXISTS "images"
CASCADE;
DROP TABLE IF EXISTS "items"
CASCADE;

SET timezone
= "Europe/Stockholm";


CREATE TABLE "users"
(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL unique,
    password VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    role BOOLEAN NOT NULL
);

CREATE TABLE "images"
(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL unique,
    data BYTEA NOT NULL,
    user_id INTEGER DEFAULT NULL,
    FOREIGN KEY
    (user_id) REFERENCES "users"
    (id)
);

CREATE TABLE "items"
(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL unique,
    latitude DECIMAL,
    longitude DECIMAL,
    user_id INTEGER DEFAULT NULL,
    FOREIGN KEY
    (user_id) REFERENCES "users"
    (id)
);

CREATE TABLE "items_images"
(
    id SERIAL PRIMARY KEY,
    item_id INTEGER DEFAULT NULL,
    FOREIGN KEY (item_id) REFERENCES "items" (id),
    image_id INTEGER DEFAULT NULL,
    FOREIGN KEY
    (image_id) REFERENCES "images"
    (id)
);


