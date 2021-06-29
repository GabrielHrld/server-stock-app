const controller = require("./controller");
const store = require("../../../network/mysql");

module.exports = controller(store);
