const connectToDb = require('../config/connectToMongo')
const { cartModel } = require('../models/mongoDbModel')

const { logger, loggererr } = require('../log/logger')

class MongoCartDao {

  async newCart( username, sendaddress ) {
    try {
      await connectToDb()
      const newCart = new cartModel({ 
        username: username,
        sendaddress: sendaddress,
        products: []
      })
      const result = await newCart.save()
      return result
    } catch (err) {
      loggererr(err)
    }
  }


  async getByUsername( username ) {
    try {
      await connectToDb()
      const cart = await cartModel.findOne({ username: username })
      return cart
    } catch (err) {
      logger.warn(`Error: ${err} al intentar recuperar el carrito.`)
      return false
    }
  }


  async addProductToCart( itemId, number, username ) {
    try {
      await connectToDb()
      const response = await cartModel.findOneAndUpdate(
        { username: username, "products.id": itemId },
        { $inc: { "products.$.number": number } },
        { new: true }
      )
      if (!response) {
        await cartModel.findOneAndUpdate(
          { username: username },
          { $push: { products: { id: itemId, number: number } } },
          { new: true }
        )
      }
      return true
    } catch (err) {
      logger.warn(`Error: ${err} al intentar agregar el producto al carrito.`)
      return false
    }
  }
  
  async delProductFromCart( itemId, username ) {
    try {
      await connectToDb()
      const response = await cartModel.findOneAndUpdate(
        { username: username },
        { $pull: { products: { id: itemId } } },
        { new: true }
      )
      return response ? true : false
    } catch (err) {
      logger.warn(`Error: ${err} al intentar borrar el producto del carrito.`)
      return false
    }
  }

  async delCart( username ) {
    try {
      await connectToDb()
      const response = await cartModel.findOneAndUpdate(
        { username: username },
        { $set: { products: [],
                  timestamp: new Date().getTime() 
                }
         }
      )
      return response ? true : false
    } catch (err) {
      logger.warn(`Error: ${err} al intentar borrar el carrito.`)
      return false
    }
  }
}

module.exports = MongoCartDao