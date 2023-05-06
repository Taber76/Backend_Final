async function userLogged() { //verifica si hay usuario logeeado
  let userData
  await fetch(`http://localhost:${location.port}/session/`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      userData = data
    })
  return userData
}


function userLoggedTemplates(userData, productsData ) { // genera las vistas para usuario logueado
  document.querySelector('#sessionUser').innerHTML = logOkTemplate( userData )
  document.querySelector('#productList').innerHTML = productsTable( productsData )
}


async function cartView( userData, productsData ) { // muestra el carrito del usuario
  let userCart
  await fetch(`http://localhost:${location.port}/api/carrito/${userData.username}`, {
    method: 'GET',
  })
  .then((response) => response.json())
  .then((data) => {
      userCart = data.cart[0].cart
      document.getElementById("productList").innerHTML = cartViewTemplate( userCart, productsData )
      
      document.getElementById("homeBtn").addEventListener("click", ev => {
        location.reload()
      })
      
      document.getElementById("buyBtn").addEventListener("click", async ev => {
        await fetch(`http://localhost:${location.port}/api/carrito/compra/${userData.username}`, {
          method: 'GET',
        })
        .then(() => {
          toast('Su compra ha sido realizada', "#00800", "#ff90ee90")
          setTimeout(() => {
            location.reload()
          },2000)  
        })
      })

    })

  return 
}



async function userLogout( user ){ // cierra secion de usuario
  fetch(`http://localhost:${location.port}/session/logout/`, {
    method: 'POST',
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data.message)
  })
  document.querySelector('#sessionUser').innerHTML = logByeTemplate( user )
  await setTimeout(() => {
    location.reload()
  }, 2000)
}


async function productAddToCart ( productId, username ) {
  await fetch(`http://localhost:${location.port}/api/carrito/addproduct/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      productId: productId
    })
  })
  toast('Producto agregado al carrito', "#00800", "#ff90ee90")
  return 
}


function logged( userData, productsData ){ //ejecuta las acciones necesarias luego de logueado el usuario
  userLoggedTemplates( userData, productsData )
  // captura eventos para agregar productos al carrito
  document.getElementById("productList").addEventListener("click", ev => {
    const productId = ev.target.id
    if ( productId.length == 24 ) {
      productAddToCart( productId, userData.username )
    }
  })

  document.getElementById("logoutBtn").addEventListener("click", ev => {
    userLogout( userData.username )
  })

  document.getElementById("cartBtn").addEventListener("click", ev => {
    cartView( userData, productsData ) // <-- session.js

  })
}


