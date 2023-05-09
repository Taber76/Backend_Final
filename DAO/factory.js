const { persistence } = require('../config/environment')
const MongoProductDao = require('./mongoProductDao')
const MongoCartDao = require('./mongoCartDao')
const MongoOrderDao = require('./mongoOrderDao')
const MongoUserDao = require('./mongoUserDao')
const MongoChatDao = require('./mongoChatDao')
const MemoryProductDao = require('./memoryProductDao')
const MemoryUserDao = require('./memoryUserDao')
const MemoryChatDao = require('./memoryChatDao')

const { logger, loggererr } = require('../log/logger')


let productsDao, cartsDao, usersDao, chatsDao

const initDaos = async () => {
  if (persistence === 'MEMORY') {
    productsDao = new MemoryProductDao([])
    cartsDao = new MemoryCartDao({ cart: [] })
    ordersDao = new MemoryOrderDao([])
    usersDao = new MemoryUserDao([])
    chatsDao = new MemoryChatDao({ chat: [] })
    logger.info('Persistencia en memoria')
  } else {
    productsDao = await new MongoProductDao()
    cartsDao = await new MongoCartDao()
    ordersDao = await new MongoOrderDao()
    usersDao = await new MongoUserDao()
    chatsDao = await new MongoChatDao()
    logger.info('Persistencia en MongoDb')
  }
}

const getDao = async () => {
  if (!productsDao) {
    await initDaos()
  }
  return {
    products: productsDao,
    carts: cartsDao,
    orders: ordersDao,
    users: usersDao,
    chats: chatsDao,
  }
}


module.exports = getDao