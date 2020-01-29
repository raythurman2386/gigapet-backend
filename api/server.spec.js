const supertest = require('supertest');
const server = require('./server');
const db = require('../data/db-config')

beforeEach(async () => {
  await db.seed.run()
})

describe("test routes", () => {
  test("Welcome Route", async () => {
    const res = await supertest(server).get('/');

    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.message).toContain("Welcome");
  })
})

describe("register route", () => {
  test("register", async () => {
    let newUser = { 
      "username": "testroute", 
      "password": "testpass", 
      "email": "test@pass.com"
    }

    const res = await supertest(server).post('/api/auth/register').send(newUser);

    // expect(res.status).toBe(201);
    // expect(res.type).toBe('application/json');
    console.log(res)
  })

  test("register fail", async () => {
    const res = await supertest(server).post('/api/auth/register')

    expect(res.status).toBe(500)
  })
})