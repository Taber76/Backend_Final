const { getAuth } = require("firebase-admin/auth")
const connectToFirebase = require("./firebase/connectToFirebase")

connectToFirebase()

const decodedToken = (token) => getAuth().verifyIdToken(token)

module.exports = decodedToken
