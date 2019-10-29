const express = require("express");
const path = require("path");
const pg = require("pg");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { databaseConnect } = require("./db");
const Client = pg.Client;
const app = express();

databaseConnect();

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

app.get("/create", async (req, res) => {
  await client.query(`create table if not exists Users (
            id serial primary key,
        username varchar not null unique,
        password varchar not null,
        name varchar not null
        );`);

  res.end();
});

app.get("/createuser", async (req, res) => {
  await client.query(`create table if not exists Users (
            id serial primary key,
            username varchar not null unique,
            password varchar not null,
            name varchar not null
            admin boolean not null
            );`);
  await client.query(
    `insert into Users(username, password, name) values ('admin', 'secret', 'Admin', 'true')`
  );
  res.end();
});
