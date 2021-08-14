const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "0812yasu",
  host: "localhost",
  port: 5432,
  database: "nodesql",
});

module.exports = pool;
