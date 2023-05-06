const mongoose = require('mongoose')
const { mongocredentialsecommerce } = require('../config/environment')

let isConected

const connectToDb = async () => {
  if(!isConected) { // Esta logica es para evitar varias conexiones simultaneas
    mongoose.set('strictQuery', true)
    await mongoose.connect(mongocredentialsecommerce,
    { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          isConected = true
          console.log('MongoDB Connected...')})
        .catch(err => console.log(err))   
    return
  }

  return
}

module.exports = connectToDb 

