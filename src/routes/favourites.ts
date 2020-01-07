import * as express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import * as favouritesController from '../controller/favourites';

router.post('/add-to-favourites', favouritesController.addToFavourites);
router.get('/get-favourites', favouritesController.getFavourites);

expressListRoutes({ prefix: '/api/favourites' }, 'FAVOURITES API:', router);

export default router;
