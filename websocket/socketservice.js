
const { logger, loggererr } = require('../log/logger')

let mensajes = [
  { type: 'system', body: 'Hola, como estas?' },
  { type: 'user', body: 'Bien y tu?' },
  { type: 'user', body: 'Mal' },
  { type: 'system', body: 'Por favor, no te preocupes' },
  { type: 'user', body: 'gracias' },
]

module.exports.websocket = ( io ) => {

  // cargo todos los mensajes de chat del usuario
  io.on('connection', async socket => {

    socket.on('online', ( username ) => {
      // cargo todos los mensajes de chat del usuario
      socket.emit('mensajes', mensajes)
    })
    

    socket.on('mensaje', msg => {
      // agrego un documento chat a la base de datos y al chat en memoria "user"
      // pido respuesta de chtgpt
      // agrego respuesta a la base de datos y al chat en memoria "assistant"
      // envio chat al forntend
      mensajes.push({
        type: 'user',
        body: msg
      })
      socket.emit('mensajes', mensajes)
    })
  })
}
