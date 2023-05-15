//-------------- Minimist
const parseArgs = require('minimist')(process.argv.slice(2)) // ejemplo -> nodemon src/main.js -p 8080 -m FORK
module.exports.config = {
  port: parseArgs.p, // puerto escucha
  mode: parseArgs.m, // mode 'FORK' (defecto) o 'CLUSTER'
  same: parseArgs.a // para CLUSTER puerto unico (defecto) o '1' puertos correlativos
}

//--------------- DotEnv
require('dotenv').config()

module.exports.staticFiles = process.env.STATICFILES

module.exports.mongocredentialsession = process.env.MONGOCREDENTIALSESSION
module.exports.mongocredentialsecommerce = process.env.MONGOCREDENTIALSECOMMERCE
module.exports.usersessiontime = process.env.USERSESSIONTIME
module.exports.jwtsecretkey = process.env.JWTSECRETKEY
module.exports.jwtexpires = process.env.JWTEXPIRES

module.exports.emailservice = process.env.EMAILSERVICE
module.exports.emailport = process.env.EMAILPORT
module.exports.emailuser = process.env.EMAILUSER
module.exports.emailpass = process.env.EMAILPASS
module.exports.adminmail = process.env.ADMINMAIL

module.exports.smsnumber = process.env.SMSNUMBER
module.exports.whatsappnumber = process.env.WHATSAPPNUMBER
module.exports.msgaccountsid = process.env.MSGACCOUNTSID
module.exports.msgauthtoken = process.env.MSGAUTHTOKEN

module.exports.persistence = process.env.PERSISTENCE

module.exports.gptapikey = process.env.GPTAPIKEY