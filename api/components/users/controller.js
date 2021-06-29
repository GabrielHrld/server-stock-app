const { nanoid } = require("nanoid");
const TABLE = "users";
const auth = require("../auth");

//controlador de usuarios
module.exports = (injectedStore) => {
  let store = injectedStore;

  //Si no le indicamos una DB utilizamos la falsa
  if (!store) store = require("../../../store/dummy");

  const list = async () => {
    let users = await store.list(TABLE);
    return users;
  };

  const insert = async (data) => {
    try {
      const user = {
        id: nanoid(25),
        username: data.username,
        name: data.name,
        lastname: data.lastname,
      };

      await auth.insert({
        id: user.id,
        username: user.username,
        password: data.password,
      });

      return await store.insert(TABLE, user);
    } catch (error) {
      console.log(error);
    }
  };

  const remove = async (id) => {
    return await store.remove(TABLE, id);
  };

  return {
    list,
    insert,
    remove,
  };
};
