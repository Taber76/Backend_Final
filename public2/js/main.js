import { authModule } from "./googleauth.js"


// SOCKET ----------------------------------------------------------------------------------------

const socket = io.connect()


//-------------------------------------------------------------------------------------------------
//--- SESSION
async function main(){
  const user = await userLogged() // Si hay usuario logeado devuelve el username
  
  if ( user ) {
    logged( user ) // genero vistas de usaurio logueado
  
  } else {
    document.querySelector('#sessionUser').innerHTML = loginTemplate()
    const logName = document.getElementById("logName")
    const logPassword = document.getElementById("logPassword")
   
    //login con usuario y contrasena ------------------------------------
    document.getElementById("loginBtn").addEventListener("click", ev => { 
      if ( validateObject ({ a: logName.value , b: logPassword.value })) {
        toast('Debe completar todos los datos', "#f75e25", "#ff4000")
      
      } else {    
        fetch(`http://localhost:${location.port}/session/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: logName.value,
            password: logPassword.value
          })
        })
        .then(response => {
          if( response.status === 401 ){
            toast("Usuario y/o contrasena incorrectos", "#f75e25", "#ff4000")
          } else {
            logged ( logName.value )
          }
        })
        .catch(error => {
          console.error('Se produjo un error: ', error)
        })
      }

    })
    
    //login con google ----------------------------------------------------------------
    document.getElementById("googleBtn").addEventListener("click", async (ev) => {    
      await authModule.signInWithPopup( authModule.auth, authModule.provider )

      authModule.onAuthStateChanged( authModule.auth, async user => {
        if ( user ) {
           fetch(`http://localhost:${location.port}/session/logingoogle/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: user.email,
              password: user.accessToken
            })
          })
          .then(response => {
            if( response.status === 401 ){
              toast("Fallo de autentificacion", "#f75e25", "#ff4000")
            } else {
              logged ( user.email )
            }
          })
          .catch(error => {
            console.error('Se produjo un error: ', error)
          })
        }

      })
      
    })  

  }
}


//-------------------------------------------------------------------------------------------------
//--- PRODUCTOS

socket.on('productos', data => {
    document.querySelector('#tabla').innerHTML = productsTable( data )
})


//----------------------------------------------------------------------------------------
//--- CHAT


//envio de mensajes-----------

const userEmail = document.getElementById("userEmail")
const userName = document.getElementById("userName")
const userSurname = document.getElementById("userSurname")
const userAge = document.getElementById("userAge")
const userNickname = document.getElementById("userNickname")
const userAvatar = document.getElementById("userAvatar")
const userMensaje = document.getElementById("userMsj")

document.getElementById("sendBtn").addEventListener("click", ev => {
  if ( validateEmail(userEmail.value) ) {
    if ( userMensaje.value ){
    
      socket.emit('newMsj', {
        author: {
          id: userEmail.value,
          name: userName.value,
          surname: userSurname.value,
          age: userAge.value,
          nickname: userNickname.value,
          avatar: userAvatar.value
        },
        text: userMensaje.value
       })

       userMensaje.value = ''

    } else {
      alert("Ingrese un mensaje!")
    }
  }
})


// recepcion mensajes desde el backend
socket.on('mensajes', data => {
  document.querySelector('#chat').innerHTML = chatMessages( data )
})


//-----------------------------------------------------------------

main()