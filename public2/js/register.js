const logName = document.getElementById('logName')
const logPassword = document.getElementById('logPassword')

document.getElementById("registerBtn").addEventListener("click", ev => {
  if ( validateObject ({ a: logName.value , b: logPassword.value })) {
    toast('Debe completar todos los datos', "#f75e25", "#ff4000")
  } else {
    if ( validateEmail( logName.value )) {
      fetch(`http://localhost:${location.port}/session/register/`, {
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
        if ( response.status === 401 ){
          toast("Usuario ya existe", "#f75e25", "#ff4000")
      
        } else { // Login de nuevo usuario

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
          .then( response => { 
            location.href = 'index.html'
          })
          .catch(error => {
            console.log('Se produjo un error: ', error)
          })
        }
      })
    }
  }


})