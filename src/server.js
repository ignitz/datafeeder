require("dotenv").config();

const app = require("./app");

require("database/init.js");

const port = process.env.PORT || 3333;
app.listen(port, () => console.log("Listening in port", port));
