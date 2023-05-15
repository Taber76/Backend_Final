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
- Canal de chat implementado con **Websocket y GPT3.5**.
- Aviso por email al administrador.
- Vista de informacion de configuracion y de errores implementada con **Handlebars**.
### Frontend
Se ha implementado un frontend sencillo que permite interactuar con la mayoria de los metodos implementados en el servidor.
### Rutas
#### USERS
- **GET: /session** Verifica si hay una sesion LocalPassport activa y devuelve los datos de usuario y un JWT.
- **POST: /session/login** Recibe usuario y clave, inicia session LocalPassport y devuelve los datos de usuario y un JWT.
- **POST: /session/register** Recibe los datos de usuarios y los almacena en la base de datos.
- **POST: /session/logout** Cierra session de LocalPassport.
#### PRODUCTS
- **GET: /api/productos** Devuelve todos los productos almacenados en la base de datos.
- **GET: /api/productos/:id** Devuelve el producto con la id indicada.
- **GET: /api/productos/categoria/:category** Devuelve todos los productos de la categoria indicada.
- **POST: /api/productos/nuevo** Almacena los datos del producto en la base de datos (requiere JWT que no este inclido en la lista negra).
- **PUT: /api/productos/:id** Modifica los datos del producto id (requiere JWT que no este incluido en la lista negra).
- **DELETE: /api/productos/:id** Cambia el status "active" del producto a "false" (requiere JWT que no este incluido en la lista negra).
#### CART
- **GET: /api/carrito** Devuelve el carrito del usuario (requiere sesion activa de local.passport y JWT no incluido en la lista negra).
- **POST: /api/carrito** Agrega producto al carrito (requiere sesion activa de local.passport y JWT no incluido en la lista negra).
- **DELETE: /api/carrito/:id** Quita producto del carrito (requiere sesion activa de local.passport y JWT no incluido en la lista negra).
- **DELETE: /api/carrito** Borra todo el carrito (requiere sesion activa de local.passport y JWT no incluido en la lista negra).
- **POST: /api/carrito/order** Genera orden de compra (requiere sesion activa de local.passport y JWT no incluido en la lista negra).
#### CHAT
Ademas del canal de **WEBSOCKET** se han implementado dos rutas para los mensajes de chat.
- **GET: /api/chat/:username** Devuelve todos los mensajes de chat del usuario (requiere JWT no incluido en la lista negra).
- **POST: /api/chat/:msg** agrega un nuevo mensaje al chat del usuario (requiere sesion activa de local.passport y JWT no incluido en la lista negra).
#### INFO
- **GET: /info** Devuelve informacion de configuracion del servidor (implementada con Handlebars).
- **GET: /info/error** Devuelve informacion de error del servidor (implementada con Handlebars).
### Otras caracteristicas
- En esta implementacion la capa DTO no realiza ningun procesamiento de datos.
- Se ha creado la logica factory para elegir el tipo de persistencia (MongoDB por defecto), pero no se encuentra todalmente implementada la persistencia en memoria ya que quedo fuera del alcance del desafio.