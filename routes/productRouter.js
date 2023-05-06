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
    const products = await getAllProductsController()
    logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
    res.json( products )
  }
)


//------------ get producto segun id
productRouter.get(
  '/productos/:id',
  async (req, res) => {
    const product = await getProductByIdController( req.params.id )
    if ( product ) {
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.json( product )
    } else {
      loggererr.error(`Producto id: ${req.params.id} no encontrado`) 
      res.status(404).send({ error: 'producto no encontrado'})
    }
  }
)


//--------------------- post producto
productRouter.post(
  '/productos/nuevo',
  isLoggedIn,
  async (req, res) => {
    const productToAdd = req.body
    const loaded = await newProductController ( productToAdd )
    if ( loaded ) {
      logger.info(`Producto agregado correctamente`)
      res.status(200).send({ msg: 'producto guardado'})
    } else {
      logger.info(`No se pudo agregar producto, datos incorrectos`)
      res.status(400).send({ msg: 'producto no guardado'})
    }
    //res.redirect('/')
  }
)


//---------------------- put producto
productRouter.put(
  '/productos/:id',
  isLoggedIn,
  async (req, res) => {
    const response = await modifyProductByIdController( req.params.id, req.body )
    if( response ) {
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.send({ message: 'producto modificado'})
    } else {
      loggererr.error(`Producto id: ${req.params.id} no encontrado`) 
      res.status(404).send({ error: 'producto no encontrado'})
    }
  }
)


//------------------------- delete producto
productRouter.delete(
  '/productos/:id',
  isLoggedIn,
  async (req, res) => {
    const id = req.params.id
    const response = await delProductByIdController(id)
    if ( response ) {
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.send({ message: 'producto borrado'})
    } else {
      loggererr.error(`Producto id: ${id} no encontrado`) 
      res.status(404).send({ error: 'producto no encontrado'})
    }
  }
) 


//---------------- Test
productRouter.post(
  '/productos-test-add/:number',
  async (req, res) => {
    addProducts(req.params.number)
    res.send({ message: 'productos agregados'})
  }
)


module.exports = productRouter