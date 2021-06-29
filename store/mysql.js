const mysql = require("mysql2");
const chalk = require("chalk");
const DBConfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

let connection;

//CONEXIÓN A LA BASE DE DATOS
const handleConnection = () => {
  connection = mysql.createConnection(DBConfig);

  connection.connect((error) => {
    if (error) {
      console.log(chalk.black.bgRedBright("[DB ERROR]", error));
      setTimeout(handleConnection, 2000);
    } else {
      console.log(chalk.black.bgGreenBright("[DB CONNECTED SUCCESSFULLY]"));
    }
  });

  connection.on("error", (error) => {
    console.error("[db error]", error);
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      handleConnection();
    } else {
      throw error;
    }
  });
};

handleConnection();

//función para listar todo
const list = (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

//función para insertar
const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, [data], (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

//función para eliminar
const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM ${table} WHERE id = "${id}"`,
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
};

module.exports = {
  list,
  insert,
  remove,
};
