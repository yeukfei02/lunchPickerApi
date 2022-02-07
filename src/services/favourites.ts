import mongoose from 'mongoose';
import _ from 'lodash';

import Favourites from '../model/favourites';

export const addDataToFavouritesService = async (ip: string, item: any): Promise<void> => {
  const record = await Favourites.findOne({ item: item });
  if (_.isEmpty(record)) {
    const favourites = new Favourites({
      _id: new mongoose.Types.ObjectId(),
      ip: ip,
      item: item,
    });
    await favourites.save();
  }
};
