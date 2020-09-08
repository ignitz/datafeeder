const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const sqlserver = new Sequelize(dbConfig.sqlserver);

module.exports = { sqlserver };
