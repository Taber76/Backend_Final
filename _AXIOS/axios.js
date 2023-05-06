const axios = require('axios')
const config = require('./config')

console.log('Comandos:\n-l 1 para list\n-a 1 para agregar 20\n-d 1 para borrar\n-m para modificar\n------------------\n------------------')

const randomNumber = ( max ) => {
  return Math.floor(Math.random() * max) + 1
}


const add = async() => {
  for (let i = 1; i <= 20; i++ ) {
    const response = await axios({
      method: 'post',
      url: `http://localhost:8080/api/productos/nuevo`,
      data: {
        title: randomNumber(100000),
        description: randomNumber(200000),
        code: randomNumber(400),
        price: randomNumber(600000),
        stock: randomNumber(3000),
        thumbnail: randomNumber(200000000).toString() + '.jpg'
      }
    })
    
  }
  console.log('ADD---------------------')
}


const list = async() => {
  const response = await axios({
    method: 'get',
    url: `http://localhost:8080/api/productos`,
  })
  console.log(`LIST de ${response.data.length} elementos -----------------\nPrimer elemento:`)
  console.log(response.data[0])
  if (config.del == 1) {
    del( response.data[0].id )
  }
  if (config.mod == 1 ) {
    modify( response.data[0].id )
  }
}


const modify = async( id ) => {
  const response = await axios({
    method: 'put',
    url: `http://localhost:8080/api/productos/${id}`,
    data: {
      title: randomNumber(100000),
      description: randomNumber(200000),
      code: randomNumber(400),
      price: randomNumber(600000),
      stock: randomNumber(3000),
      thumbnail: randomNumber(200000000).toString() + '.jpg'
    }
  })
  console.log(response.data)
}


const del = async( id ) => {
  const response = await axios({
    method: 'delete',
    url: `http://localhost:8080/api/productos/${id}`,
  })
  console.log('DELETE -----------------------------------')
  console.log(response.data)
}



//-----------------------------------------------------------//

if (config.add == 1) {
  add()
}

if (config.list == 1 || config.del == 1 || config.mod == 1) {
  list()
}

