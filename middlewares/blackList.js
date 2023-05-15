const { logger, loggererr } = require('../log/logger')

let blacklistJWT = []

module.exports.addBlackListJWT = ( token ) => blacklistJWT.push( token )
  
module.exports.isInBlackListJWT = ( req, res, next ) => {
  if (blacklistJWT.includes( req.headers.authorization )) {
    logger.warn(`El JWT ya no es valido, token: ${req.headers.authorization}`)
    res.redirect(`info/error/JWT ya no es valido: ${req.headers.authorization}`)
  } else {
    next()
  }

}
