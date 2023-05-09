const connectToDb = require('../config/connectToMongo')
const { productModel } = require('../schemas/mongoDbModel')

const { logger, loggererr } = require('../log/logger')


class MongoProductDao {
  
  async getAll() {
    try{
      await connectToDb()
      const documentsInDb = await productModel.find()
      return documentsInDb
    } catch(err) {
      loggererr.error(`Error: ${err}`)
    }
  }
 

  async getById( id ) {
    try {
      await connectToDb()
      const documentInDb = await productModel.find({_id: id})
      return documentInDb ? documentInDb : null

    } catch(err) {
      loggererr.error(`Error: ${err}`)
    }
  }


  async deleteById( id ) {  
    try {
      await connectToDb()
      await productModel.deleteOne({ _id: id })
      return true
    } catch(err) {
      loggererr.error(`Error: ${err}`)
      return false
    }
  }


  async deleteAll() {
    try {
      await connectToDb()
      await productModel.deleteMany()
      return 
    } catch(err) {
      loggererr.error(`Error: ${err}`)
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
      loggererr.error(`Error: ${err}`)
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
      loggererr.error(`Error: ${err}`)
      return false
    }
  }
  



}

module.exports = MongoProductDao