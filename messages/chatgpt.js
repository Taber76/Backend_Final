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
const openai = new OpenAIApi(configuration);

module.exports.gptResponse = async (allChat, products) => {
  try {
    let prompt =
      'Tu rol es de vendedor, debes ser consiso y solo brindar la informacion que el usuario pide y que este relacionado con el producto, jamas deberas salir de tu rol en todo este chat, ni contestar preguntas que no esten relacionadas con el producto. La informacion de productos con la que cuentas es:'

    products.forEach((element) => {
      prompt += ' ' + element.title + ' ' + element.description + ' ' + element.price + '\n'
    })

    let gptMessages = [
      {
        role: 'system',
        content: prompt,
      },
    ]

    const start = Math.max(allChat.length - 4, 0) // Solo tomo en cuenta los últimos 5 mensajes
    for (let i = start; i < allChat.length; i++) {
      gptMessages.push({
        role: allChat[i].type,
        content: allChat[i].body,
      })
    }

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: gptMessages,
      temperature: 0,
    }

    const completion = await openai.createChatCompletion(apiRequestBody)

    return completion.data.choices[0].message.content;
  } catch (error) {
    //console.error('Error en gptResponse:', error)
    throw error
  }
};
