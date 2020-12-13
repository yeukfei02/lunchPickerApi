import express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import {
  findLocationTextByLatLong,
  getAllRestaurantsByLatLong,
  getAllRestaurantsByLocation,
  getRestaurantByPhone,
  getRestaurantDetailsById,
  getRestaurantDetailsReviewById,
} from '../controller/restaurant';

router.get('/find-location-text-by-lat-long', findLocationTextByLatLong);
router.get('/find-restaurants-by-lat-long', getAllRestaurantsByLatLong);
router.get('/find-restaurants-by-location', getAllRestaurantsByLocation);
router.get('/find-restaurant-by-phone', getRestaurantByPhone);
router.get('/get-restaurant-details/:id', getRestaurantDetailsById);
router.get('/get-restaurant-details-review/:id', getRestaurantDetailsReviewById);

expressListRoutes({ prefix: '/api/restaurant' }, 'RESTAURANT API:', router);

export default router;
