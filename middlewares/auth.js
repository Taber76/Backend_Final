const passport = require('passport')
const { Strategy } = require('passport-local')
const LocalStrategy = require('passport-local').Strategy

const decodedToken = require('./googleauth')
const { logger } = require('../log/logger')

const { checkUserController, addUserController, getUserController } = require('../controllers/usersController')
const { response } = require('express')

passport.use(
  'login',
  new LocalStrategy(
    async function( username, password, done ) {
      const validateUser = await checkUserController (username, password)
      if ( validateUser.result ) {     
        return done( null, { username: username } )
      } else {
        logger.info(`Usuario o contrasena incorrectos.`)
        return done( null, false )
      }
    }
  )
)

passport.use(
  'googleauth',
  new Strategy(
    async function ( username, password, done ) {
      const googleUser = await decodedToken( password )
      const userInDb = await checkUserController ( username, '' )
      if ( userInDb.msg != 'No existe usuario' & googleUser.email === username ) { // usuario ya cargado en base de datos       
        return done ( null, { username: username })
      } 
      if ( userInDb.msg === 'No existe usuario' & googleUser.email === username ) {
        await newUserController (username, password)
        return done ( null, { username: username })
      }
      logger.info(`Usuario no valido`)
      return done( null, false)
    }
  )
)

passport.use(
  'register',
  new LocalStrategy(
    async ( username, password, done ) => {
      const userCheck = await checkUserController (username, '')
      if ( userCheck.msg === 'Contrasena incorrecta' ) {
        logger.info(`Se intento registrar un usuario ya existente`)
        return done( null, false )  
      } else {
        return done( null, { username: username } )
      }
    }
  )
)

passport.serializeUser( function(user, done) {
  done(null, user.username)
})

passport.deserializeUser( function(username, done) {
  done(null, { username: username })
})

module.exports = passport


module.exports.isLoggedIn = (req, res, next) => {
  if (req.session.passport) {
    next()
  } else {
    logger.warn(`Metodo ${req.method} no autorizado`)
    res.redirect('/')
  }
}