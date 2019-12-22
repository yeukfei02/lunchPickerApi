const express = require('express');
const router = express.Router();
const expressListRoutes = require('express-list-routes');

const restaurantController = require('../controller/restaurant');

router.get('/find-restaurants-by-lat-long', restaurantController.getAllRestaurantsByLatLong);
router.get('/find-restaurants-by-location', restaurantController.getAllRestaurantsByLocation);
router.get('/find-restaurant-by-phone', restaurantController.getRestaurantByPhone);
router.get('/get-restaurant-details/:id', restaurantController.getRestaurantDetailsById);
router.get('/get-restaurant-details-review/:id', restaurantController.getRestaurantDetailsReviewById);

expressListRoutes({ prefix: '/api/restaurant' }, 'RESTAURANT API:', router);

module.exports = router;
