const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/db-config')

beforeEach(async done => {
  await db.seed.run()
  done()
})

let token = ''

beforeAll(done => {
  supertest(server)
    .post('/api/auth/login')
    .send({ username: 'test1', password: 'test' })
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        token = res.body.token
        done()
      }
    })
})

describe('child routes', () => {
  it('should get children', async () => {
    const res = await supertest(server)
      .get('/api/child')
      .set('authorization', token)

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
  })

  it('should get child with id 1', async () => {
    const res = await supertest(server)
      .get('/api/child/1')
      .set('authorization', token)

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.id).toBe(6)
  })

  it('should fail getting child 111', async () => {
    const res = await supertest(server)
      .get('/api/child/111')
      .set('authorization', token)

    expect(res.status).toBe(400)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/there is no child by that id/i)
  })

  it('should add child to db', async () => {
    const newChild = { name: 'test', monster_id: '1', parent_id: '1' }

    const res = await supertest(server)
      .post('/api/child')
      .send(newChild)
      .set('authorization', token)

    expect(res.status).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body[0]).toBe(6)
  })

  it('should fail to add child to db', async () => {
    const newChild = { name: 'test' }

    const res = await supertest(server)
      .post('/api/child')
      .send(newChild)
      .set('authorization', token)

    expect(res.status).toBe(400)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/Provide a name and a monster id please/i)
  })

  it('should update a child', async () => {
    const updated = { name: 'Bobina', monster_id: '1', parent_id: '1' }
    const res = await supertest(server)
      .put('/api/child/1')
      .send(updated)
      .set('authorization', token)

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toContain('Updated')
  })

  it('should fail to update a child', async () => {
    const updated = { name: 'Bobina' }

    const res = await supertest(server)
      .put('/api/child/111')
      .send(updated)
      .set('authorization', token)

    expect(res.status).toBe(400)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/there is no child by that id/i)
  })

  it('should delete a child', async () => {
    const res = await supertest(server)
      .delete('/api/child/1')
      .set('authorization', token)

    expect(res.status).toBe(200)
    expect(res.type).toBe('application/json')
    expect(res.body).toBe(1)
  })

  it('should fail to delete a child', async () => {
    const res = await supertest(server)
      .delete('/api/child/111')
      .set('authorization', token)

    expect(res.status).toBe(400)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toMatch(/there is no child by that id/i)
  })
})
