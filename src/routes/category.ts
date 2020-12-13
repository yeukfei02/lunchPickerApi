import express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import { getCategories, getCategoryByAlias } from '../controller/category';

router.get('/get-categories', getCategories);
router.get('/get-category/:alias', getCategoryByAlias);

expressListRoutes({ prefix: '/api/category' }, 'CATEGORY API:', router);

export default router;
