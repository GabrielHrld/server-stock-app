const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
const chalk = require("chalk");
const user = require("./components/users/network");
const stocks = require("./components/users_stocks/network");
const auth = require("./components/auth/network");
const errors = require("../utils/errors");

const app = express();
const PORT = process.env.PORT || 3000;

//MIDDLEWARES
app.use(express.json());
app.use(helmet());

//ROUTER
app.use("/api/users/stocks", stocks);
app.use("/api/users", user);
app.use("/api/auth", auth);
app.use(errors);

app.listen(PORT, () => {
  console.log(
    chalk.black.bgGreenBright(`Server listening in http://localhost:${PORT}`)
  );
});
