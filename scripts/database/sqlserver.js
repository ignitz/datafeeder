require("dotenv").config();

module.exports = {
  development: {
    username: process.env.SQLSERVER_USER,
    password: process.env.SQLSERVER_PASSWORD,
    database: "database_development",
    host: process.env.SQLSERVER_HOST,
    dialect: "mssql",
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  test: {
    username: process.env.SQLSERVER_USER,
    password: process.env.SQLSERVER_PASSWORD,
    database: "database_test",
    host: process.env.SQLSERVER_HOST,
    dialect: "mssql",
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  production: {
    username: process.env.SQLSERVER_USER,
    password: process.env.SQLSERVER_PASSWORD,
    database: "database_production",
    host: process.env.SQLSERVER_HOST,
    dialect: "mssql",
    define: {
      timestamps: true,
      underscored: true,
    },
  },
};
