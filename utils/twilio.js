require('dotenv').config()
const tw = require('twilio')

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN

const client = new tw(accountSid, authToken)

function twilio() {
  return (req, res, next) => {
    client.messages
      .create({
        body: 'Hello from Gigapet',
        to: `+1${req.body.phone_number}`,
        from: '+17748085108'
      })
      .then(message => console.log(message.sid), next())
  }
}

module.exports = twilio
