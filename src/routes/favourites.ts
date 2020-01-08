import * as express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import * as favouritesController from '../controller/favourites';

router.post('/add-to-favourites', favouritesController.addToFavourites);
router.get('/get-favourites', favouritesController.getFavourites);
router.delete('/delete-all-favourites', favouritesController.deleteAllFavourites);
router.delete('/delete-favourites/:_id', favouritesController.deleteFavouritesById);

expressListRoutes({ prefix: '/api/favourites' }, 'FAVOURITES API:', router);

export default router;
