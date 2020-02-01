const parentRouter = require('express').Router()
const db = require('../../models/Parent-models')

parentRouter
  // .get('/', async (req, res, next) => {
  //   const parents = await db.find()
  //   return res.status(200).json(parents)
  // })

  .get('/:id', async (req, res, next) => {
    try {
      const parent = await db.findById(req.params.id).first()
      return res.status(200).json(parent)
    } catch (error) {
      next(error)
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const newParent = await db.update(req.params.id, req.body)
      return res.status(200).json(newParent)
    } catch (error) {
      next(error)
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      await db.remove(req.params.id)
      return res.status(201).json({ message: 'User deleted' })
    } catch (error) {
      next(error)
    }
  })

module.exports = parentRouter
