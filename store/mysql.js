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

const getOne = (table, where, where2, userId) => {
  let sentence = "";
  let query = where;
  if (table == "users_stocks") {
    query = [where, where2, userId];
    sentence = `SELECT * FROM ${table} WHERE symbol=? AND currency=? AND user=?`;
  } else {
    sentence = `SELECT * FROM ${table} WHERE id=?`;
  }

  //retornamos una promesa para manejar los errores asíncronos
  return new Promise((resolve, reject) => {
    connection.query(sentence, query, (error, data) => {
      if (error) {
        return reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

//función para insertar
const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ${table} SET ?`,
      [data],
      (error, response) => {
        if (error) return reject(error);
        resolve(response);
      }
    );
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

// función de consultas
const query = (table, q, join) => {
  let joinQuery = "";
  //por si necesitamos un join
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }

  // retorna un array con los resultados
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
      q,
      (error, res) => {
        if (error) return reject(error);
        resolve(res || null);
      }
    );
  });
};
module.exports = {
  list,
  getOne,
  insert,
  remove,
  query,
};
