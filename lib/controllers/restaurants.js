const { Router } = require('express');
const  Restaurant  = require('../models/Restaurant');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const restaurants = await Restaurant.getRestaurantById(req.params.id);
    res.json(restaurants); 
  })

  .get('/', async (req, res) => {
    const restaurants = await Restaurant.getAll();
    
    res.json(restaurants);
  });


 
