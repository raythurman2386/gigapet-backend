const db = require('../../data/db-config');

// Find
function find() {
  return db('parents').select("id", "username", "email");
}

// Findby
function findBy(filter) {
  return db('parents').where(filter).select("id", "username", "password", "email");
}

// add
async function add(user) {
  const [id] = await db('parents').insert(user).returning("*");
  return findBy({id});
}

// update
function update(id, user) {

}

// remove
async function remove(id) {
  let user = await findBy({ id });
  await findBy({ id }).del();
  return user  
}

module.exports = {
  find,
  findBy,
  add,
  update,
  remove
}