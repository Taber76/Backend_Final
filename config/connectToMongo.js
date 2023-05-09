const mongoose = require('mongoose')
const { mongocredentialsecommerce } = require('../config/environment')
const { logger, loggererr } = require('../log/logger')

let isConected

const connectToDb = async () => {
  if(!isConected) { // Esta logica es para evitar varias conexiones simultaneas
    mongoose.set('strictQuery', true)
    await mongoose.connect(mongocredentialsecommerce,
    { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          isConected = true
          logger.info('MongoDB Connected...')
        })
        .catch(err => loggererr.error(err))   
    return
  }

  return
}

module.exports = connectToDb 

