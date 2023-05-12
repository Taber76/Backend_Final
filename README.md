# Backend-Entrega-Final

## Consigna
Desarrollar backend para ecommerce implementado como API RESTful

## Implementacion
### Caracteristicas principales
- Framework **Express**.
- Servidor parametrizable mediante linea de comandos y archivo externo (puerto, tipo de persistencia, modo cluster o fork, etc.).
- Estructura de capas **DAO || DTO || Controller || Route || Server**.
- Persistencia **MongoDB** con cinco colecciones: **users, products, cart, orders y chat**.
- Manejo de session con **Passport-Local** y **Passport-JWT**.
- Canal de chat implementado con **Websocket**.
- Aviso por email al administrador.
- Vista de informacion de configuracion y de errores implementada con **Handlebars**.
### Frontend
Se ha implementado un frontend sencillo que permite interactuar con la mayoria de los metodos implementados en el servidor.
### Rutas
#### USERS
**GET: /session** Verifica si hay una sesion LocalPassport activa y devuelve los datos de usuario y un JWT.
**POST: /session/login** Recibe usuario y clave, inicia session LocalPassport y devuelve los datos de usuario y un JWT.
**POST: /session/register** Recibe los datos de usuarios y los almacena en la base de datos.
**POST: /session/logout** Cierra session de LocalPassport.
#### PRODUCTS
**GET: /api/productos** Devuelve todos los productos almacenados en la base de datos.
**GET: /api/productos/:id** Devuelve el producto con la id indicada.
**GET: /api/productos/categoria/:category** Devuelve todos los productos de la categoria indicada.
**POST: /api/productos/nuevo** Almacena los datos del producto en la base de datos (requiere JWT).
**PUT: /api/productos/:id** Modifica los datos del producto id (requiere JWT).
**DELETE: /api/productos/:id** Cambia el status "active" del producto a "false" (requiere JWT).