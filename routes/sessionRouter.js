const { Router } = require('express')
const sessionRouter = Router() 

const passport = require('../middlewares/auth')

const { logger, loggererr } = require('../log/logger')
const { addUserController } = require('../controllers/usersController')


/* ------------------ router session ----------------- */
//--------------------- usuario logeado?
sessionRouter.get(
  '/',
  (req, res) => {
    if (req.session.passport) {
      logger.info(`Usuario ${req.session.passport.user} logeado`)
      res.status(200).send({ user: req.session.passport.user })
    } else {
      logger.warn(`No hay usuario logeado`) 
      res.status(401).send({ username: '' })
    }
  }
)


//--------------------- post login user
sessionRouter.post(
  '/login', 
  passport.authenticate('login'),
  function(_, res) {
    logger.info(`Autenticacion exitosa`)
    res.status(200).send({ message: 'Autenticación exitosa.' })
  }
)


//--------------------- post login/register user with google
sessionRouter.post(
  '/logingoogle', 
  passport.authenticate('googleauth'),
  function(_, res) {
    logger.info(`Autenticacion con Google exitosa`)
    res.status(200).send({ message: 'Autenticación exitosa.' })
  }
)


//--------------------- post Register user
sessionRouter.post(
  '/register',
  passport.authenticate('register'),
  ( req, res) => {
    if ( addUserController ({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      age: req.body.age,
      photo: req.body.photo
    })) {
      logger.info(`Usuario creado correctamente`)
      res.status(200).send({ result: true, msg: 'Usuario creado correctamente'})
    } else {
      logger.info(`No se ha podido crear usuario`)
      res.status(200).send({ result: false, msg: 'No se ha podido crear usuario'})
    }
  }
)


//------------ post cerrar sesion
sessionRouter.post(
  '/logout',
  async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        loggererr.error(`No se ha podido cerrar la sesion, error: ${error}`)
        res.status(500).send(`Something terrible just happened!!!`)
      } else {
        logger.info(`Sesion cerrada.`)
        res.redirect('/')
      }
    })
  }
)


module.exports = sessionRouter