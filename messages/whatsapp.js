const { msgaccountsid, msgauthtoken, whatsappnumber } = require('../config/environment');
const { logger, loggererr } = require('../log/logger')

const client = require('twilio')(msgaccountsid, msgauthtoken);


module.exports.sendWhatsapp = async ( waMsg ) => {
  client.messages.create({
        body: waMsg.body,
        from: whatsappnumber,
        to: `whatsapp:${waMsg.to}`
    })
    .then(message => logger.info(message.sid))
}

    
