const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const User = require("models/User");

const connection = new Sequelize(dbConfig.database1);

User.init(connection);

module.exports = connection;
