const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/db-config')

// beforeEach(async () => {
//   await db.seed.run()
// })

describe('Parent Route Tests', () => {
  test('should get parent by id', async () => {
    const login = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .get('/api/parent/1')
      .set('authorization', login.body.token)

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.id).toBe(1)
  })

  test('should not find a parent by id', async () => {
    const login = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .get('/api/parent/111')
      .set('authorization', login.body.token)

    expect(res.status).toBe(404)
    expect(res.type).toBe('application/json')
    // expect(res.body.message).toMatch(//i)
    console.log(res.body)
  })

  test('should update a parent', async () => {
    const login = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .put('/api/parent/1', {
        parent_name: 'update',
        username: 'update',
        email: 'update@test.com'
      })
      .set('authorization', login.body.token)

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    // expect(res.body.id).toBe(1)
    console.log(res.body)
  })

  test('should delete a parent', async () => {
    const login = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .delete('/api/parent/1')
      .set('authorization', login.body.token)

    expect(res.status).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toContain('deleted')
  })
})
