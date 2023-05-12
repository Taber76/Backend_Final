const getDao = require('../DAO/factory')


const getAllByUserDto = async( username ) => {
  const chats = await ( await getDao()).chats
  const allChats = await chats.getAllByUser( username )
  return allChats
}

const addMessageDto = async( username, type, body ) => {
  const chats = await ( await getDao()).chats
  await chats.addMessage( username, type, body )
  return 
}



module.exports = { getAllByUserDto, addMessageDto }