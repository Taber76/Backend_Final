const getDao = require('../DAO/factory')

const getCartDto = async( username ) => {
  const carts = await (await getDao()).carts
  const cart = await carts.getByUsername( username )
  return cart
}

const addProductToCartDto = async( itemId, number, username ) => {
  const carts = await (await getDao()).carts
  const response = await carts.addProductToCart( itemId, number, username )
  return response
}

const delProductFromCartDto = async( itemId, username ) => {
  const carts = await (await getDao()).carts
  const response = await carts.delProductFromCart( itemId, username )
  return response
}

const delCartDto = async( username ) => {
  const carts = await (await getDao()).carts
  const response = await carts.delCart( username )
  return response
}

const newOrderDto = async( order ) => {
  const orders = await (await getDao()).orders
  const response = await orders.newOrder( order )
  return response
}



module.exports = { getCartDto, addProductToCartDto, delProductFromCartDto, delCartDto, newOrderDto }

