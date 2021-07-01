const express = require("express");
const response = require("../../../utils/response");
const controller = require("./index");

//AUTH ROUTER
const router = express.Router();

//ROUTES
router.post("/login", async (req, res) => {
  try {
    //recibe el username y contraseña, retorna un objeto con datos del usuario y token
    const token = await controller.login(req.body.username, req.body.password);

    response.success(req, res, token, 200);
  } catch (error) {
    response.error(req, res, "Información inválida", 400);
  }
});

module.exports = router;
