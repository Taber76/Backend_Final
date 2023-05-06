const getDao = require('../DAO/factory')


const getAllChatsDto = async() => {
  const chats = await ( await getDao()).chats
  const allChats = await chats.getAll()
  return allChats
}

const addChatMsgDto = async( message ) => {
  const chats = await ( await getDao()).chats
  await chats.add( message )
  return 
}



module.exports = { getAllChatsDto, addChatMsgDto }