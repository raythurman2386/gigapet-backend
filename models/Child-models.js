const db = require('../data/db-config')
const { Food, Monster } = require('./Model')

// findById
function findBy(filter) {
  return db('child')
    .where(filter)
    .returning('*')
}

async function findById(id) {
  const child_food = await Food.findBy({ child_id: id })
  const child = await findBy({ id }).first()
  const monster = await Monster.findBy({ id: child.monster_id })
  return {
    child,
    child_food,
    monster
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
