const express = require("express");
const response = require("../../../utils/response");
const controller = require("./index");
const jwt = require("../../../jwt/");

//USERS_STOCKS ROUTER
const router = express.Router();

const getUserStocks = async (req, res) => {
  try {
    const stocks = await controller.getUserStocks(req.params.id);

    response.success(req, res, stocks, 200);
  } catch (error) {
    response.error(req, res, error.message, 400);
  }
};

const insert = async (req, res) => {
  try {
    const { id: userId } = await jwt.decodeHeader(req);
    await controller.insert(req.body, userId);
    response.success(req, res, req.body, 201);
  } catch (error) {
    response.error(req, res, error.message, 400);
  }
};

const removeStock = async (req, res) => {
  try {
    const { id: userId } = await jwt.decodeHeader(req);
    await controller.deleteOneStock(req.body, userId);
    response.success(req, res, true, 200);
  } catch (error) {
    response.error(req, res, error.message, 400);
  }
};

//ROUTES
router.get("/:id", getUserStocks);
router.post("/", insert);
router.delete("/", removeStock);

module.exports = router;
