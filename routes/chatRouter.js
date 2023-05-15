const { Router } = require('express')  
const chatRouter = Router() 

const { getAllByUserController, addMessageController } = require('../controllers/chatsController')
const { logger, loggererr } = require('../log/logger')
const passport = require('../middlewares/auth')
const { isInBlackListJWT } = require('../middlewares/blackList')


/* ------------------ router chat ----------------- */

//------------- get user chat
chatRouter.get(
  '/chat/:username',
  isInBlackListJWT,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const chats = await getAllByUserController( req.params.username )
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.status(200).send( chats )
    } catch (error) {
      logger.warn(`Error: ${error} al intentar recuperar el chat.`)
      res.redirect(`info/error/Error al intentar recuperar el chat: ${error}`)
    }
  }
)

//------------- add message
chatRouter.post(
  '/chat/:msg',
  isInBlackListJWT,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const added = await addMessageController( req.params.msg, req.session.passport.user )
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.status(200).send( added )
    } catch (error) {
      logger.warn(`Error: ${error} al intentar agregar el mensaje.`)
      res.redirect(`info/error/Error al intentar agregar el mensaje: ${error}`)
    }
  }
)


module.exports = chatRouter