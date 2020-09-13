const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const sqlserver = new Sequelize(dbConfig.sqlserver);
const postgres = new Sequelize(dbConfig.postgres);

module.exports = { sqlserver, postgres };
