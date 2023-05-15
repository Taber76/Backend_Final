const mongoose = require('mongoose')
const { Schema, model } = mongoose


const productSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  active: { type: Boolean, default: true }
})


const cartSchema = new Schema({
    username: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    products: { type: Array, required: true }, // [{ number:..., id:... }]
    sendaddress: { type: String, required: true },
})

const orderSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  products: { type: Array, required: true }, // [{ number:..., id:... }]
  username: { type: String, required: true },
  sendaddress: { type: String, required: true },
  ordernumber: { type: Number, required: true },
  state: { type: String, default: 'generada'}
})


const userSchema = new Schema({
  username: { type: String, required: true },
  password: {type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  photo: { type: String, required: true },
})


const chatSchema = new Schema({
  username: { type: String, required: true },
  type: { type: String, default: 'user' }, // 'user' o 'assistant'
  timestamp: { type: Date, default: Date.now },
  body: { type: String, required: true } 
})


const productModel = model('Product', productSchema)
const cartModel = model('Cart', cartSchema)
const orderModel = model('Order', orderSchema)
const chatModel = model('Chat', chatSchema)
const userModel = model('User', userSchema)

module.exports = { productModel, cartModel, orderModel, chatModel, userModel }

