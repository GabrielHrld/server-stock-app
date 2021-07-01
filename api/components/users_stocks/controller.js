const { nanoid } = require("nanoid");
const TABLE = "users_stocks";

module.exports = (injectedStore) => {
  let store = injectedStore;

  //Si no le indicamos una DB utilizamos la falsa
  if (!store) store = require("../../../store/dummy");

  const getOneStock = async (symbol, currency, userId) => {
    try {
      return await store.getOne(TABLE, symbol, currency, userId);
    } catch (error) {
      throw new Error(error);
    }
  };

  //retorna las acciones guardadas por el usuario
  const getUserStocks = async (userId) => {
    try {
      return await store.query(TABLE, { user: userId });
    } catch (error) {
      throw new Error(error);
    }
  };

  //inserta una acción a los favoritos de usuario
  const insert = async (data, userId) => {
    //corroboramos que no exista antes de añadirla
    const stock = await getOneStock(data.symbol, data.currency, userId);
    if (stock[0] !== undefined)
      throw new Error("La acción ya se encuentra añadida");

    try {
      //Objeto modelo users_stocks
      const stock = {
        id: nanoid(25),
        symbol: data.symbol,
        name: data.name,
        currency: data.currency,
        user: userId,
      };

      return await store.insert(TABLE, stock);
    } catch (error) {
      throw new Error(error);
    }
  };

  const deleteOneStock = async (data, userId) => {
    try {
      //buscamos la acción y verificamos que exista
      const stock = await getOneStock(data.symbol, data.currency, userId);
      if (stock[0] == undefined) throw new Error("No se encontró la acción");
      const idStock = stock[0].id;
      store.remove(TABLE, idStock);
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    insert,
    deleteOneStock,
    getUserStocks,
  };
};
