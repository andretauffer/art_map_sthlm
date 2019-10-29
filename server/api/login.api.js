const { pool } = require('../db');


let user = await client.query("SELECT * FROM Users WHERE username = $1", [
