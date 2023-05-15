const { Router } = require('express')  
const productRouter = Router() 

const { 
  newProductController,
  getAllProductsController,
  getProductByIdController,
  getProductsByCategoryController,
  delProductByIdController,
  modifyProductByIdController
 } = require('../controllers/productsController')
 
const { logger, loggererr } = require('../log/logger')
const passport = require('../middlewares/auth')
const { isInBlackListJWT } = require('../middlewares/blackList')


/* ------------------ router productos ----------------- */
//------------- get productos
productRouter.get(
  '/productos',
  async (req, res) => {
    try {
      const products = await getAllProductsController()
      res.status(200).json( products )
    } catch (error) {
      logger.warn(`Error en la ruta ${req.url}, metodo ${req.method}: ${error}`)
      res.redirect(`info/error/Error del servidor en la ruta ${req.url}, metodo ${req.method}: ${error}`)
    }
  }
)


//------------ get producto segun id
productRouter.get(
  '/productos/:id',
  async (req, res) => {
    try {
      const product = await getProductByIdController(req.params.id)
      if (product) {
        res.json( product )
      } else {
        logger.warn(`Producto id: ${req.params.id} no encontrado`)
        res.status(404).json({ error: 'producto no encontrado' })
      }
    } catch (error) {
      loggererr.error(`Error en la ruta ${req.url}, metodo ${req.method}: ${error}`)
      res.redirect(`info/error/Error del servidor en la ruta ${req.url}, metodo ${req.method}: ${error}`)
    }
  }
)


//------------ get producto segun id
productRouter.get(
  '/productos/categoria/:category',
  async (req, res) => {
    try {
      const products = await getProductsByCategoryController(req.params.category)
      if (products) {
        res.json( products )
      } else {
        logger.warn(`Productos con categoria ${req.params.categoria} no encontrados`)
        res.status(404).json({ error: 'productos no encontrados' })
      }
    } catch (error) {
      loggererr.error(`Error en la ruta ${req.url}, metodo ${req.method}: ${error}`)
      res.redirect(`info/error/Error del servidor en la ruta ${req.url}, metodo ${req.method}: ${error}`)
    }
  }
)


//--------------------- post producto
productRouter.post(
  '/productos/nuevo',
  isInBlackListJWT,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const productToAdd = req.body
      const loaded = await newProductController(productToAdd)
      if (loaded) {
        logger.info(`Producto agregado correctamente`)
        res.status(200).json({ msg: 'producto guardado' })
      } else {
        logger.info(`No se pudo agregar producto, datos incorrectos`)
        res.status(400).json({ msg: 'producto no guardado' })
      }
    } catch (error) {
      loggererr.error(`Error en la ruta ${req.url}, metodo ${req.method}: ${error}`)
      res.redirect(`info/error/Error del servidor en la ruta ${req.url}, metodo ${req.method}: ${error}`)
    }
  }
)


//---------------------- put producto
productRouter.put(
  '/productos/:id',
  isInBlackListJWT,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const response = await modifyProductByIdController(req.params.id, req.body)
      if (response) {
        logger.info(`Producto modificado correctamente`)
        res.status(200).json({ message: 'producto modificado' })
      } else {
        logger.warn(`Producto id: ${req.params.id} no encontrado`)
        res.status(404).json({ error: 'producto no encontrado' })
      }
    } catch (error) {
      loggererr.error(`Error en la ruta ${req.url}, metodo ${req.method}: ${error}`)
      res.redirect(`info/error/Error del servidor en la ruta ${req.url}, metodo ${req.method}: ${error}`)
    }
  }
)


//------------------------- delete producto
productRouter.delete(
  '/productos/:id',
  isInBlackListJWT,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const id = req.params.id
      const response = await delProductByIdController(id)
      if (response) {
        logger.info(`Producto borrado correctamente`)
        res.status(200).json({ message: 'producto borrado' })
      } else {
        logger.warn(`Producto id: ${id} no encontrado`)
        res.status(404).json({ error: 'producto no encontrado' })
      }
    } catch (error) {
      loggererr.error(`Error en la ruta ${req.url}, metodo ${req.method}: ${error}`)
      res.redirect(`/error/Error ${error} al borrar el producto`)
    }
  }
) 


module.exports = productRouter