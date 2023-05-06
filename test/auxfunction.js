const { newProductController } = require('../controllers/productsController')


const randomNumber = ( max ) => {
  return Math.floor(Math.random() * max) + 1
}

const addProducts = async ( numberOfProducts ) => {
  for (let i = 1; i <= numberOfProducts; i++ ) {
    await newProductController({
        title: randomNumber(100000),
        description: randomNumber(200000),
        code: randomNumber(400),
        price: randomNumber(600000),
        stock: randomNumber(3000),
        thumbnail: randomNumber(200000000).toString() + '.jpg'
    })     
  }
}

module.exports = { addProducts }