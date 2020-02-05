const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/db-config')

beforeAll(async done => {
  await db.seed.run()
  done()
})

describe('register route', () => {
  it('register', async () => {
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
    expect(res.body.message).toContain('registered')
  })

  it('should test register fail', async () => {
    let newUser = {
      parent_name: 'testroute',
      username: 'testroute',
      password: 'testpass'
    }

    const res = await supertest(server)
      .post('/api/auth/register')
      .send(newUser)

    expect(res.status).toBe(400)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/please provide all fields/i)
  })

  it('should test register fail by email', async () => {
    let newUser = {
      parent_name: 'testroute',
      username: 'testroute',
      password: 'testpass',
      email: 'test1@test.com'
    }

    const res = await supertest(server)
      .post('/api/auth/register')
      .send(newUser)

    expect(res.status).toBe(400)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/a user with that email exists/i)
  })

  it('should test register fail by username', async () => {
    let newUser = {
      parent_name: 'testroute',
      username: 'test1',
      password: 'testpass',
      email: 'something@test.com'
    }

    const res = await supertest(server)
      .post('/api/auth/register')
      .send(newUser)

    expect(res.status).toBe(400)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/a user with that username exists/i)
  })
})

describe('login routes', () => {
  it('login', async () => {
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

  it('should test a login fail', async () => {
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
      .send({ username: 'testroute' })

    expect(res.status).toBe(400)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/please supply a username and a password/i)
  })

  it('login should fail because of pw', async () => {
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
      .send({ username: 'testroute', password: 'testpass123' })

    expect(res.status).toBe(401)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/invalid credentials/i)
  })
})
