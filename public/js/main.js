const sessionUserHtmlElement = document.querySelector('#sessionUser')
const productListHtmlElement = document.querySelector('#productList')
const registerFormHtmlElement = document.querySelector('#registerForm')


//-------------------------------------------------------------------------------------------------
//--- SESSION
async function main(){
  const userData = await userLogged() // Si hay usuario logeado devuelve el username --> session.js
  
  if ( userData.username !== '' ) {
    const productsData = await allProducts()
    console.log(userData)
    logged( userData[0], productsData ) // genero vistas de usaurio logueado --> session.js
    
  } else {
    sessionUserHtmlElement.innerHTML = loginTemplate()
    const logUser = document.getElementById("logUser")
    const logPassword = document.getElementById("logPassword")
   
    //--login con usuario y contrasena ------------------------------------
    document.getElementById("loginBtn").addEventListener("click", ev => { 
      if ( validateObject ({ usuario: logUser.value , clave: logPassword.value })) {
        toast('Debe completar todos los datos', "#f75e25", "#ff4000")   
      } else { 
        fetch(`http://localhost:${location.port}/session/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: logUser.value,
            password: logPassword.value
          })
        })
        .then((response) => response.json())
        .then(async (data) => {
          if ( Object.keys(data).length === 0){
            toast("Error de autenticacion", "#f75e25", "#ff4000")
          } else {
            const productsData = await allProducts()
            logged ( data[0], productsData ) // <-- session.js
          }
        }) 
         
        .catch(error => {
          toast("Error de autenticacion", "#f75e25", "#ff4000")
          console.error('Se produjo un error: ', error)
        })
      }
    })
    
    //--registro de usuario ---------------------
    document.getElementById("registerBtn").addEventListener("click", ev => {
      registerNewUser(sessionUserHtmlElement) // --> register.js
    }) 

  }
}


//-----------------------------------------------------------------

main()