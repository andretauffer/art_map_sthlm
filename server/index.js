const express = require('express');
const path = require('path');
const router = express.Router();
const pg = require('pg');
const Client = pg.Client;
const app = express();

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'artmap',
    password: 'artmap2019',
    database: 'artmapsthlm'
});


const connect = async () => {
    console.log('Connecting to database');
    try {
        await client.connect()
        console.log('connected to db')
    } catch (e) {
        console.log('error', e);
    }
};

connect()

async function fetchData() {
    await client.query(`create table if not exists Users (
            id serial primary key,
            username varchar not null,
            password varchar not null,
            name varchar not null
  );`)
    const res = await client.query('select * from Users');
    return res;
}

app.get('/', (req, res) => res.send('Hello World!'))

router.get('/getList', async (req, res) => {
    var list = await fetchData();
    res.send(list.rows);
});

app.get('/create', async (req, res) => {
    await client.query(`create table if not exists Users (
        id serial primary key,
        username varchar not null unique,
        password varchar not null,
        name varchar not null
  );`)
  
    res.end(200);
  });

  app.get('/createuser', async (req, res) => {
    await client.query(`create table if not exists Users (
        id serial primary key,
        username varchar not null unique,
        password varchar not null,
        name varchar not null
  );`)
    await client.query(`insert into Users(username, password, name) values ('Andre', 'brazil', 'André Tauffer')`);
    await client.query(`insert into Users(username, password, name) values ('Chris', 'sweden', 'Christian Sandström')`);
    await client.query(`insert into Users(username, password, name) values ('Christoffer', 'england', 'Christoffer Sundqvist')`);
    await client.query(`insert into Users(username, password, name) values ('Blocket', 'money', 'Blocket Co.')`);
    await client.query(`insert into Users(username, password, name) values ('Salt', 'sales', 'salt')`);
    res.end();
  });



// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'art_map_sthlm/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


router.get('/initCal', async (req, res) => {
    await client.query('DROP TABLE if exists Calendar');
    await client.query(`create table if not exists Calendar (
      id serial primary key,
      date date not null,
      year integer,
      month integer,
      day integer,
      weekday integer,
      availability integer,
      customer integer
  );`);
    await client.query(`insert into Calendar(date) values (generate_series('2019-01-01'::date,'2023-12-31'::date,'1 day'::interval))`);
    await client.query("update Calendar set weekday = extract(isodow from date)");
    await client.query("update Calendar set day = date_part('day', date)");
    await client.query("update Calendar set month = date_part('month', date)");
    await client.query("update Calendar set year = date_part('year', date)");
    await client.query("update Calendar set availability = 1");
    const calendarData = await client.query('select * from Calendar');
    res.send(201, calendarData);
  });
  
  router.get('/getCal', async (req, res) => {
    const resa = await client.query('select * from Calendar');
    res.send(resa.rows);
  });
  

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

// const express = require('express');
// // const bodyParser = require('body-parser')
// const path = require('path');
// const app = express();

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/ping', function (req, res) {
//  return res.send('pong');
// });

// app.get('/', function (req, res) {
//   res.send('Hello wooorld!');
// });

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.listen(process.env.PORT || 8080);

// const express = require('express')
// const app = express()
// const port = 4000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))