const supertest = require('supertest');
const server = require('./server');
const db = require('../data/db-config')

describe("test routes", () => {
  test("Welcome Route", async () => {
    const res = await supertest(server).get('/')

    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.message).toContain("Welcome");
  })
})