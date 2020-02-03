const supertest = require('supertest')
const generateToken = require('../../token/generateToken')
const server = require('../../api/server')
const db = require('../../data/db-config')

describe('child routes', () => {
  test('should get children', async () => {
    let token = await generateToken({ username: 'test1', password: 'test' })
    const res = await supertest(server)
      .get('/api/child')
      .set('Authorization', token)

    console.log(res.status)
    // expect(res.status).toBe(200)
    // expect(res.type).toBe('application/json')
    // expect(res.body.length).toBeGreaterThan(0)
  })

  // test('should get child with id 1', async () => {
  //   const res = await supertest(server).get('/api/child/1')

  //   expect(res.status).toBe(200)
  //   expect(res.type).toBe('application/json')
  //   expect(res.body.name).toMatch(/bob/i)
  //   // console.log(res.body)
  // })

  // test('should add child to db', async () => {
  //   const newChild = { name: 'test', monster_id: '1', parent_id: '1' }

  //   const res = await supertest(server)
  //     .post('/api/child')
  //     .send(newChild)

  //   expect(res.status).toBe(201)
  //   expect(res.type).toBe('application/json')
  //   expect(res.body[0]).toBe(6)
  // })

  // test('should update a child', async () => {
  //   const updated = { name: 'Bobina', monster_id: '1', parent_id: '1' }

  //   const res = await supertest(server)
  //     .put('/api/child/1')
  //     .send(updated)

  //   expect(res.status).toBe(200)
  //   expect(res.type).toBe('application/json')
  //   expect(res.body.message).toContain('Updated')
  // })

  // test('should delete a child', async () => {
  //   const res = await supertest(server).delete('/api/child/1')

  //   expect(res.status).toBe(200)
  //   expect(res.type).toBe('application/json')
  //   expect(res.body).toBe(1)
  // })
})
