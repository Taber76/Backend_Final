const connectToDb = require('../config/connectToMongo')
const { userModel, cartModel } = require('../models/mongoDbModel')

const { logger, loggererr } = require('../log/logger')
const bcrypt = require('bcrypt')
const saltRounds = 10


class MongoUserDao { 


  async checkUser( username, password ) {
    try {
      await connectToDb()
      const documentInDb = await userModel.findOne({ username: username })
      if ( documentInDb !== null ) {
        if ( bcrypt.compareSync( password, documentInDb.password ) ) {
          return { msg: 'Usuario y contrasena correctos', result: true }
        } else {
          logger.info(`Se ha intentado logear ${username} con una contrasena incorrecta`)
          return { msg: 'Contrasena incorrecta', result: false }
        }
      } 
      return { msg: 'No existe usuario', result: false }
    } catch(err) {
      loggererr.error(`Error: ${err}`)
    }
  }
/*
  async userInDb( username ){
    try {
      await connectToDd()
      const documentInDb = await this.schema.findOne({ username: username })
      return documentInDb !== null ? true : false
     } catch(err) {
      loggererr.error(`Error: ${err}`)
    }
  }*/

  async getUser( username ) {
    try {
      await connectToDb()
      const documentInDb = await userModel.findOne({username: username})
      return documentInDb ? documentInDb : null
    } catch(err) {
      loggererr.error(`Error: ${err} al intentar recuperar el usuario id:${username} de la base de datos`)
      return null
    }
  }
  
  async addUser( userData ) {
    try{
      await connectToDb()
      const documentInDb = await userModel.findOne({ username: userData.username })
      if ( documentInDb === null ) {
        const encriptedPassword = bcrypt.hashSync(userData.password, saltRounds)
       
        const newUser = new userModel({ // nuevo usuario
          username: userData.username,
          password: encriptedPassword,
          name: userData.name,
          address: userData.address,
          age: userData.age,
          phone: userData.phone,
          photo: userData.photo
          })
        await newUser.save()
          .then(user => logger.info(`Se ha agregado a la base de datos elemento con id: ${user._id}`))
          .catch(err => loggererr.error(`Se ha produciodo error ${err} al intentar agregar un usuario a la base de datos`))
        
        const newCart = new cartModel({ // nuevo cart
          username: userData.username,
          products: [],
          sendaddress: userData.address
        })
        await newCart.save()
          .then(cart => logger.info(`Se ha agregado a la base de datos elemento con id: ${cart._id}`))
          .catch(err => loggererr.error(`Se ha produciodo error ${err} al intentar agregar el cart de un usuario a la base de datos`)) 
      

        return true
      } else {
        logger.warn(`El usuario ${userData.username} ya existe`)
        return false
      }
    } catch(err) {
      loggererr.error(`Se ha produciodo error ${err} al intentar agregar un usuario a la base de datos`)
      return false
    }
  }

}


module.exports = MongoUserDao 