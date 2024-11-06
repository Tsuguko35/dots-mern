import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

import db from "./config/database.js";
import {
  adminRoutes,
  documentRoutes,
  settingsRoutes,
  templateRoutes,
  userRoutes,
} from "./routes/index.js";
import bodyParser from "body-parser";

import cron from "node-cron";
import {
  checkDocumentsToArchive,
  checkPendingDocuments,
  keepFTPConnection,
} from "./controllers/scheduledFunctions.js";
import client from "./config/client.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});

// Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// app.use('/api', (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://cvrs.slarenasitsolutions.com');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     next();
// });
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/document_Files", express.static("./document_Files/files"));
app.use("/signature_Files", express.static("./document_Files/signatures"));
app.use("/profile_Pic", express.static("./user_Files/profilePics"));
app.use("/template", express.static("./template_Files/templates"));

app.locals.io = io;

// Connect Server
// db.connect((err) => {
//   if (err) {
//     console.log("Error connecting to MySQL database:", err);
//     return;
//   }
//   console.log("Connected to MySQL database successfully");
// });

// Socket IO Connections
io.on("connection", (socket) => {
  console.log(`user connected`);

  socket.on("join", (user_id) => {
    socket.join(user_id);
  });

  socket.on("notifications", (user_id) => {
    socket.broadcast.emit("notifications", user_id);
  });
});

// Document Routes
app.use("/api/document", documentRoutes);

// Settings Routes
app.use("/api/settings", settingsRoutes);

// Template Routes
app.use("/api/template", templateRoutes);

// User Routes
app.use("/api/user", userRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// Admin Routes
app.post("/api/keepAlive", (req, res) => {
  const currentTime = new Date().toLocaleString();

  console.log(`Keep alive request received at ${currentTime}`);

  res.send(`Keep alive request received at ${currentTime}`);
});

// Cron schedules
cron.schedule("0 * * * *", checkDocumentsToArchive);
cron.schedule("0 0 * * *", checkPendingDocuments);
// cron.schedule("* * * * *", keepFTPConnection);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
  client.connect({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    port: process.env.FTP_PORT,
    pasvTimeout: 10000,
    keepalive: 10000,
    connTimeout: 10000,
  });

  setInterval(keepFTPConnection, 50000);
});
