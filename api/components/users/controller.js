const { nanoid } = require("nanoid");
const TABLE = "users";

module.exports = (injectedStore) => {
  let store = injectedStore;

  //Si no le indicamos una DB utilizamos la falsa
  if (!store) store = require("../../../store/dummy");

  const list = async () => {
    let users = await store.list(TABLE);
    return users;
  };

  const create = async (data) => {
    const user = {
      id: nanoid(),
      username: data.username,
      name: data.name,
      lastname: data.lastname,
    };

    return store.insert(TABLE, data);
  };

  const remove = async (id) => {
    return await store.remove(TABLE, id);
  };
};
