const { Router } = require('express');
const  Restaurant  = require('../models/Restaurant');
const authenticate = require('../middleware/authenticate');
module.exports = Router()
  .get('/:restId', async (req, res) => {
    const restaurants = await Restaurant.getRestaurantById(req.params.restId);
    res.json(restaurants); 
  })
  .get('/', async (req, res) => {
    const restaurants = await Restaurant.getAll();
    
    res.json(restaurants);
  })
  .post('/:restId/reviews', authenticate, async (req, res, next) => {
    try {
      const restaurant = await Restaurant.getRestaurantById(req.params.restId);
      console.log(req.body);
      const review = await restaurant.addReview(
        {
          users_id: req.user.id,
          restaurants_id: req.params.restId,
          ...req.body,
        } 
      );
      console.log('restaurant', restaurant);
      res.json(review);

    } catch (e) {
      next(e);
    }

    


  });



