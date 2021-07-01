const response = require("./response");

//error handler
const errors = (error, req, res, next) => {
  console.error("[error]", error);

  const message = error.message || "Unexpected Error";
  const status = error.statusCode || 500;

  response.error(req, res, message, status);
};

module.exports = errors;
