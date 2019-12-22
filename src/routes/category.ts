import * as express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import * as categoryController from '../controller/category';

router.get('/get-categories', categoryController.getCategories);
router.get('/get-category/:alias', categoryController.getCategoryByAlias);

expressListRoutes({ prefix: '/api/category' }, 'CATEGORY API:', router);

export default router;
