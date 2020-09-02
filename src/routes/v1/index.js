const express = require("express");
const router = express.Router();

const checkToken = require("middleware/checkToken");

const microservices = require("./microservices");

router.use("/example", checkToken, (req, res) => {
  return res.json({ message: "OPA" });
});

router.use("/microservices", checkToken, microservices);

module.exports = router;
