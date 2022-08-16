const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');



describe('restaurants routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('/restaurants should return a list of restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');
    expect(res.body[2]).toEqual({ 
      id: '3',
      name: 'mcdonalds',
      city: 'spokane',
      address: 'north bend drive',
      reviews: expect.any(Array),
    });
  });

  it('restaurants/:id should return details with restaurant', async () => {
    const res = await request(app).get('/api/v1/restaurants/1');
    console.log(res.body);
    expect(res.body).toEqual({
      id: '1',
      name: 'burger king',
      city: 'alberta',
      address: 'north helmond drive',
      reviews: [
        {
          id: 1,
          restaurants_id: 1,
          users_id: 1,
          rating: '10', 
          comment: 'it was great',

        }
      ],
    });
  });



  it('POST /restaurants should create a new review', async () => {
    const res = await request(app).post('/api/v1/restaurants/reviews').send({
      rating: '5',
      comment: 'oh my gosh that was the best food ever',
      
    });
    expect(res.body.rating).toBe(200);
    expect(res.body.comment).toBe('');
    
  });




    






















});
