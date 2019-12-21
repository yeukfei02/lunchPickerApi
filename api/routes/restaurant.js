const express = require('express');
const router = express.Router();
const expressListRoutes = require('express-list-routes');

const restaurantController = require('../controller/restaurant');

router.get('/find-restaurants', restaurantController.getAllRestaurants);

expressListRoutes({ prefix: '/api/restaurant' }, 'RESTAURANT API:', router);

module.exports = router;
