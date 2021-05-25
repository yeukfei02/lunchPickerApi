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
import { validateReactAdminRoute } from '../middleware/middleware';

router.get('/user-connection-details', validateReactAdminRoute, getUserConnectionDetails);
router.get('/user-connection-details/:id', validateReactAdminRoute, getUserConnectionDetailById);
router.get('/restaurant', validateReactAdminRoute, getRestaurants);
router.get('/restaurant/:id', validateReactAdminRoute, getRestaurantById);
router.get('/restaurant-details', validateReactAdminRoute, getRestaurantDetails);
router.get('/restaurant-details/:id', validateReactAdminRoute, getRestaurantDetailsById);
router.get('/restaurant-details-review', validateReactAdminRoute, getRestaurantDetailsReview);
router.get('/restaurant-details-review/:id', validateReactAdminRoute, getRestaurantDetailsReviewById);
router.get('/category', validateReactAdminRoute, getCategory);
router.get('/category/:id', validateReactAdminRoute, getCategoryById);
router.get('/favourites', validateReactAdminRoute, getFavourites);
router.get('/favourites/:id', validateReactAdminRoute, getFavouritesById);

expressListRoutes({ prefix: '/react-admin' }, 'REACT-ADMIN API:', router);

export default router;
