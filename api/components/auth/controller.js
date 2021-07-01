const bcrypt = require("bcrypt");
const jwt = require("../../../jwt");
const TABLE = "auth";

//controlador de autenticación
module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  const login = async (username, pass) => {
    const data = await store.query(TABLE, { username });
    const areEquals = await bcrypt.compare(pass, data[0].password);
    const { password, ...rest } = data[0];
    if (areEquals == true) {
      const user = await store.query("users", { username });
      console.log(user);
      const token = jwt.sign({ ...rest });
      return { ...user[0], token };
    }
    if (areEquals !== true) throw new Error("Información inválida");
  };

  const insert = async (data) => {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const authData = {
        id: data.id,
        username: data.username,
        password: hashedPassword,
      };

      return await store.insert(TABLE, authData);
    } catch (error) {
      throw new Error(error);
    }
  };

  const remove = async (id) => {
    try {
      return await store.remove(TABLE, id);
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    insert,
    remove,
    login,
  };
};
