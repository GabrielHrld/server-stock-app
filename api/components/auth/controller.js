const bcrypt = require("bcrypt");

const TABLE = "auth";

//controlador de autenticación
module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  const login = async (username, password) => {
    const data = await store.query(TABLE, { username });
    console.log(data);
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
  };
};
