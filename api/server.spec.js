const supertest = require('supertest')
const server = require('./server')
const db = require('../data/db-config')

beforeEach(async () => {
  await db.seed.run()
})

describe('test routes', () => {
  test('Welcome Route', async () => {
    const res = await supertest(server).get('/')

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toContain('Welcome')
  })
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
    expect(res.body.id).toBeDefined()
    // console.log(res.body)
  })

  test('register fail', async () => {
    const res = await supertest(server).post('/api/auth/register')

    expect(res.status).toBe(500)
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

describe('child routes', () => {
  test('should get children', async () => {
    const res = await supertest(server).get('/api/child')

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.length).toBeGreaterThan(0)
  })

  test('should get child with id 1', async () => {
    const res = await supertest(server).get('/api/child/1')

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.name).toMatch(/bob/i)
    // console.log(res.body)
  })

  test('should add child to db', async () => {
    const newChild = { name: 'test', monster_id: '1', parent_id: '1' }

    const res = await supertest(server)
      .post('/api/child')
      .send(newChild)

    expect(res.status).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body[0]).toBe(6)
  })

  test('should delete a child', async () => {
    const res = await supertest(server).delete('/api/child/1')

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body).toBe(1)
  })
})
