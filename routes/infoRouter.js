const { Router } = require('express')   
const infoRouter = Router()

const { config } = require('../config/environment')
const { mongocredentialsecommerce, adminmail, usersessiontime } = require('../config/environment')

const PORT = ( config.port ) ? config.port : 8080

infoRouter.get('/', async (req, res) => {
  res.render('info', {
    port: PORT,
    url: mongocredentialsecommerce.split('@')[1].split('?')[0],
    email: adminmail,
    time: usersessiontime,
    })
})

infoRouter.get('/:error', (req, res) => {
  res.render('error', { error: req.params.error })
})


module.exports = infoRouter