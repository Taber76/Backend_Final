const { Router } = require('express')  
const cartRouter = Router() 

const { getCartController, addProductToCartController, delProductFromCartController, delCartController, newOrderController } = require('../controllers/cartController')
const { logger, loggererr } = require('../log/logger')
const { isLoggedIn } = require('../middlewares/auth')



/* ------------------ router cart ----------------- */
//------------- get user cart
cartRouter.get(
  '/cart',
  isLoggedIn,
  async (req, res) => {
    try {
      const cart = await getCartController( req.session.passport.user )
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.status(200).send( cart )
    } catch (error) {
      logger.warn(`Error: ${error} al intentar recuperar el carrito.`)
      res.status(500).send( error )
    }
  }
)

//------------- add product to cart
cartRouter.post(
  '/cart',
  isLoggedIn,
  async (req, res) => {
    try {
      const added = await addProductToCartController( req.body.itemId, req.body.number, req.session.passport.user )
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.status(200).send( added )
    } catch (error) {
      logger.warn(`Error: ${error} al intentar agregar el producto al carrito.`)
      res.status(500).send( error )
    }
  }
)

//------------- delete product from cart
cartRouter.delete(
  '/cart/:id',
  isLoggedIn,
  async (req, res) => {
    try {
      const deleted = await delProductFromCartController( req.params.id, req.session.passport.user )
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.status(200).send( deleted )
    } catch (error) {
      logger.warn(`Error: ${error} al intentar borrar el producto del carrito.`)
      res.status(500).send( error )
    }
  }
)


//------------- delete cart
cartRouter.delete(
  '/cart',
  isLoggedIn,
  async (req, res) => {
    try {
      const deleted = await delCartController( req.session.passport.user )
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.status(200).send( deleted )
    } catch (error) {
      logger.warn(`Error: ${error} al intentar borrar el carrito.`)
      res.status(500).send( error )
    }
  }
)


//------------- new order
cartRouter.post(
  '/cart/order',
  isLoggedIn,
  async (req, res) => {
    try {
      const order = await newOrderController( req.session.passport.user )
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.status(200).send( order )
    } catch (error) {
      logger.warn(`Error: ${error} al intentar crear el pedido.`)
      res.status(500).send( error )
    }
  }
)



module.exports = cartRouter