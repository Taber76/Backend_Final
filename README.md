# Backend-Testeo-Funcionalidades

## Consigna
1) Revisar en forma completa el proyecto entregable que venimos realizando, refactorizando y reformando todo lo necesario para llegar al esquema de servidor API RESTful en capas planteado en esta clase.
2) Asegurarse de dejar al servidor bien estructurado con su ruteo / controlador, negocio, validaciones, persistencia y configuraciones (preferentemente utilizando en la codificación clases de ECMAScript).

### No hace falta realizar un cliente ya que utilizaremos tests para verificar el correcto funcionamiento de las funcionalidades desarrolladas.
### AXIOS
3) Desarrollar un cliente HTTP de pruebas que utilice Axios para enviar peticiones, y realizar un test de la funcionalidad hacia la API Rest de productos, verificando la correcta lectura de productos disponibles, incorporación de nuevos productos, modificación y borrado.
4) Realizar el cliente en un módulo independiente y desde un código aparte generar las peticiones correspondientes, revisando los resultados desde la base de datos y en la respuesta del servidor obtenida en el cliente HTTP.

### MOCHA 
5) Luego, realizar las mismas pruebas, a través de un código de test apropiado, que utilice mocha, chai y Supertest, para probar cada uno de los métodos HTTP de la API Rest de productos.
6) Escribir una suite de test para verificar si las respuestas a la lectura, incorporación, modificación y borrado de productos son las apropiadas. Generar un reporte con los resultados obtenidos de la salida del test.



## Entrega
La estructura del servidor es la siguiente:
**DAO || DTO || Controller || Route || Server**.

### AXIOS
En la carpeta _AXIOS se ha implementado el script axios.js que puede realizar las siguientes peticiones:
#### method: 'post', url: `http://localhost:8080/api/productos/nuevo`
#### method: 'get', url: `http://localhost:8080/api/productos`
#### method: 'put', url: `http://localhost:8080/api/productos/${id}`
#### method: 'delete', url: `http://localhost:8080/api/productos/${id}`

### MOCHA || CHAI || SUPERTEST
#### CHAI
Se ha implementado /test/controllers.products.test.js para testear las funciones controller: **getAllProductsController, newProductController, getProductByIdController y delProductByIdController.**
Se ha generado un reporte /test/controllerstest.txt con el comando "npx mocha > ./test/controllerstest.txt"

#### CHAI + SUPERTEST
Se ha implementado /test/integration/api.products.test.js para generar las peticiones HTTP a la api de productos.
Se ha generado el reporte /test/integration/supertest.txt con el comando "npm test"
  
