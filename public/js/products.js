const allProducts = async () =>{
  let productsData
  await fetch(`http://localhost:${location.port}/api/productos`, {
    method: 'GET',
  })
  .then((response) => response.json())
  .then((data) => {
    productsData = data
  })
  return productsData
}

