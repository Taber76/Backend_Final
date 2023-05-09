const admin = require("firebase-admin")
const serviceAccount = require("./credentialsFirebase.json")
const { logger, loggererr } = require('../../log/logger')

let isConected

const connectToFirebase = async () => {
  if(!isConected) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://hanovershop-df086.firebaseio.com'
    })
  logger.info('Connected to Firebase...')
  return
  }

  logger.info("Conexion existente")
  return
}


module.exports = connectToFirebase 