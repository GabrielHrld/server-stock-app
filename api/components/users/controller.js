const { nanoid } = require("nanoid");
const TABLE = "users";
const auth = require("../auth");

//controlador de usuarios
module.exports = (injectedStore) => {
  let store = injectedStore;

  //Si no le indicamos una DB utilizamos la falsa
  if (!store) store = require("../../../store/dummy");

  //Traer la lista de usuarios
  const list = async () => {
    try {
      let users = await store.list(TABLE);
      return users;
    } catch (error) {
      throw new Error(error);
    }
  };

  //Insertar un usuario nuevo
  const insert = async (data) => {
    try {
      //Objeto modelo Usuarios DB
      const user = {
        id: nanoid(25),
        username: data.username,
        name: data.name,
        lastname: data.lastname,
      };

      //Llamamos a Auth service para guardar la contraseña
      await auth.insert({
        id: user.id,
        username: user.username,
        password: data.password,
      });

      return await store.insert(TABLE, user);
    } catch (error) {
      throw new Error(error);
    }
  };

  //Eliminar un usuario
  const remove = async (id) => {
    try {
      await auth.remove(id);
      await store.remove(TABLE, id);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    list,
    insert,
    remove,
  };
};
