const request = require('supertest')('http://localhost:8080')
const assert = require('chai').assert


describe('Product api test', () => {
  
  describe('GET /productos', () => { 
    it('Debe retornar array vacio si no hay productos cargados', async () => {
      const response = await request.get('/api/productos')
      assert.equal(response.status, 200, 'Se espera respuesta 200')
      assert.deepEqual(response.body, [], 'Se espera respuesta array vacio []')
    })

    it('Debe retornar todos los productos que hay cargados', async () => {
      await request.post('/api/productos-test-add/3') // agrego 3 productos al array
      const response = await request.get('/api/productos')
      assert.lengthOf(response.body, 3, 'El array no tiene el largo esperado')
      const expectedKeys = ['title', 'description', 'code', 'price', 'stock', 'thumbnail', 'id']
      assert.deepStrictEqual(Object.keys(response.body[0]), expectedKeys, 'El objeto no tiene todas las claves esperadas')
    })
  })

  describe('GET /productos/:id', () => {
    it('Debe regresar el producto con la id indicada', async () => {
      const id = (await request.get('/api/productos')).body[0].id    
      const response = await request.get(`/api/productos/${id}`)
      assert.equal(response.body.id, id, 'El producto no tiene el id esperado')
    })

    it('Debe regresar el mensaje producto no encontrado ante un request con id incorrecto', async () => {     
      const response = await request.get(`/api/productos/24`)
      assert.equal(response.status, 404, 'Se espera respuesta 404')
      assert.equal(response.body.error, 'producto no encontrado', 'No se recibio mensaje de error esperado')
    })
  })

  describe('DELETE /productos/:id', () => {
    it('Debe borrar el producto con la id indicada', async () => {
      const id = (await request.get('/api/productos')).body[0].id 
      
      const response = await request.delete(`/api/productos/${id}`)
      assert.equal(response.body.message, 'producto borrado', 'El mensaje de respuesta no es el esperado')
      
      const delCheck = await request.get(`/api/productos/${id}`)
      assert.equal(delCheck.body.error, 'producto no encontrado' , 'El producto no sido borrado de la base de datos')
    })

    it('Debe regresar mensaje producto no encontrado si se intenta borrar un producto que no existe', async () => {     
      const response = await request.get(`/api/productos/25`)
      assert.equal(response.status, 404, 'Se espera respuesta 404')
      assert.equal(response.body.error, 'producto no encontrado' , 'La respuesta de error no es la esperada')
    })
  })

  describe('POST /productos/nuevo', () => {
    it('No se debe agregar producto si los datos del nuevo producto no son correctos', async () => {
      let response = await request.post(`/api/productos/nuevo`)
      assert.equal(response.status, 400, 'Se espera respuesta 400')
      assert.equal(response.body.msg, 'producto no guardado', 'Se ha ingresado producto vacio a la base de datos')

      response = await request.post(`/api/productos/nuevo`).send({
        title: 123456789,
        description: 123456789,
        code: '', // se debe asignar un valor a todos los campos
        price: 123456789,
        stock: 123456789,
        thumbnail: '123456789.jpg'
      })
      assert.equal(response.status, 400, 'Se espera respuesta 400')
      assert.equal(response.body.msg, 'producto no guardado', 'Se ha ingresado producto con datos faltantes a la base de datos')

      response = await request.post(`/api/productos/nuevo`).send({
        title: 123456789,
        description: 123456789,
        code: 123456789, 
        price: 123456789,
        stock: 123456789,
        thumbnail: '123456789.js' // se debe proporcionar archivo con formato de imagen
      })
      assert.equal(response.status, 400, 'Se espera respuesta 400')
      assert.equal(response.body.msg, 'producto no guardado', 'Se ha ingresado producto con una imagen incorrecta a la base de datos')
     })
  
    it('Debe retornar mensaje producto guardado si el producto se ha almacenado correctamente', async () => {
      const response = await request.post(`/api/productos/nuevo`).send({
        title: 123456789,
        description: 123456789,
        code: 123456789, 
        price: 123456789,
        stock: 123456789,
        thumbnail: '123456789.jpg'
      })
      assert.equal(response.status, 200, 'Se espera respuesta 200')
      assert.equal(response.body.msg, 'producto guardado', 'Mensaje no es el esperado')
    })
  })
  
})