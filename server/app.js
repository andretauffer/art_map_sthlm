const express = require("express");
const path = require("path");
const pg = require("pg");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { databaseConnect, pool } = require("./db");
const { login } = require("./routers");

const app = express();

databaseConnect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());

// * ALLOW Cross-Origin Resource Sharing
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

async function fetchData() {
  await pool.query(`create table if not exists Users (
        id serial primary key,
        username varchar not null,
        password varchar not null,
        name varchar not null,
        admin boolean not null
        );`);
  const res = await pool.query("select * from Users");
  console.log(res);
  return res;
}

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/getList", async (req, res) => {
  console.log("list");
  var list = await fetchData();
  console.log(list);
  res.send(list.rows);
});

//reinitiates the users table
app.get("/refreshUsersTable", async (req, res) => {
  await pool.query("DROP TABLE if exists Users");

  await pool.query(`create table if not exists Users (
        id serial primary key,
        username varchar not null unique,
        password varchar not null,
        name varchar not null,
        admin boolean not null
        );`);

  await pool.query(
    `insert into Users(username, password, name, admin) values ('admin', 'secret', 'Admin', 'true')`
  );

  var list = await fetchData();
  console.log(list);
  res.send(list.rows);

  // res.end();
});

app.get("/deleteUsers", async (req, res) => {
  await pool.query("DROP TABLE Users");
  res.end();
});

app.use("/api/login", login);

// app.post("/api/login", async (req, res) => {
//   console.log("req body", req.body);
//   let user = await pool.query("SELECT * FROM Users WHERE username = $1", [
//     req.body.username
//   ]);
//   if (user.rows[0].password === req.body.password) {
//     const token = jwt.sign(
//       {
//         data: user.rows[0].id
//       },
//       "secret",
//       { expiresIn: 60 * 60 }
//     );
//     const retVal = { login: 1, id: token, name: user.rows[0].name };
//     res.send(JSON.stringify(retVal));
//   } else {
//     const retVal = { login: 0, status: "Invalid Password" };
//     res.send(JSON.stringify(retVal));
//   }
// });

// app.get('/worksT', async (req, res) => {
//     await client.query(`create table if not exists Users (
//         id serial primary key,
//         username varchar not null unique,
//         password varchar not null,
//         name varchar not null
//   );`)

//     res.end();
//   });

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "art_map_sthlm/build")));

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// connect();
const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
