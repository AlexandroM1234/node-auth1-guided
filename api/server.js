const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/auth-router");

const authenticator = require("../auth/authenticator.js");
const server = express();

const sessionConfig = {
  name: "Monster",
  secret: process.env.SESSION_SECRET || "can you keep a secret",
  resave: false,
  saveUninitialize: process.env.SEND_COOKIES || true,
  cookie: {
    maxAge: 1000 * 60 * 10, // good for 10 minutes in milliseconds
    secure: process.env.USE_SECURE_COOKIES || false,
    httpOnly: true, // can JS on the client access the cookie
  },
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", authenticator, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
