const { checkUserDto, addUserDto, getUserDto } = require('../DTO/userDto')
const { adminmail } = require('../config/environment')
const { validateUserData } = require('../controllers/valitationFunctions')
const { sendEmail } = require('../messages/email')


const checkUserController = async( username, password ) => {
  const checkUser = await checkUserDto( username, password )
  return checkUser  //ex: { msg: 'Usuario y contrasena correctos', result: true }
}


const addUserController = async ( userData ) => {
  if ( validateUserData( userData ) ) {
    const addUser = await addUserDto ( userData )
    if ( addUser ) {
      sendEmail({
        from: 'Administrador',
        to: adminmail,
        subject: 'Nuevo usuario registrado',
        text: '',
        html: `
        <table>
          <tbody>
            <tr>
              <td>Username</td>
              <td>${userData.username}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>${userData.name}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>${userData.address}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>${userData.age}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>${userData.phone}</td>
            </tr>
            <tr>
              <td>Photo</td>
              <td>${userData.photo}</td>
            </tr>
          </tbody>
        </table>`
      })
      return true
    }
  }
  return false  
}


const getUserController = async ( username ) => {
  const userData = await getUserDto( username )
  return userData // userObject || null
}

module.exports = { checkUserController, addUserController, getUserController }