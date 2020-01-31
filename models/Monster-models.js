const db = require('../data/db-config')

function findBy(filter) {
  return db('monsters')
    .where(filter)
    .returning('*')
}

module.exports = { findBy }
