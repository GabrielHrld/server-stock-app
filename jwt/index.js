const jwt = require("jsonwebtoken");
const error = require("../utils/errors");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

//funcion para logearse
const sign = (data) => {
  return jwt.sign(data, secret);
};

//funcion que recibe el token y lo decodifica
const verify = (token) => {
  return jwt.verify(token, secret);
};

//Objeto que guarda las funciones de check in
const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);

    if (decoded.id !== owner) {
      throw error("No podes hacer esto", 401);
    }
  },
};

//funcion para obtener el token limpio
const getCleanToken = (auth) => {
  if (!auth) {
    throw error("No viene el token", 401);
  }
  if (auth.indexOf("Bearer ") == -1) {
    throw error("Formato inválido", 401);
  }
  let token = auth.replace("Bearer ", "");

  return token;
};

//funcion para decodificar el token
const decodeHeader = (req) => {
  const authorization = req.headers.authorization || "";
  const token = getCleanToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
};

module.exports = {
  sign,
  check,
};
