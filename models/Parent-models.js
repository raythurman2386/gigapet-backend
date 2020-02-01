const db = require('../data/db-config')

// Find
function find() {
  return db('parents').select('id', 'username', 'email')
}

// Findby
function findBy(filter) {
  return db('parents')
    .where(filter)
    .first()
}

// findById
function findById(id) {
  return db('parents as P')
    .join('child as C', 'C.parent_id', 'P.id')
    .where({ 'P.id': id })
    .select('P.id', 'P.username', 'P.email', 'C.id as child_id', 'C.name')
}

// add
async function add(user) {
  const [id] = await db('parents')
    .insert(user)
    .returning('*')
  return findById(id)
}

// update
function update(id, user) {
  return db('parents')
    .where({ id })
    .update(user)
    .returning('*')
}

// remove
function remove(id) {
  return findBy({ id }).del()
}

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove
}
