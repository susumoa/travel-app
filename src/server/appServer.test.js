// we will use supertest to test HTTP requests/responses
const request = require('supertest');
// we also need our app for the correct routes!
const app = require('./appServer');

describe('GET / ', () => {
  test('It should respond', async () => {
    const response = await request(app).get('/');
    expect(response.req.path).toBe('/');
    expect(response.type).toBe('text/html');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /all ', () => {
  test('It should respond', async () => {
    const response = await request(app).get('/all');
    expect(response.req.path).toBe('/all');
    expect(response.statusCode).toBe(200);
  });
});
