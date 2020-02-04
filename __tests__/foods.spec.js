const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/db-config')

beforeEach(async () => {
  await db.seed.run()
})

describe('food routes', () => {
  it('should get food by id', async () => {
    const login = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .get('/api/foods/1')
      .set('authorization', login.body.token)

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.id).toBe(1)
  })

  it('should fail to get food by id', async () => {
    const login = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .get('/api/foods/111')
      .set('authorization', login.body.token)

    expect(res.status).toBe(404)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/There is no food by that ID/i)
  })

  it('should add a food', async () => {
    const login = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .post('/api/foods')
      .send({
        name: 'new',
        child_id: 1,
        type: 'fruit',
        servings: 5
      })
      .set('authorization', login.body.token)

    expect(res.status).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body[0]).toBe(6)
  })

  it('should fail to add a food', async () => {
    const login = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .post('/api/foods')
      .send({
        name: 'new',
        child_id: 1,
        type: 'fruit'
      })
      .set('authorization', login.body.token)

    expect(res.status).toBe(400)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/Please send all required fields/i)
  })

  it('should update a food by id', async () => {
    const login = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .put('/api/foods/1')
      .send({
        name: 'update',
        child_id: 1,
        type: 'fruit',
        servings: 5
      })
      .set('authorization', login.body.token)

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/food updated/i)
  })

  it('should fail to update a food by id', async () => {
    const login = await supertest(server)
      .post('/api/auth/login')
      .send({
        username: 'test1',
        password: 'test'
      })

    const res = await supertest(server)
      .put('/api/foods/111')
      .send({
        name: 'update',
        child_id: 1,
        type: 'fruit',
        servings: 5
      })
      .set('authorization', login.body.token)

    expect(res.status).toBe(404)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/There is no food by that ID/i)
  })

  it('should delete a food by id', async () => {
    const login = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .delete('/api/foods/1')
      .set('authorization', login.body.token)

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/food deleted/i)
  })

  it('should fail to delete a food by id', async () => {
    const login = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .delete('/api/foods/111')
      .set('authorization', login.body.token)

    expect(res.status).toBe(404)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/There is no food by that ID/i)
  })
})
