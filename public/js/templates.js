//----------------------------------------------- Funciones generales

function validateEmail(email) {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if(email.match(mailformat)) {
    return true
  } else {
    toast('Debe ingresar un email valido', "#f75e25", "#ff4000")
    return false
  }
}


function toast (mensaje, color1, color2) {
  Toastify({
    text: mensaje,
    duration: 4000,
    newWindow: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: `linear-gradient(to right, ${color1}, ${color2})`,
    },
    onClick: function(){} // Callback after click
  }).showToast()
}


function validateObject(objeto) { // retorna true si hay algun campo vacio
  for (let clave in objeto) {
    if (objeto[clave] === '' ){
      toast(`Falta ${clave}`, "#f75e25", "#ff4000")
    }
  }
  
  return Object.values(objeto).includes('')
}



//--------------------------- Templates
// Session

function loginTemplate () { // --- Dialogo inicial de logueo o registro
  return `
  <div class="container alert alert-primary text-center" role="alert">
    <h3>LOGIN DE USUARIO</h3>   
    <div class="row">
      <div class="col-4 mb-3">      
        <input type="text" class="form-control" id="logUser" aria-describedby="pHelp">
        <div id="pHelp" class="form-text">Nombre de usuario</div>
      </div>
      <div class="col-4 mb-3">      
        <input type="text" class="form-control" id="logPassword" aria-describedby="pHelp">
        <div id="pHelp" class="form-text">Contrasena</div>
      </div>
      <div class="col">
        <button id="loginBtn" type="" class="btn btn-primary">USER LOGIN</button>   
      </div>
      <div class="col">
        <button id="registerBtn" type="" class="btn btn-primary">USER REGISTER</button> 
      </div>
    </div>
  </div>
  `
}

function logOkTemplate ( userData ) { // --- Datos del usuario una vez logeado
  return `
  <div class="container alert alert-primary text-center">
    <div class="row">
      <div class="col-3">
        <img src="${userData.photo}" alt="user photo" width="200px" height="200px">
      </div>
      <div class="col-9">          
        <div class="container">
          <div class="row justify-content-between mt-2">
            <div class="col"><h5 class="card-title">Bienvenido ${userData.username}</h5></div>
            <div class="col-2"><button id="logoutBtn" type="" class="btn btn-secondary">LOGOUT</button></div>
          </div>
          <div class="row justify-content-between mt-3">
            <div class="col">Nombre: ${userData.name}</div>
            <div class="col text-start">Edad: ${userData.age}</div>
          </div>
          <div class="row justify-content-between mt-3">
            <div class="col">Direccion: ${userData.address}</div>
            <div class="col text-start">Telefono: ${userData.phone}</div>
            <div class="col-2"><button id="cartBtn" type="" class="btn btn-success"> CART </button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
}

function logByeTemplate ( user ) { // ---- Dialogo de cierre de sesion
  return `
  <div class="container alert alert-primary text-center" role="alert">
    <div class="row">
      <div class="col mb-3">      
        <h2>Hasta luego ${user}!!</h2>
      </div>
    </div>
  </div>
  `
}


// Productos

function productsTable( products ) { // --- Tabla de productos

  let htmlToRender = `
  <div class="container alert alert-primary text-center">
    <div class="row">`
  
  products.forEach(( element ) => {
    htmlToRender = htmlToRender + `
    <div class="col p-1">
      <div class="card" style="width: 16rem;">
        <img src="${element.thumbnail}" class="card-img-top" alt="${element.title} style="width: 14rem; heigth: 14rem"" >
        <div class="card-body">
          <h5 class="card-title">${element.title} precio ${element.price}</h5>
          <p class="card-text">${element.description}</p>
          <button id="${element._id}" class="btn btn-primary">Agregar al carrito</button>
        </div>
      </div>
    </div>
    ` 
  })
  
  htmlToRender = htmlToRender + '</div></div>'
  
  return htmlToRender
}


// Cart
function cartViewTemplate( userCart, productsData ) { // --- Muestra cart
 
  let total = 0
  let htmlToRender = `
  <div class="container">
    <div class="row">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Articulo</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Valor</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
  `

  userCart.forEach( element => {
    const article = productsData.find( ele => ele._id === element.id )

    htmlToRender = htmlToRender += `
      <tr>
        <td><img src="${article.thumbnail}" width="100" height="100"></td>
        <td>${article.title}</td>
        <td>${element.number}</td>
        <td>$${article.price}</td>
        <td>$${article.price * element.number}</td>
      </tr>
    `
    total =+ total + article.price * element.number 
  })

  htmlToRender = htmlToRender += `
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <th>TOTAL</th>
      <th>$${total}</th>
    </tr>
  </tbody></table></div>
  <div class="row">
    <div class="col">
      <button id="buyBtn" type="" class="btn btn-primary">REALIZAR COMPRA</button> 
    </div>
    <div class="col">
      <button id="homeBtn" type="" class="btn btn-primary">VOLVER A LA TIENDA</button> 
    </div>
  </div> 
  `

  return htmlToRender

}




// register user
function registerNewUserTemplate () { // --- Dialogo de ingreso de datos de registro
  return `  
  <div class="container alert alert-primary text-center">
    <div class="row">
      <div class="mb-3 col">
        <label for="name" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="name" name="name">
      </div>
      <div class="mb-3 col">
        <label for="email" class="form-label">Correo electronico</label>
        <input type="email" class="form-control" id="email" name="email">
      </div>
    </div>
    <div class="row align-items-end">
      <div class="mb-3 col-7">
        <label for="address" class="form-label">Direccion</label>
        <input type="text" class="form-control" id="address" name="address">
      </div>
      <div class="mb-3 col-1">
        <label for="age" class="form-label">Edad</label>
        <input type="number" class="form-control" id="age" name="age">
      </div>
      <div class="mb-3 col-4">
        <label for="phone" class="form-label">Telefono</label>
        <input type="tel" class="form-control" id="phone" name="phone">
      </div>
    </div>
    <div class="row">
      <div class="mb-3 col">
        <label for="userImage" class="form-label">Selecione una imagen (hasta 1Mb) para su usuario</label>
        <input type="file" class="form-control" id="userImage" name="userImage">
      </div>
      <div class="mb-3 col">
        <label for="urlImage" class="form-label">o proporcione una url con una imagen</label>
        <input type="text" class="form-control" id="urlImage" name="urlImage">
      </div>
    </div>
    <div class="row">
      <div class="mb-3 col">
        <label for="password" class="form-label">Contrasena</label>
        <input type="password" class="form-control" id="password" name="password">
      </div>
      <div class="mb-3 col">
        <label for="passwordConf" class="form-label">Repita su contrasena</label>
        <input type="password" class="form-control" id="passwordConf" name="passwordConf">
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="mb-3 col-2">
        <button id="registerBtn"  class="col btn btn-success">Confirmar registro</button>
      </div>
      <div class="mb-3 col-2">
        <button id="cancelRegisterBtn"  class="btn btn-danger">Cancelar registro</button>
      </div>
    </div>
  </div>
  `
}
