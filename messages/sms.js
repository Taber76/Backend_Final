const twilio = require('twilio')
const { msgaccountsid, msgauthtoken, smsnumber } = require('../config/environment')

module.exports.sendSMS = async ( sms ) => {
  const client = twilio( msgaccountsid, msgauthtoken )
  const message = await client.messages.create({
    body: sms.body,
    from: smsnumber,
    to: sms.number
  })
  return
}
