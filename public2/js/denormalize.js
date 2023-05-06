const messageSchema = new normalizr.schema.Entity('messages', {}, {idAttribute: 'timestamp'})
const userSchema = new normalizr.schema.Entity('users', {}, {idAttribute: 'email'})
const chat = [
  {
    user: userSchema,
    message: messageSchema
  }
]


function denormalizeData (data) {

  const dataDenormalized = normalizr.denormalize(data.result, chat, data.entities)
  const compressedPercent = Math.round( JSON.stringify(data, null, 2).length / JSON.stringify(dataDenormalized, null, 2).length * 100)
      
  return { 
    data: dataDenormalized,
    percent: compressedPercent 
  }
}




