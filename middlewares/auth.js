const passport = require('passport')
const { Strategy } = require('passport-local')
const LocalStrategy = require('passport-local').Strategy
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const jwt = require('jsonwebtoken')

const { jwtsecretkey, jwtexpires } = require('../config/environment')
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
  'register',
  new LocalStrategy(
    async ( username, password, done ) => {
      const userCheck = await getUserController( username )
      if ( userCheck !== null ) {
        logger.info(`Se intento registrar un usuario ya existente`)
        return done( null, false )  
      } else {
        return done( null, { username: username } )
      }
    }
  )
)


passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtsecretkey, 
    },
    async (payload, done) => {
      try {
        const user = await getUserController( payload.username )
        return done(null, user !== null ? user : false)
      } catch (error) {
        return done(error, false)
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

module.exports.generateJwtToken = ( username ) =>{
  const payload = {
    username: username
  }
  const options = {
    expiresIn: jwtexpires 
  }
  return jwt.sign(payload, jwtsecretkey, options)
}