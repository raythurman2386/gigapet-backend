const childRouter = require('express').Router()
const db = require('../../models/Child-models')
const {
  validateChildId,
  validateChildInputs
} = require('../../middleware/validateChild')

childRouter
  .get('/', async (req, res, next) => {
    // this returns only the logged in parents children
    try {
      const children = await db.findBy({ parent_id: req.userId })
      return res.status(200).json(children)
    } catch (error) {
      next(error)
    }
  })

  // getById
  .get('/:id', validateChildId(), async (req, res, next) => {
    try {
      return res.status(200).json(req.child)
    } catch (error) {
      next(error)
    }
  })

  // addChild
  .post('/', validateChildInputs(), async (req, res, next) => {
    try {
      const newChild = await db.addChild({ ...req.body, parent_id: req.userId })
      return res.status(201).json(newChild)
    } catch (error) {
      next(error)
    }
  })

  // update
  .put('/:id', validateChildId(), async (req, res, next) => {
    try {
      await db.update(req.params.id, req.body)
      return res.status(200).json({ message: 'Child Updated' })
    } catch (error) {
      next(error)
    }
  })

  // delete
  .delete('/:id', validateChildId(), async (req, res, next) => {
    try {
      const response = await db.remove(req.params.id)
      res.json(response)
    } catch (error) {
      next(error)
    }
  })

module.exports = childRouter
