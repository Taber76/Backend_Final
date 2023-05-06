const { Router } = require('express')   
const infoRouter = Router()

const { infoTemplate } = require('../api/info')

const { logger } = require('../log/logger')

infoRouter.get('/', async (req, res) => {
  const tabla = infoTemplate()
  logger.info(`Ruta: /info, metodo: ${req.method}`)
  res.send(tabla)
})


module.exports = infoRouter