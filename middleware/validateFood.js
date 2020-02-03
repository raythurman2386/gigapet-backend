const { Food } = require('../models/Model')

function validateFoodId() {
  return async (req, res, next) => {
    const [food] = await Food.findBy({ id: req.params.id })

    if (!food) {
      return res.status(404).json({
        message: 'There is no food by that ID'
      })
    }

    req.food = food
    next()
  }
}

module.exports = {
  validateFoodId
}
