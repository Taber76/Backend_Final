const nodemailer = require('nodemailer')
const { emailservice, emailport, emailuser, emailpass } = require('../config/environment')

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: emailservice,
  port: Number(emailport),
  auth: {
    user: emailuser,
    pass: emailpass
  },
  tls: {
    rejectUnauthorized: false
  }
})


module.exports.sendEmail = async ( email ) => {
  const info = await transporter.sendMail({
    from: email.from,
    to: email.to,
    subject: email.subject,
    text: email.text,
    html: email.html
  })
  return info
}
/*

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
*/


