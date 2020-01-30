const db = require('../data/db-config')

// find
function find() {
  return db('foods')
}

// findById
function findBy(filter) {
  return db('foods')
    .where(filter)
    .returning('*')
}

// findByParent
function findByChild(id) {
  return db('foods')
    .where({ child_id: id })
    .returning('*')
}

// update
function update(id, changes) {
  return db('foods')
    .where({ id })
    .update(changes)
    .returning('*')
}

// delete
function remove(id) {
  return db('foods')
    .where({ id })
    .del()
}
