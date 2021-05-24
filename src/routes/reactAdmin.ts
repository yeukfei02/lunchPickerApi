import express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import {
  getUserConnectionDetails,
  getUserConnectionDetailById,
  getRestaurants,
  getRestaurantById,
  getRestaurantDetails,
  getRestaurantDetailsById,
  getRestaurantDetailsReview,
  getRestaurantDetailsReviewById,
  getCategory,
  getCategoryById,
  getFavourites,
  getFavouritesById,
} from '../controller/reactAdmin';

router.get('/user-connection-details', getUserConnectionDetails);
router.get('/user-connection-details/:id', getUserConnectionDetailById);
router.get('/restaurant', getRestaurants);
router.get('/restaurant/:id', getRestaurantById);
router.get('/restaurant-details', getRestaurantDetails);
router.get('/restaurant-details/:id', getRestaurantDetailsById);
router.get('/restaurant-details-review', getRestaurantDetailsReview);
router.get('/restaurant-details-review/:id', getRestaurantDetailsReviewById);
router.get('/category', getCategory);
router.get('/category/:id', getCategoryById);
router.get('/favourites', getFavourites);
router.get('/favourites/:id', getFavouritesById);

expressListRoutes({ prefix: '/react-admin' }, 'REACT-ADMIN API:', router);

export default router;
