const db = require('../data/db-config')
const foods = require('./Food-models')

// findById
function findBy(filter) {
  return db('child')
    .where(filter)
    .returning('*')
}

async function findById(id) {
  const childFood = await foods.findByChild(id)
  const child = await findBy({ id }).first()
  return {
    child,
    childFood
  }
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
  findBy,
  findById,
  addChild,
  update,
  remove
}
