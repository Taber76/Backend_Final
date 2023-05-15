const connectToDb = require('../config/connectToMongo')
const { orderModel } = require('../models/mongoDbModel')

const { logger, loggererr } = require('../log/logger')

class MongoOrderDao {

  async newOrder( order ) {
    try {
      await connectToDb()
      const ordernumber = await orderModel.countDocuments()
      const newOrder = new orderModel({ ...order, ordernumber: ordernumber + 1 })
      await newOrder.save()
        .then(order => logger.info(`Se ha agregado a la base de datos orden de compra con id: ${order._id}`))
        .catch(err => logger.warn(`Se ha produciodo error ${err} al intentar crear una nueva orden de compra`))
      return true
    } catch (err) {
      logger.warn(`Error: ${err} al intentar crear el pedido.`)
      return false
    }
  }


}

module.exports = MongoOrderDao