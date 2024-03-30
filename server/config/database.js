import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  waitForConnections: true, // Wait for available connection if connection limit is reached
  connectionLimit: 10, // Maximum number of connections to create at once
  queueLimit: 0, // Unlimited queueing requests (default)
});

// Handle connection errors
db.on("error", (err) => {
  console.error("Database connection error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    // Re-establish connection
    db.getConnection((error, connection) => {
      if (error) {
        console.error("Error reconnecting:", error);
      } else {
        console.log("Reconnected to database.");
        connection.release();
      }
    });
  }
});

export default db;
