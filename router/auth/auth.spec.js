const supertest = require('supertest')
const server = require('../../api/server')
const db = require('../../data/db-config')

beforeEach(async () => {
  await db.seed.run()
})

describe('register route', () => {
  test('register', async () => {
    let newUser = {
      parent_name: 'testroute',
      username: 'testroute',
      password: 'testpass',
      email: 'test@pass.com'
    }

    const res = await supertest(server)
      .post('/api/auth/register')
      .send(newUser)

    expect(res.status).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body.parent_name).toMatch(/testroute/i)
    // console.log(res.body)
  })
})

describe('login routes', () => {
  test('login', async () => {
    let newUser = {
      parent_name: 'testroute',
      username: 'testroute',
      password: 'testpass',
      email: 'test@pass.com'
    }

    await supertest(server)
      .post('/api/auth/register')
      .send(newUser)

    const res = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'testroute', password: 'testpass' })

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toContain('Welcome')
  })
})
