const { Router } = require('express')  
const productRouter = Router() 

const { newProductController, getAllProductsController, getProductByIdController, delProductByIdController, modifyProductByIdController } = require('../controllers/productsController')
const { logger, loggererr } = require('../log/logger')
const { isLoggedIn } = require('../middlewares/auth')

const { addProducts } = require('../test/auxfunction') 



/* ------------------ router productos ----------------- */
//------------- get productos
productRouter.get(
  '/productos',
  async (req, res) => {
    try {
      const products = await getAllProductsController()
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.status(200).json( products )
    } catch (error) {
      logger.warn(`Error en la ruta ${req.url}, metodo ${req.method}: ${error}`)
      res.status(500).json({ error: 'Error interno en el servidor' })
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
        logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
        res.json( product )
      } else {
        logger.warn(`Producto id: ${req.params.id} no encontrado`)
        res.status(404).json({ error: 'producto no encontrado' })
      }
    } catch (error) {
      loggererr.error(`Error en la ruta ${req.url}, metodo ${req.method}: ${error}`)
      res.status(500).json({ error: 'Error interno en el servidor' })
    }
  }
)


//--------------------- post producto
productRouter.post(
  '/productos/nuevo',
  isLoggedIn,
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
      res.status(500).json({ error: 'Error interno en el servidor' })
    }
  }
)


//---------------------- put producto
productRouter.put(
  '/productos/:id',
  isLoggedIn,
  async (req, res) => {
    try {
      const response = await modifyProductByIdController(req.params.id, req.body)
      if (response) {
        logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
        res.status(200).json({ message: 'producto modificado' })
      } else {
        logger.warn(`Producto id: ${req.params.id} no encontrado`)
        res.status(404).json({ error: 'producto no encontrado' })
      }
    } catch (error) {
      loggererr.error(`Error en la ruta ${req.url}, metodo ${req.method}: ${error}`)
      res.status(500).json({ error: 'Error interno en el servidor' })
    }
  }
)


//------------------------- delete producto
productRouter.delete(
  '/productos/:id',
  isLoggedIn,
  async (req, res) => {
    try {
      const id = req.params.id
      const response = await delProductByIdController(id)
      if (response) {
        logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
        res.status(200).json({ message: 'producto borrado' })
      } else {
        logger.warn(`Producto id: ${id} no encontrado`)
        res.status(404).json({ error: 'producto no encontrado' })
      }
    } catch (error) {
      loggererr.error(`Error en la ruta ${req.url}, metodo ${req.method}: ${error}`)
      res.status(500).json({ error: 'Error interno en el servidor' })
    }
  }
) 


//---------------- Test
productRouter.post(
  '/productos-test-add/:number',
  async (req, res) => {
    addProducts(req.params.number)
    res.json({ message: 'productos agregados'})
  }
)


module.exports = productRouter