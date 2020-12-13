import express from 'express';
const router = express.Router();
const expressListRoutes = require('express-list-routes');

import { addToFavourites, getFavourites, deleteAllFavourites, deleteFavouritesById } from '../controller/favourites';

router.post('/add-to-favourites', addToFavourites);
router.get('/get-favourites', getFavourites);
router.delete('/delete-all-favourites', deleteAllFavourites);
router.delete('/delete-favourites/:_id', deleteFavouritesById);

expressListRoutes({ prefix: '/api/favourites' }, 'FAVOURITES API:', router);

export default router;
