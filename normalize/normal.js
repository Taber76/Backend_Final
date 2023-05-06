const { normalize, schema, denormalize } = require('normalizr')

const messageSchema = new schema.Entity('messages', {}, {idAttribute: 'timestamp'})
const userSchema = new schema.Entity('users', {}, {idAttribute: 'email'})
const chat = [
  {
    user: userSchema,
    message: messageSchema
  }
]


const normalizedData = (data) => {
  return normalize( data, chat )
}


const denormalizeData = (data) => {
  return denormalize(data.result, chat, data.entities)
}


module.exports = { normalizedData, denormalizeData } 