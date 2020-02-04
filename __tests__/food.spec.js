const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/db-config')

beforeEach(async () => {
  return await db.seed.run()
})

describe('food routes', () => {
  test('should get food by id', async () => {
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

  test('should add a food', async () => {
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

  test('should update a food by id', async () => {
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

    expect(res.status).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/food updated/i)
  })

  test('should delete a food by id', async () => {
    const login = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .delete('/api/foods/1')
      .set('authorization', login.body.token)

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
  })
})
