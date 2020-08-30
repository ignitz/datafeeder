require("dotenv").config();

// module.exports = {
//   database1: {
//     dialect: "postgres",
//     host: "localhost",
//     username: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     database: "postgres",
//     define: {
//       timestamps: true,
//       underscored: true,
//     },
//   },
//   database2: {
//     dialect: "postgres",
//     host: "localhost",
//     username: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     database: "opa",
//     define: {
//       timestamps: true,
//       underscored: true,
//     },
//   },
// };

module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: "aiai",
  port: 5433,
  define: {
    timestamps: true,
    underscored: true,
  },
};
