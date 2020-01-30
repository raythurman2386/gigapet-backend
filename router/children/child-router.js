const childRouter = require('express').Router()
// get -- this will get all of the parents children

childRouter
  .get('/', async (req, res, next) => {
    try {
      
    } catch (error) {
      next(error)
    }
  })

// getById
  .get('/:id', async (req, res, next) => {
    try {
      
    } catch (error) {
      next(error)
    }
  })

// addChild
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

module.exports = childRouter
