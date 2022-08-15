const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');


const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};



  const Login = async (userProps = {}) => {
    const password = userProps.password ?? mockUser.password;
  
    // Create an "agent" that gives us the ability
    // to store cookies between requests in a test
    const agent = request.agent(app);
  
    // Create a user to sign in with
    const user = await UserService.create({ ...mockUser, ...userProps });
  
    // ...then sign in
    const { email } = user;
    await agent.post('/api/v1/users/sessions').send({ email, password });
    return [agent, user];
  };
  
  describe('restaurants routes', () => {
    beforeEach(() => {
      return setup(pool);
    });
  
    afterAll(() => {
      pool.end();
    });
    it('creates a new user', async () => {
    
      const res = await request(app).post('/api/v1/users').send(mockUser);
      const { firstName, lastName, email } = mockUser;
  
      expect(res.body).toEqual({
        id: expect.any(String),
        firstName,
        lastName,
        email,
      });
    });
  
      it.skip('returns the current user', async () => {
    const [agent, user] = await registerAndLogin();
    
    const me = await agent.get('/api/v1/users/me');
    
    expect(me.body).toEqual({
      ...user,
      exp: expect.any(Number),
      iat: expect.any(Number),
    });
  });

  
    });
  
    it.skip('should return a list of users if signed in as admin', async () => {
      const [agent, user] = await registerAndLogin({ email: 'admin' });
      const res = await agent.get('/api/v1/users');
  
      expect(res.body).toEqual([{ ...user }]);
    });










