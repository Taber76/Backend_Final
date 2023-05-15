const connectToDb = require('../config/connectToMongo')
const { chatModel } = require('../models/mongoDbModel')


const { logger, loggererr } = require('../log/logger')


class MongoChatDao { 

  async getAllByUser( username ) {
    try{
      await connectToDb()
      const chatInDb = await chatModel.find({ username: username })
      return chatInDb
    } catch(err) {
      logger.warn(`Error: ${err} al intentar recuperar el chat de la base de datos`)
    }
  }
 

  async addMessage( username, type, body ) { // type: 'user' | 'assistant'
    try{
      await connectToDb()
      const newMsj = new chatModel({
        username: username,
        type: type,
        body: body
      })
      await newMsj.save()
      return true
    } catch(err) {
      logger.warn(`Error: ${err} al intentar guardar el mensaje en la base de datos`)
      return false
    }
  }

}


module.exports = MongoChatDao