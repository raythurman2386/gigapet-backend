const rateLimit = require('express-rate-limit')

const accountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many attempts, please try again later'
})

module.exports = accountLimiter
