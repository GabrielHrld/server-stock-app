const jwt = require("../../../jwt");

//funcion que gestiona los permisos de la app
module.exports = function checkAuth(action) {
  //recibe la accion que querramos hacer
  //y ejecuta el método correspondiente
  const middleware = (req, res, next) => {
    switch (action) {
      case "owner":
        const owner = req.body.id;
        jwt.check.own(req, owner);
        next();
        break;

      default:
        next();
    }
  };

  return middleware;
};
