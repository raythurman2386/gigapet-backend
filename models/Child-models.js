const db = require('../data/db-config')

// find
function find() {
  return db('child')
}

// findById
function findBy(filter) {
  return db('child')
    .where(filter)
    .returning('*')
}

// findByParent
function findByParent(id) {
  return db('child')
    .where({ parent_id: id })
    .returning('*')
}

// update
function update(id, changes) {
  return db('child')
    .where({ id })
    .update(changes)
    .returning('*')
}

// delete
function remove(id) {
  return db('child')
    .where({ id })
    .del()
}

module.exports = {
  find,
  findBy,
  findById,
  findByParent,
  update,
  remove
}
