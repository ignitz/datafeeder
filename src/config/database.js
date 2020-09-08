require("dotenv").config();

module.exports = {
  postgres: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "tracker",
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  sqlserver: {
    username: process.env.SQLSERVER_USER,
    password: process.env.SQLSERVER_PASSWORD,
    database: "register",
    host: process.env.SQLSERVER_HOST,
    dialect: "mssql",
    define: {
      timestamps: true,
      underscored: true,
    },
  },
};
