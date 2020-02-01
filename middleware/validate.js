const { Parent } = require('../models/Model')
/* check for all credentials for register
 * parent_name
 * username
 * password
 * email
 *
 * Check to see if email is used
 *
 * Check to see if username is used
 */
function validateRegister() {
  return (req, res, next) => {
    if (!req.body.parent_name) {
      return res.status(404).json({ message: 'Please supply a name' })
    }

    if (!req.body.username) {
      return res.status(404).json({ message: 'Please supply a username' })
    }

    if (!req.body.password) {
      return res.status(404).json({ message: 'Please supply a password' })
    }

    if (!req.body.email) {
      return res.status(404).json({ message: 'Please supply a email' })
    }

    next()
  }
}

/* check for credentials on login
 * username
 * password
 */
function validateLogin() {
  return (req, res, next) => {
    if (!req.body.username) {
      return res.status(404).json({ message: 'Please supply a username' })
    }

    if (!req.body.password) {
      return res.status(404).json({ message: 'Please supply a password' })
    }

    next()
  }
}

/* check for id
 * make sure the id exists
 */
function validateParentId() {
  return async (req, res, next) => {
    try {
      const [parent] = await Parent.findBy({ id: req.params.id })
      if (!parent) {
        return res.status(404).json({ message: 'Parent not found' })
      } else {
        let { password, ...rest } = parent
        req.parent = { ...rest }
        next()
      }
    } catch (error) {
      next(error)
    }
  }
}

/*
 * Check for all fields on update
 */

module.exports = {
  validateRegister,
  validateLogin,
  validateParentId
}
