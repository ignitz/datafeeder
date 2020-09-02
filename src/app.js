require("dotenv").config();
const express = require("express");

class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Handle JSON content on body request
    this.express.use(express.json());

    // CORS bypass. Without this the borwser can blok requests from backend
    this.express.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      );
      if (req.method === "OPTIONS") {
        res.header(
          "Access-Control-Allow-Methods",
          "PUT, POST, PATCH, DELETE, GET",
        );
        return res.status(200).json({});
      }
      next();
    });
  }

  routes() {
    this.express.use("/api/v1", require("./routes/v1"));

    // Not found route. If non of above routes are accessed then, get here
    this.express.use((req, res, next) => {
      const error = new Error("Not found");
      error.status = 404;
      next(error);
    });

    // Handle Error, only send to client a error message
    this.express.use((error, req, res, next) => {
      console.log(error);
      res.status(error.status || 500);
      res.json({
        error: {
          message: error.message,
        },
      });
    });
  }
}

module.exports = new AppController().express;
