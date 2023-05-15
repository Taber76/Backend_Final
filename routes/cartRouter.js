const { Router } = require('express')  
const cartRouter = Router() 

const { getCartController, addProductToCartController, delProductFromCartController, delCartController, newOrderController } = require('../controllers/cartController')
const { logger, loggererr } = require('../log/logger')
const passport = require('../middlewares/auth')
const { isInBlackListJWT } = require('../middlewares/blackList')

/* ------------------ router cart ----------------- */
//------------- get user cart
cartRouter.get(
  '/carrito',
  isInBlackListJWT,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const cart = await getCartController( req.session.passport.user )
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.status(200).send( cart )
    } catch (error) {
      logger.warn(`Error: ${error} al intentar recuperar el carrito.`)
      res.redirect(`info/error/Error al intentar recuperar el carrito: ${error}`)
    }
  }
)

//------------- add product to cart
cartRouter.post(
  '/carrito',
  isInBlackListJWT,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const added = await addProductToCartController( req.query.itemId,  parseInt(req.query.number), req.session.passport.user )
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.status(200).send( added )
    } catch (error) {
      logger.warn(`Error: ${error} al intentar agregar el producto al carrito.`)
      res.redirect(`info/error/Error al intentar agregar el producto al carrito: ${error}`)
    }
  }
)

//------------- delete product from cart
cartRouter.delete(
  '/carrito/:id',
  isInBlackListJWT,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const deleted = await delProductFromCartController( req.params.id, req.session.passport.user )
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.status(200).send( deleted )
    } catch (error) {
      logger.warn(`Error: ${error} al intentar borrar el producto del carrito.`)
      res.redirect(`info/error/Error al intentar borrar el producto del carrito: ${error}`)
    }
  }
)


//------------- delete cart
cartRouter.delete(
  '/carrito',
  isInBlackListJWT,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const deleted = await delCartController( req.session.passport.user )
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.status(200).send( deleted )
    } catch (error) {
      logger.warn(`Error: ${error} al intentar borrar el carrito.`)
      res.redirect(`info/error/Error al intentar borrar el carrito: ${error}`)
    }
  }
)


//------------- new order
cartRouter.post(
  '/carrito/order',
  isInBlackListJWT,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const order = await newOrderController( req.session.passport.user )
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.status(200).send( order )
    } catch (error) {
      logger.warn(`Error: ${error} al intentar crear el pedido.`)
      res.redirect(`info/error/Error al intentar crear el pedido: ${error}`)
    }
  }
)



module.exports = cartRouter