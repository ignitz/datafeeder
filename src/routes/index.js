const express = require("express");
const users = require("./users");

const routes = express.Router();

routes.use("/api", users);

module.exports = routes;
