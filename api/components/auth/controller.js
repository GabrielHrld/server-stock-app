const bcrypt = require("bcrypt");

const TABLE = "auth";

//controlador de autenticación
module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  const insert = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const authData = {
      id: data.id,
      username: data.username,
      password: hashedPassword,
    };

    return await store.insert(TABLE, authData);
  };
  return {
    insert,
  };
};
