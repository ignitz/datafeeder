require("dotenv").config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "database_development",
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "database_test",
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "database_production",
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    define: {
      timestamps: true,
      underscored: true,
    },
  },
};
