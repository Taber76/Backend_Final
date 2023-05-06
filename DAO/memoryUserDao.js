const bcrypt = require('bcrypt')
const saltRounds = 10


class MemoryUserDao { 

  constructor( usersList ) {
      this.usersList = usersList
  }
  

  checkUser( email, password ) {
    const user = this.usersList.find( ele => ele.email === email )
    if ( user ) {
      if ( bcrypt.compareSync( password, user.password ) ) {
        return { msg: '', result: true }
      } else {
        return { msg: 'Contrasena incorrecta', result: false }
      }
    } 
    return { msg: 'No existe usuario', result: false }
  }

  
  addUser( email, password ) {
    const user = this.usersList.find( ele => ele.email === email )
    if ( !user ) {
      const encriptedPassword = bcrypt.hashSync(password, saltRounds)
      this.usersList.push({ email: email, password: encriptedPassword })
      return true
    } else {
      return false
    }
  }

  
}


module.exports = MemoryUserDao 