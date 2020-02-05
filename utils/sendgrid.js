require('dotenv').config()

function sendgrid() {
  return (req, res, next) => {
    const sgMail = require('@sendgrid/mail')

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: req.body.email,
      from: 'gigapethelp@gigapet.com',
      subject: 'Reset Gigapet Password',
      text: 'Click below to reset your password',
      html:
        '<p>Click below to reset your password</p><a href="https://gigapet-backend.herokuapp.com/api/auth/reset-password">Reset Password</a>'
    }
    sgMail.send(msg)

    next()
  }
}

module.exports = sendgrid
