const authRouter = require('./auth/auth-router')
const childRouter = require('./children/child-router')
const foodRouter = require('./foods/food-router')
const restricted = require('../middleware/restricted')

module.exports = server => {
  server.use('/api/auth', authRouter)
  server.use('/api/child', restricted(), childRouter)
  // server.use('/api/foods', foodRouter)
}
