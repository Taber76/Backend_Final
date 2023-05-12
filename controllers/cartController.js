const { getCartDto, addProductToCartDto, delProductFromCartDto, delCartDto, newOrderDto } = require('../DTO/cartDto')
const { getAllProductsController } = require('../controllers/productsController')
const { sendEmail } = require('../messages/email')
const { adminmail } = require('../config/environment')

const getCartController = async( username ) => {
  const cart = await getCartDto( username )
  return cart
}

const addProductToCartController = async( itemId, number, username ) => {
  const response = await addProductToCartDto( itemId, number, username )
  return response
}

const delProductFromCartController = async( itemId, username ) => {
  const response = await delProductFromCartDto( itemId, username )
  return response
}

const delCartController = async( username ) => {
  const response = await delCartDto( username )
  return response
}

const newOrderController = async( username ) => {
  const cart = await getCartDto( username )
  if ( cart.products.length === 0 ) return false

  const products = await getAllProductsController()
  const orderArray = cart.products.map ( cartItem => {
    const productDetails = products.find( product => product.id === cartItem.id )
    return {
      ...cartItem,
      price: productDetails.price,
      title: productDetails.title
    }
  })
  const order = {
    username: username,
    sendaddress: cart.sendaddress,
    products: orderArray
  }
  const responseOrder = await newOrderDto( order )
  const responseDelete = await delCartDto( username )
  sendEmail({
    from: 'Administrador',
    to: adminmail,
    subject: 'Nuevo pedido',
    text: '',
    html: `
    <table>
      <tbody>
        <tr>
          <td>Username</td>
          <td>${username}</td>
        </tr>
        <tr>
          <td>Send address</td>
          <td>${cart.sendaddress}</td>
        </tr>
        <tr>
          <td>Products</td>
          <td>${JSON.stringify(orderArray)}</td>
        </tr>
      </tbody>
    </table>`
  })
  return ( responseOrder & responseDelete) ? true : false
}


module.exports = { getCartController, addProductToCartController, delProductFromCartController, delCartController, newOrderController }