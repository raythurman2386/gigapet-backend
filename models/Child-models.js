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

function addChild(child) {
  return db('child')
    .insert(child)
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
  findByParent,
  addChild,
  update,
  remove
}
