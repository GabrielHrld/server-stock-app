const express = require("express");
const response = require("../../../utils/response");
const secure = require("./secure");
const controller = require("./index");

//USERS ROUTER
const router = express.Router();

//obtener lista de usuarios
const list = async (req, res) => {
  try {
    const listaDeUsuarios = await controller.list();
    response.success(req, res, listaDeUsuarios, 200);
  } catch (error) {
    response.error(req, res, error.message, 400);
  }
};

//obtener un usuario
const getOne = async (req, res) => {
  try {
    const user = await controller.getOneUser(req.params.id);
    response.error(req, res, user, 200);
  } catch (error) {
    response.error(req, res, error.message, 401);
  }
};

//insertar un usuario
const insert = async (req, res) => {
  try {
    await controller.insert(req.body);
    const { username, name, lastname } = req.body;
    //devolvemos los datos del usuario creado
    response.success(req, res, { username, name, lastname }, 201);
  } catch (error) {
    response.error(req, res, error.message, 400);
  }
};

//remover el usuario
const remove = async (req, res) => {
  try {
    const deleteResponse = await controller.remove(req.params.id);
    response.success(req, res, deleteResponse, 200);
  } catch (error) {
    response.error(req, res, error.message, 401);
  }
};

//ROUTES
router.get("/", list);
router.get("/:id", getOne);
router.post("/", insert);
router.delete("/:id", secure("owner"), remove);

module.exports = router;
