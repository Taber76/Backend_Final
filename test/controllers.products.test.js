const assert = require('chai').assert
const { addProducts } = require('./auxfunction')
const { getAllProductsController, newProductController, getProductByIdController, delProductByIdController } = require('../controllers/productsController')


describe('Product controller', () => {
  
  describe('getAllProductsController', () => { 
    it('Debe retornar array vacio si no hay productos cargados', async () => {
      const result = await getAllProductsController()
      assert.deepEqual(result, [], 'No pasa el test de array vacio')
    })

    it('Debe retornar todos los productos que hay cargados', async () => {
      await addProducts(3)
      const result = await getAllProductsController()
      assert.lengthOf(result, 3, 'El array no tiene el largo esperado')
      const expectedKeys = ['title', 'description', 'code', 'price', 'stock', 'thumbnail', 'id']
      assert.deepStrictEqual(Object.keys(result[0]), expectedKeys, 'El objeto no tiene todas las claves esperadas')
    })
  })

  describe('getProductByIdController', () => {
    it('Debe regresar el producto con la id indicada', async () => {
      const id = (await getAllProductsController())[0].id    
      const result = await getProductByIdController ( id )
      assert.equal(result.id, id, 'El producto no tiene el id esperado')
    })

    it('Debe regresar el valor null ante un request con id incorrecto', async () => {     
      const result = await getProductByIdController ('id no valida')
      assert.equal(result, null, 'El producto no es nulo')
    })
  })

  describe('delProductbyIdController', () => {
    it('Debe borrar el producto con la id indicada', async () => {
      const id = (await getAllProductsController())[0].id
      const result = await delProductByIdController ( id )
      assert.equal(result, true, 'El producto no ha sido borrado')
      const delCheck = await getProductByIdController (id)
      assert.equal(delCheck, null, 'El producto no sido borrado de la base de datos')
    })

    it('Debe regresar false cuando se intenta borrar un producto que no existe', async () => {     
      const result = await delProductByIdController ('id no valida')
      assert.equal(result, false, 'Debe retornar false cuando no existe el producto que se quiere borrar')
    })
  })

  describe('newProductController', () => {
    it('Debe retornar false si los datos del nuevo producto no son correctos', async () => {
      let result = await newProductController({})
      assert.equal(result, false, 'Se ha ingresado producto vacio a la base de datos')

      result = await newProductController({
        title: 123456789,
        description: 123456789,
        code: '', // se debe asignar un valor a todos los campos
        price: 123456789,
        stock: 123456789,
        thumbnail: '123456789.jpg'
      })
      assert.equal(result, false, 'Se ha ingresado producto con datos faltantes a la base de datos')

      result = await newProductController({
        title: 123456789,
        description: 123456789,
        code: 123456789, 
        price: 123456789,
        stock: 123456789,
        thumbnail: '123456789.js' // se debe proporcionar archivo con formato de imagen
      })
      assert.equal(result, false, 'Se ha ingresado producto con imagen incorrecta a la base de datos')
    })
  
    it('Debe retornar true si el producto se ha almacenado correctamente', async () => {
      const result = await newProductController({
        title: 123456789,
        description: 123456789,
        code: 123456789, 
        price: 123456789,
        stock: 123456789,
        thumbnail: '123456789.jpg'
      })
      assert.equal(result, true, 'No se ha ingresado producto a la base de datos')
    })
  })
  
})