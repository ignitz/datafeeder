require("dotenv").config();

// const { Client } = require("pg");
// const gerarCPF = require("gerar-cpf");

// const client = new Client({
//   user: process.env.POSTGRES_USER,
//   host: "localhost",
//   database: "postgres",
//   password: process.env.POSTGRES_PASSWORD,
//   port: 5432,
// });

// (async () => {
//   await client.connect();

//   const createTable = async (tableName) => {
//     await client.query(`DROP TABLE IF EXISTS ${tableName}`);
//     const res = await client.query(`CREATE TABLE ${tableName} (
//         foo text,
//         bar int
//     )`);
//     console.log(res);
//   };

//   await createTable("person");

//   //   const res = await client.query("SELECT $1::text as message", [
//   //     "Hello world!",
//   //   ]);
//   //   console.log(res.rows[0].message); // Hello world!
//   await client.end();
// })();
