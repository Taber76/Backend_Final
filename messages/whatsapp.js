const { msgaccountsid, msgauthtoken, whatsappnumber } = require('../config/environment');

const client = require('twilio')(msgaccountsid, msgauthtoken);


module.exports.sendWhatsapp = async ( waMsg ) => {
  client.messages.create({
        body: waMsg.body,
        from: whatsappnumber,
        to: `whatsapp:${waMsg.to}`
    })
    .then(message => console.log(message.sid))
}

    
