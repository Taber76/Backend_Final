/* Consigna: 
----------------------------------------------------------------------------------

-----------------------------------------------------------------------------------------
*/

const { config, staticFiles, mongocredentialsession } = require('../config/environment')
const { logger, loggererr } = require('../log/logger')
const { websocket } = require('../websocket/socketservice')

const express = require('express')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const http = require('http')
const socketIo = require('socket.io')
const mongoStore = require('connect-mongo')
const expressSession = require('express-session')

const productRouter = require('../routes/productRouter')
const cartRouter = require('../routes/cartRouter')
const sessionRouter = require('../routes/sessionRouter')
const infoRouter = require('../routes/infoRouter')

const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}


// --------------------- SERVER
const createServer = () => {

  const app = express()
  const server = http.createServer(app)
  const io = socketIo(server)
   
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(staticFiles))
  app.use(expressSession({
    store: mongoStore.create({
      mongoUrl: mongocredentialsession,
      mongoOptions: advancedOptions
    }),
    secret: 'secret-pin',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000
    }
  }))
     
  //---------------------- SOCKET
  websocket( io )

  //---------------------- ROUTES
  //--- SESSION ROUTER 
  app.use('/session', sessionRouter)

  //--- API REST ROUTER 
  app.use('/api', productRouter)

  //--- CART ROUTER
  app.use('/api', cartRouter)

  //--- INFO ROUTER
  app.use('/info', infoRouter)

  //--- Rutas no implementadas
  app.get('*', (req, res) => {
    logger.warn(`Ruta: ${req.url}, metodo: ${req.method} no implemantada`)
    res.send(`Ruta: ${req.url}, metodo: ${req.method} no implemantada`)
  })

  return { server, io }
}



//---------------------------- CLUSTER / FORK  -------------------------------

const startCluster = () => {
  if (cluster.isPrimary) {
    logger.info('Server in CLUSTER mode')
    logger.info('----------------------')
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork()
    }
  } else {
    logger.info(`Worker ${cluster.worker.id} started`)
    PORT = config.same === 1 ? PORT + cluster.worker.id - 1 : PORT
    createServer().server.listen(PORT, () => {
      logger.info(`Worker ${cluster.worker.id} listening on port ${PORT}`)
    })
  }
}

const startFork = () => {
  logger.info('Server in FORK mode')
  logger.info('-------------------')
  createServer().server.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`)
  })
}


// MAIN

let PORT = ( config.port ) ? config.port : 8080 // puerto por defecto 8080

if (config.mode === 'CLUSTER') {
  startCluster()
} else {
  startFork()
}


