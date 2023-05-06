const { getAllProductsDto, getProductByIdDto, delProductByIdDto, addNewProductDto, modifyProductByIdDto } = require('../DTO/productDto')


const validateObject = ( objeto ) => { // retorna true si hay algun campo vacio
  return Object.values(objeto).includes('')
}


const imageUrl = ( url ) => {
  const ext = /(\.jpg|\.jpeg|\.png|\.gif)$/i
  return ext.test( url )
}


const newProductController = async ( productToAdd ) => {
  if ( !validateObject( productToAdd ) & imageUrl ( productToAdd.thumbnail )) {
    await addNewProductDto ( productToAdd )
    return true
  }
  return false  
}

const getAllProductsController = async() => {
  const products = await getAllProductsDto()
  return products
}

const getProductByIdController = async( id ) => {
  const product = await getProductByIdDto( id )
  return product
}

const delProductByIdController = async( id ) => {
  const response = await delProductByIdDto( id )
  return response
}

const modifyProductByIdController = async( id, item ) => {
  const response = await modifyProductByIdDto( id, item )
  return response
}


module.exports = { newProductController, getAllProductsController, getProductByIdController, delProductByIdController, modifyProductByIdController }