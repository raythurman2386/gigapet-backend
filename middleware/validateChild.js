const db = require('../models/Child-models')

function validateChildId() {
  return async (req, res, next) => {
    try {
      const child = await db.findById(req.params.id)
      req.child = child
      next()
    } catch (error) {
      return res.status(404).json({
        message: 'There is no child by that ID'
      })
    }
  }
}

module.exports = {
  validateChildId
}
