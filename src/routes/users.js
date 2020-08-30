const express = require("express");
const UserController = require("controllers/UserController");

const routes = express.Router();

routes.get("/users", UserController.example);

routes.post("/users", UserController.store);

module.exports = routes;
