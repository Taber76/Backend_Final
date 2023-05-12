const { 
    getAllProductsDto,
    getProductByIdDto,
    getProductsByCategoryDto,
    delProductByIdDto,
    addNewProductDto,
    modifyProductByIdDto
  } = require('../DTO/productDto')

const { validateProductData } = require('../controllers/valitationFunctions')


const newProductController = async ( productToAdd ) => {
  if ( validateProductData( productToAdd ) ) {
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

const getProductsByCategoryController = async( category ) => {
  const products = await getProductsByCategoryDto( category )
  return products
}

const delProductByIdController = async( id ) => {
  const response = await delProductByIdDto( id )
  return response
}

const modifyProductByIdController = async( id, item ) => {
  const response = await modifyProductByIdDto( id, item )
  return response
}


module.exports = { 
  newProductController,
  getAllProductsController,
  getProductByIdController,
  getProductsByCategoryController,
  delProductByIdController,
  modifyProductByIdController
}