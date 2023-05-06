//-------------- Minimist
const parseArgs = require('minimist')(process.argv.slice(2)) // ejemplo -> nodemon src/main.js -p 8080 -m FORK
const config = {
  add: parseArgs.a, // 1 agrega
  list: parseArgs.l, // 1 lista
  del: parseArgs.d, // 1 borra
  mod: parseArgs.m // 1 modifica
}

module.exports = config