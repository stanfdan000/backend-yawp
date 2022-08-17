const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');


const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};

describe('restaurants routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('creates a new user', async () => {
      
    const res = await request(app).post('/api/v1/users').send(mockUser);
      
    expect(res.body).toEqual({
      message: 'Signed in successfully!',
    });
  });
});

it('should return a list of users if signed in as admin', async () => {

  const agent = request.agent(app);
  await agent.post('/api/v1/users').send({ email: 'admin', password: '123456789', firstName:'dan', lastName: 'stan' });
  const res = await agent.get('/api/v1/users');
  expect(res.body).toEqual(expect.arrayContaining([{
    id: expect.any(String),
    firstName: expect.any(String),
    lastName: expect.any(String),
    email: expect.any(String),
  }]));
});


afterAll(() => {
  pool.end();
});








