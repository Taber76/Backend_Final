const { getAllByUserController, addMessageController } = require('../controllers/chatsController')
const { getAllProductsController } = require('../controllers/productsController')
const { gptResponse } = require('../messages/chatgpt')
const { logger, loggererr } = require('../log/logger')

let allChat = []


module.exports.websocket = async ( io ) => {
  
  const products = await getAllProductsController()

  io.on('connection', async socket => {

    socket.on('online', async ( username ) => {
      allChat = await getAllByUserController( username )
      socket.emit('mensajes', allChat)
    })
    

    socket.on('mensaje', async ( msg ) => {
      allChat.push({
        type: 'user',
        body: msg.body
      })
      await addMessageController( msg.username, 'user', msg.body )
      const assistantResponse = await gptResponse( allChat, products )
      allChat.push({
        type: 'assistant',
        body: assistantResponse
      })
      await addMessageController( msg.username, 'assistant', assistantResponse )
      socket.emit('mensajes', allChat)
    })
  })
}
