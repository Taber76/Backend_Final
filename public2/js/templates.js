//------------------------------ Funciones generales

function validateEmail(email) {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if(email.match(mailformat)) {
    return true
  } else {
    toast('Debe ingresar un email valido', "#f75e25", "#ff4000")
    return false
  }
}


function validateObject(objeto) { // retorna true si hay algun campo vacio
  return Object.values(objeto).includes('')
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


//--------------------------- Templates
// Session

function loginTemplate () {
  return `
  <div class="container alert alert-primary text-center" role="alert">
    <h3>LOGIN DE USUARIO</h3>   
    <div class="row">
      <div class="col-4 mb-3">      
        <input type="text" class="form-control" id="logName" aria-describedby="pHelp">
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
      <button id="googleBtn" type="" class="btn btn-primary">GOOGLE LOGIN</button>   
    </div>
      <div class="col">
        <a href="register.html">
          <button id="registerBtn" type="" class="btn btn-primary">USER REGISTER</button> 
        </a>
      </div>
    </div>
  </div>
  `
}

function logOkTemplate ( user ) {
  return `
  <div class="container alert alert-primary text-center" role="alert">
    <div class="row">
      <div class="col-9 mb-3">      
        <h2>Bienvenido ${user}!!</h2>
      </div>
      <div class="col-3">
        <button id="logoutBtn" type="" class="btn btn-secondary">LOGOUT</button> 
      </div>
    </div>
  </div>
  `
}

function logByeTemplate ( user ) {
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

function newProductTemplate(){
  return `
    <div class="container">
    <div class="alert alert-primary text-center" role="alert">
      INGRESO DE NUEVO PRODUCTO
    </div>
  </div>

<form id= "formulario" class="container" action="/api/productos" method="POST" >
   <div class="mb-3">
     <label for="name" class="form-label">Nombre del producto</label>
     <input type="text" class="form-control" id="name" name="title">
   </div>
   <div class="mb-3">
    <label for="description" class="form-label">Descripcion</label>
    <input type="text" class="form-control" id="description" name="description">
  </div>

  <div class="row d-flex justify-content-center">
    <div class="mb-3 col">
      <label for="code" class="form-label">Codigo</label>
      <input type="number" class="form-control" id="code" name="code">
    </div>
    <div class="mb-3 col">
      <label for="price" class="form-label">Precio</label>
      <input type="number" class="form-control" id="price" name="price">
    </div>
    <div class="mb-3 col">
      <label for="stock" class="form-label">Stock</label>
      <input type="number" class="form-control" id="stock" name="stock">
    </div>
  </div>

   <div class="mb-3">
     <label for="picture" class="form-label">Foto del producto</label>
     <input type="text" class="form-control" id="picture" name="thumbnail" aria-describedby="pictureHelp">
     <div id="pictureHelp" class="form-text">URL de la foto</div>
   </div>
   <button type="submit" class="btn btn-primary">Guardar</button>
 </form>
  `
}



function productsTable( products ) {

  let htmlToRender = `
  <table class="table container">
    <thead>
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Precio</th>
        <th scope="col">Foto</th>
      </tr>
    </thead>
    </tbody>`
  
  products.forEach(( element ) => {
    htmlToRender = htmlToRender + `
    <tr>
      <td>${element.title}</td>
      <td>${element.price}</td>
      <td><img src=${element.thumbnail} style="max-width: 50px; height: auto;"</td>
    </tr>` 
  })
  
  htmlToRender = htmlToRender + '</tbody></table>'
  
  return htmlToRender
}


// Chat

function chatMessages ( data ) {

  const denormalized = denormalizeData (data)
  
  let htmlChatToRender = `<div class="user">Compresion de mensajes: ${denormalized.percent}%</div>`
  
  denormalized.data.forEach(( element ) => {
    htmlChatToRender = htmlChatToRender + `
    <div>
      <div class="user">User: ${element.user.email} </div>
      <div class="date">${element.message.timestamp} </div>
      <div class="mensaje">${element.message.text} </div>
      <img src="${element.user.avatar}" alt="" width="30" height="30">
    </div>
    `
  })

  return htmlChatToRender
}


