const { pool } = require("../db");

const findUser = name =>
  pool.query("SELECT * FROM Users WHERE username = $1", [name]);

module.exports = {
  findUser
};
