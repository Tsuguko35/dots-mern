import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  waitForConnections: true, // Optionally, wait for connections instead of throwing errors
  connectionLimit: 50, // Adjust as per your requirements
  queueLimit: 0, // No limit on the number of waiting connections
  enableKeepAlive: true,
  keepAliveInitialDelay: 30000,
});

const db = pool.promise(); // Using promise wrapper for easier async/await usage

export default db;
