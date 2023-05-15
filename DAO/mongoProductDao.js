const connectToDb = require('../config/connectToMongo')
const { productModel } = require('../models/mongoDbModel')

const { logger, loggererr } = require('../log/logger')


class MongoProductDao {
  
  async getAll() {
    try{
      await connectToDb()
      const documentsInDb = await productModel.find({active: true})
      return documentsInDb
    } catch(err) {
      logger.warn(`Error: ${err} al intentar recuperar los productos.`)
    }
  }
 

  async getById( id ) {
    try {
      await connectToDb()
      const documentInDb = await productModel.find({_id: id})
      return documentInDb ? documentInDb : null

    } catch(err) {
      logger.warn(`Error: ${err} al intentar recuperar el producto.`)
    }
  }

  async getByCategory( category ) {
    try {
      await connectToDb()
      const documentInDb = await productModel.find({category: category})
      return documentInDb ? documentInDb : null
    } catch(err) {
      logger.warn(`Error: ${err} al intentar recuperar los productos.`)
    }
  }

  async deleteById( id ) {  // REVISAR DELETE
    try {
      await connectToDb()
      await productModel.updateOne({ _id: id }, { $set: { active: false } })
      return true
    } catch(err) {
      logger.warn(`Error: ${err} al intentar borrar el producto.`)
      return false
    }
  }


  async add( item ) {
    try{
      await connectToDb()
      const newProduct = new productModel( item )
      await newProduct.save()
        .then(product => logger.info(`Se ha agregado a la base de datos elemento con id: ${product._id}`))
        .catch(err => loggererr.error(err))
      return
    } catch(err) {
      logger.warn(`Error: ${err} al intentar agregar el producto.`)
    }
  }


  async modifyById( id, item ) {  
    try {
      await connectToDb()
      const result = await productModel.findByIdAndUpdate(id, item)
      if (result !== null){
        logger.info(`Se ha actualizado el elemento con id: ${id}`)
        return true
      } else {
        logger.info(`No se ha encontrado ningún elemento con id: ${id}`)
        return false
      }
    } catch(err) {
      logger.warn(`Error: ${err} al intentar actualizar el producto.`)
      return false
    }
  }
  


}

module.exports = MongoProductDao