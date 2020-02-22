const authRouter = require('./auth/auth-router')
const parentRouter = require('./parent/parent-router')
const childRouter = require('./children/child-router')
const foodRouter = require('./foods/food-router')
const restricted = require('../middleware/restricted')
const graphqlController = require('../controller/graphqlController')

module.exports = server => {
  server.use('/api/auth', authRouter)
  server.use('/graphql', graphqlController)
  server.use('/api/parent', restricted(), parentRouter)
  server.use('/api/child', restricted(), childRouter)
  server.use('/api/foods', restricted(), foodRouter)
}
