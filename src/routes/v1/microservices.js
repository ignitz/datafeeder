const express = require("express");
const router = express.Router();

const controller = require("../../controllers/microservices");

// Get list of running microservices
router.get("/", controller.getTasks);

//post
router.post("/", controller.createTask);

//delete
router.delete("/:id", controller.deleteTask);

module.exports = router;
