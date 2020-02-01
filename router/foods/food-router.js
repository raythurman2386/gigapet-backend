const foodRouter = require('express').Router()
const db = require('../../models/Food-models')

foodRouter
  // addFood
  .post('/', async (req, res, next) => {
    try {
      const newFood = await db.add({ ...req.body })
      return res.status(201).json(newFood)
    } catch (error) {
      next(error)
    }
  })

  // update
  .put('/:id', async (req, res, next) => {
    try {
      await db.update(req.params.id, req.body)
      return res.status(201).json({ message: 'Food Updated' })
    } catch (error) {
      next(error)
    }
  })

  // delete
  .delete('/:id', async (req, res, next) => {
    try {
      await db.remove(req.params.id)
      return res.status(200).json({ message: 'Food Deleted' })
    } catch (error) {
      next(error)
    }
  })

module.exports = foodRouter
