const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.UNAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

pool.query(
  `CREATE TABLE IF NOT EXISTS "form" ( form_id SERIAL PRIMARY KEY, form_data JSON NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_DATE )`
);

module.exports = pool;
