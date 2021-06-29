const express = require("express");
const response = require("../../../utils/response");
const controller = require("./index");

//ROUTER
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
    const user = await controller.insert(req.body);
    response.success(req, res, user, 201);
  } catch (error) {
    response.error(req, res, error.message, 400);
  }
};

const remove = async (req, res) => {
  try {
    const response = await controller.remove(req.params.id);
    response.success(req, res, response, 200);
  } catch (error) {
    response.error(req, res, error.message, 401);
  }
};

//ROUTES
router.get("/", list);
router.post("/", insert);
router.delete("/:id", remove);

module.exports = router;
