const { gptapikey } = require('../config/environment')

const {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest,
  Configuration,
  OpenAIApi,
} = require('openai')

const configuration = new Configuration({
  apiKey: gptapikey,
})
const openai = new OpenAIApi(configuration)

module.exports.gtpResponse = async( allChat, products ) => {
  
  let prompt = 'Tu rol es de vendedor, debes ser consiso y solo brindar la informacion que el usuario te pide, jamas deberas salir de tu rol en todo este chat. La informacion de productos con la que cuentas es:'

  products.forEach(element => {
    prompt = prompt + ' ' + element.title + ' ' + element.description + ' ' + element.price + '\n'
  })  

  let gptMesagges = [{
    role: "system",
    content: prompt
  }]

  const start = Math.max(allChat.length - 4, 0)
  for (let i = start; i < allChat.length; i++) {
    gptMesagges.push({
      role: allChat[i].type,
      content: allChat[i].body
    })
  }

  const apiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: gptMesagges,
    temperature: 0,
  }
  const completion = await openai.createChatCompletion(apiRequestBody)
  
  return completion.data.choices[0].message.content
}
  
