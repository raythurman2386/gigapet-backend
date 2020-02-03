const supertest = require('supertest')
const server = require('../../api/server')
const db = require('../../data/db-config')

beforeEach(async () => {
  await db.seed.run()
})

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
})
