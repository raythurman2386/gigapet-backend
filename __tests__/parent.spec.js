const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/db-config')

let auth = {}

beforeAll(async done => {
  await db.seed.run()
  done()
})

beforeEach(async done => {
  const login = await supertest(server)
    .post('/api/auth/login')
    .send({ username: 'test1', password: 'test' })

  auth.token = login.body.token
  done()
})

describe('Parent Route Tests', () => {
  it('should get parent by id', async () => {
    const res = await supertest(server)
      .get('/api/parent/1')
      .set('authorization', auth.token)

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.id).toBe(1)
  })

  it('should not find a parent by id', async () => {
    // const login = await supertest(server)
    //   .post('/api/auth/login')
    //   .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .get('/api/parent/111')
      .set('authorization', auth.token)

    expect(res.status).toBe(404)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/parent not found/i)
  })

  it('should update a parent', async () => {
    // const login = await supertest(server)
    //   .post('/api/auth/login')
    //   .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .put('/api/parent/1')
      .send({
        parent_name: 'update',
        username: 'update',
        email: 'update@test.com'
      })
      .set('authorization', auth.token)

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body).toBe(1)
  })

  it('should fail to update a parent', async () => {
    // const login = await supertest(server)
    //   .post('/api/auth/login')
    //   .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .put('/api/parent/111')
      .send({
        parent_name: 'update',
        username: 'update',
        email: 'update@test.com'
      })
      .set('authorization', auth.token)

    expect(res.status).toBe(404)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/parent not found/i)
  })

  it('should delete a parent', async () => {
    // const login = await supertest(server)
    //   .post('/api/auth/login')
    //   .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .delete('/api/parent/1')
      .set('authorization', auth.token)

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toContain('deleted')
  })

  it('should fail to delete a parent', async () => {
    // const login = await supertest(server)
    //   .post('/api/auth/login')
    //   .send({ username: 'test1', password: 'test' })

    const res = await supertest(server)
      .delete('/api/parent/111')
      .set('authorization', auth.token)

    expect(res.status).toBe(404)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/parent not found/i)
  })
})
