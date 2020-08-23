import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';

import Favourites from '../model/favourites';
import { addDataToUserConnectionDetails, sendSuccessResponse, sendErrorResponse } from '../common/common';

async function addDataToFavouritesTable(ip: string, item: any): Promise<void> {
  const record = await Favourites.findOne({ item: item });
  if (_.isEmpty(record)) {
    const favourites = new Favourites({
      _id: new mongoose.Types.ObjectId(),
      ip: ip,
      item: item,
    });

    await favourites.save();
  }
}

export const addToFavourites = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'addToFavourites');

  try {
    let ip = req.clientIp || req.body.ip;
    if (_.isEqual(ip, '::1')) {
      ip = '127.0.0.1';
    }

    await addDataToFavouritesTable(ip, req.body.item);
    const data = {
      message: 'add favourites!',
    };
    sendSuccessResponse(res, 200, data);
  } catch (e) {
    const data = {
      message: 'add favourites error!',
    };
    sendErrorResponse(res, 400, data);
  }
};

export const getFavourites = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'getFavourites');

  let ip = req.clientIp || req.params.ip;
  if (_.isEqual(ip, '::1')) {
    ip = '127.0.0.1';
  }

  const result = await Favourites.find({ ip: ip });
  res.status(200).json({
    message: 'Get favourites!',
    favourites: result,
  });
};

export const deleteAllFavourites = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'deleteAllFavourites');

  let ip = req.clientIp;
  if (_.isEqual(ip, '::1')) {
    ip = '127.0.0.1';
  }

  const result = await Favourites.deleteMany({ ip: ip });
  if (!_.isEmpty(result)) {
    const data = {
      message: 'Delete all favourites!',
    };
    sendSuccessResponse(res, 200, data);
  }
};

export const deleteFavouritesById = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'deleteFavouritesById');

  const result = await Favourites.findByIdAndDelete(req.params._id);
  if (!_.isEmpty(result)) {
    const data = {
      message: 'Delete favourites by id!',
    };
    sendSuccessResponse(res, 200, data);
  } else {
    const data = {
      message: 'Delete favourites by id error, no this id',
    };
    sendErrorResponse(res, 400, data);
  }
};
