const express = require('express');
const router = express.Router();
const expressListRoutes = require('express-list-routes');

const categoryController = require('../controller/category');

router.get('/get-categories', categoryController.getCategories);
router.get('/get-category/:alias', categoryController.getCategoryByAlias);

expressListRoutes({ prefix: '/api/category' }, 'CATEGORY API:', router);

module.exports = router;
