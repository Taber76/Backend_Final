function registerNewUser(sessionUserHtmlElement) {
  sessionUserHtmlElement.innerHTML = registerNewUserTemplate()

  const name = document.getElementById('name')
  const user = document.getElementById('email')
  const address = document.getElementById('address')
  const age = document.getElementById('age')
  const phoneInputField = document.querySelector("#phone")
  const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    })
  const userFileImage = document.getElementById('userImage')
  const userUrlImage = document.getElementById('urlImage')
  const password = document.getElementById('password')
  const passwordConf = document.getElementById('passwordConf')
  const registerBtn = document.getElementById('registerBtn')
  const cancelRegisterBtn = document.getElementById('cancelRegisterBtn')

  registerBtn.addEventListener("click", ev => {

    const phoneNumber = phoneInput.getNumber() // paso a fromato internacional
    
    if( !validateObject ({
          name: name.value,
          direccion: address.value,
          edad: age.value,
          telefono: phoneNumber,
          contrasena: password.value
        })
        & validateEmail( user.value )
        & testImage( userFileImage.files[0], userUrlImage.value ) != 'none' // <-- uploadImage.js
        & ( password.value === passwordConf.value )
        ){

        let urlPhoto = userUrlImage.value
        if ( testImage( userFileImage.files[0], userUrlImage.value ) === 'file' ) {          
          urlPhoto = `http://localhost:${location.port}/uploads/${user.value}.${userFileImage.files[0].name.split('.').pop()}`     
        }
    
        fetch(`http://localhost:${location.port}/session/register/`, { // Registro usuario
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: email.value,
            password: password.value,
            name: name.value,
            address: address.value,
            age: age.value,
            phone: phoneNumber,
            photo: urlPhoto
          })
        })
        .then(response => {
          if( response.status === 401 ){
            toast("Usuario ya existe", "#f75e25", "#ff4000")
          
          } else { // Usuario creado -> subo foto -> hago login

            if ( testImage( userFileImage.files[0], userUrlImage.value ) === 'file' ) {          
              upload( userFileImage.files[0], email.value )
            }

            fetch(`http://localhost:${location.port}/session/login/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                user: email.value,
                password: password.value
              })
            })
            .then( response => { 
              location.reload()
            })
            .catch(error => {
              console.log('Se produjo un error: ', error)
            })
          }
        })

    } else {
      toast('Verifique que completo todos los datos e ingreso correctamente su contrasena', "#f75e25", "#ff4000")
    }
  })

  cancelRegisterBtn.addEventListener("click", ev => {
    location.reload()
  })

}
