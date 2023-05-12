const { getAllByUserDto, addMessageDto } = require('../DTO/chatDto')


const getAllByUserController = async( username ) => {
  const allChats = await getAllByUserDto( username )
  return allChats
}


const addMessageController = async ( username, type, body ) => {
  addMessageDto( username, type, body )
  return 
}

module.exports = { getAllByUserController, addMessageController }