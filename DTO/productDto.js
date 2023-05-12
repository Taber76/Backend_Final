const getDao = require('../DAO/factory')


const getAllProductsDto = async() => {
  const products = await (await getDao()).products
  const allProducts = await products.getAll()
  return allProducts
}

const getProductByIdDto = async( id ) => {
  const products = await (await getDao()).products
  const productById = await products.getById( id )
  return productById
}

const getProductsByCategoryDto = async( category ) => {
  const products = await (await getDao()).products
  const productByCategory = await products.getByCategory( category )
  return productByCategory
}

const delProductByIdDto = async( id ) => {
  const products = await (await getDao()).products
  const response = await products.deleteById( id )
  return response
}


const delAllProductsDto = async() => {
  const products = await (await getDao()).products
  await products.deleteAll()
  return 
}

const addNewProductDto = async( item ) => {
  const products = await (await getDao()).products
  await products.add( item )
  return 
}

const modifyProductByIdDto = async( id, item ) => {
  const products = await (await getDao()).products
  const response = await products.modifyById( id, item )
  return response
}


module.exports = { 
  getAllProductsDto,
  getProductByIdDto,
  getProductsByCategoryDto,
  delProductByIdDto,
  delAllProductsDto,
  addNewProductDto,
  modifyProductByIdDto
 }

