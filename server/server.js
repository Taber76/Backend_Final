/* Consigna: 
----------------------------------------------------------------------------------

-----------------------------------------------------------------------------------------
*/

const { config, staticFiles, mongocredentialsession } = require('../config/environment')
const { logger, loggererr } = require('../log/logger')
const { websocket } = require('../websocket/socketservice')

const express = require('express')
//--- Para servidor FORK & CLUSTER
const cluster = require('cluster')
const numCPUs = require('os').cpus().length



//-------------------------- PROCESO BASE INICIO -------------------------------  
//------------------------------------------------------------------------------
const baseProcces = () => {

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Proceso ${worker.process.pid} caido!`)
    cluster.fork()
  })

  //--- Servicios Express
  const expressSession = require('express-session')
  const { Server: HttpServer } = require('http')
  const { Server: Socket } = require('socket.io')
  const app = express()
  const httpServer = new HttpServer(app)
  const io = new Socket(httpServer)

  //--- Routes
  const productRouter = require('../routes/productRouter')
  const sessionRouter = require('../routes/sessionRouter')
  const infoRouter = require('../routes/infoRouter')

  //--- Databases
  const MongoStore = require('connect-mongo')
  const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

 
  //--- Middlewares
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(staticFiles))
  app.use(expressSession({
    store: MongoStore.create({
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
 // websocket( io )

  //---------------------- ROUTES
  //--- SESSION ROUTER 
  app.use('/session', sessionRouter)

  //--- API REST ROUTER 
  app.use('/api', productRouter)

  //--- INFO ROUTER
  app.use('/info', infoRouter)

  //--- Rutas no implementadas
  app.get('*', (req, res) => {
    logger.warn(`Ruta: ${req.url}, metodo: ${req.method} no implemantada`)
    res.send(`Ruta: ${req.url}, metodo: ${req.method} no implemantada`)
  })


  //--- SERVER ON
  let PORT = ( config.port) ? config.port : 8080 // puerto por defecto 8080

  if ( config.mode === 'CLUSTER') { 
    // para CLUSTER si la clave same es 1 crea un puerto para cada worker
    PORT = config.same === 1 ? PORT + cluster.worker.id - 1 : PORT
  } 

  const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
  })
  server.on('error', error => loggererr.error(`Error en servidor ${error}`))
  
}
//------------------------------ PROCESO BASE FIN -----------------------------------  
//-----------------------------------------------------------------------------------



//---------------------------- LOGICA CLUSTER / FORK  -------------------------------

if ( config.mode != 'CLUSTER' ) { 

  //-- Servidor FORK
  console.log('Server en modo FORK')
  console.log('-------------------')
  baseProcces()
  } else { 

    //-- Servidor CLUSTER   
    if (cluster.isPrimary) {
      console.log('Server en modo CLUSTER')
      console.log('----------------------')
      for (let i = 0; i < numCPUs; i++) { // creo tantos procesos como cpus tengo
        cluster.fork()
      }
    } else {
      baseProcces()
    }
  }



