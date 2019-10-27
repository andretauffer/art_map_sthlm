const express = require("express");
const path = require("path");
const pg = require("pg");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const Client = pg.Client;
const app = express();

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "artmap",
  password: "artmap2019",
  database: "artmapsthlm"
});

const connect = async () => {
  console.log("Connecting to database");
  try {
    await client.connect();
    console.log("connected to db");
  } catch (e) {
    console.log("error", e);
  }
};

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
