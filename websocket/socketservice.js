const { newProductController, getAllProductsController } = require('../controllers/productsController')
const { getAllChatsController, addChatMsgController } = require('../controllers/chatsController')

module.exports.websocket = ( io ) => {
  io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!')
  
    //-- Tabla inicial al cliente
    socket.emit('productos', await getAllProductsController())
  
    //-- Nuevo producto desde cliente
    socket.on('update', async producto => {
      await newProductController( producto )
      io.sockets.emit('productos', await getAllProductsController())
    })
  
    //-- Chat inicial al cliente
    socket.emit('mensajes', await getAllChatsController())
  
    //-- Nuevo mensaje desde el cliente
    socket.on('newMsj', async mensaje => {
      mensaje.date = new Date().toLocaleString()
      await addChatMsgController( mensaje ) 
      io.sockets.emit('mensajes', await getAllChatsController())
    })
  })
}
