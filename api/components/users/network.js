const express = require("express");
const response = require("../../../utils/response");
const controller = require("./index");

//USERS ROUTER
const router = express.Router();

const list = async (req, res) => {
  try {
    const listaDeUsuarios = await controller.list();
    response.success(req, res, listaDeUsuarios, 200);
  } catch (error) {
    response.error(req, res, error.message, 400);
  }
};

const insert = async (req, res) => {
  try {
    await controller.insert(req.body);
    const { username, name, lastname } = req.body;
    response.success(req, res, { username, name, lastname }, 201);
  } catch (error) {
    response.error(req, res, error.message, 400);
  }
};

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
router.post("/", insert);
router.delete("/:id", remove);

module.exports = router;
