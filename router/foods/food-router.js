const foodRouter = require('express').Router()
const { Food } = require('../../models/Model')

foodRouter
  // addFood
  .post('/', async (req, res, next) => {
    try {
      const newFood = await Food.add({ ...req.body })
      return res.status(201).json(newFood)
    } catch (error) {
      next(error)
    }
  })

  // update
  .put('/:id', async (req, res, next) => {
    try {
      await Food.update(req.params.id, req.body)
      return res.status(201).json({ message: 'Food Updated' })
    } catch (error) {
      next(error)
    }
  })

  // delete
  .delete('/:id', async (req, res, next) => {
    try {
      await Food.remove(req.params.id)
      return res.status(200).json({ message: 'Food Deleted' })
    } catch (error) {
      next(error)
    }
  })

module.exports = foodRouter
