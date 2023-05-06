const admin = require("firebase-admin")
const serviceAccount = require("./credentialsFirebase.json")

let isConected

const connectToFirebase = async () => {
  if(!isConected) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://hanovershop-df086.firebaseio.com'
    })
  console.log('Connected to Firebase...')
  return
  }

  console.log("Conexion existente")
  return
}


module.exports = connectToFirebase 