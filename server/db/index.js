const { Pool } = require("pg");

const pool = new Pool({
  connectionString: global.gConfig.databaseConnectionString
});

const databaseConnect = async () => {
  console.debug("connecting to database");
  try {
    await pool.connect();
    console.debug("connection established");
  } catch (err) {
    console.debug(err);
  }
};

module.exports.databaseConnect = databaseConnect;
module.exports.pool = pool;
