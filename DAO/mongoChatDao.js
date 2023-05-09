const connectToDb = require('../config/connectToMongo')
const { chatModel } = require('../schemas/mongoDbModel')
const { normalizedData } = require('../normalize/normal')

const { logger, loggererr } = require('../log/logger')


class MongoChatDao { 

  async getAll() {
    try{
      await connectToDb()
      const chatInDb = await chatModel.findOne ( { chatid: 'chat1'} )
      return normalizedData(chatInDb.chat)
    
    } catch(err) {
      loggererr.error(`Error: ${err}`)
    }
  }
 

  async add( message ) {
    try{
      await connectToDb()
      const chatInDb = await chatModel.findOne ( { chatid: 'chat1' } )
      const newMsj = chatInDb.chat
      newMsj.push({
        user: { 
          email: message.author.id,
          name: message.author.name,
          surmame: message.author.surname,
          age: message.author.age,
          nickname: message.author.nickname,
          avatar: message.author.avatar,
        },
        message: {
          timestamp: message.date,
          text: message.text
          } 
      })
      await chatModel.updateOne({ chatid: 'chat1' },
        { $set: { chat: newMsj }}
        )
      return
    } catch(err) {
      loggererr.error(`Error: ${err}`)
    }
  }

}


module.exports = MongoChatDao