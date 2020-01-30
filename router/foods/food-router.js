const foodRouter = require('express').Router()

foodRouter
// Gets all of a childs food
  .get('/', async (req, res, next) => {
    try {
      
    } catch (error) {
      next(error)
    }
  })

// addFood
  .post('/', async (req, res, next) => {
    try {
      
    } catch (error) {
      next(error)
    }
  })

// update
  .put('/:id', async (req, res, next) => {
    try {
      
    } catch (error) {
      next(error)
    }
  })

// delete
  .delete('/:id', async (req, res, next) => {
    try {
      
    } catch (error) {
      next(error)
    }
  })

module.exports = foodRouter
