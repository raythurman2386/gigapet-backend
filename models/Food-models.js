const db = require('../data/db-config')

function add(food) {
  return db('foods').insert(food)
}

// findById
function findBy(filter) {
  return db('foods')
    .where(filter)
    .returning('*')
}

// findByChild
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

module.exports = {
  add,
  findBy,
  findByChild,
  update,
  remove
}
