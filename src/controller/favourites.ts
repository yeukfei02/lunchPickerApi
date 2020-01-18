import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';

import Favourites from '../model/favourites';
import {
  log,
  addDataToUserConnectionDetails,
  sendSuccessResponse,
  sendErrorResponse
} from '../common/common';

async function addDataToFavouritesTable(ip: string, item: any) {
  const record = await Favourites.findOne({ item: item });
  if (_.isEmpty(record)) {
    const favourites = new Favourites({
      _id: new mongoose.Types.ObjectId(),
      ip: ip,
      item: item
    });

    const result = await favourites.save();
    // log("result = ", result);
  }
}

export const addToFavourites = (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'addToFavourites');

  try {
    let ip = req.clientIp;
    if (_.isEqual(ip, "::1")) {
      ip = "127.0.0.1";
    }

    addDataToFavouritesTable(ip, req.body.item);
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
}

export const getFavourites = (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'getFavourites');

  let ip = req.clientIp;
  if (_.isEqual(ip, "::1")) {
    ip = "127.0.0.1";
  }

  Favourites.find({ ip: ip })
    .then((result: any) => {
      res.status(200).json({
        message: 'Get favourites!',
        favourites: result
      });
    })
    .catch((error: any) => {
      log("error = ", error);
      const data = {
        message: 'Not found'
      };
      sendErrorResponse(res, 404, data);
    });
}

export const deleteAllFavourites = (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'deleteAllFavourites');

  let ip = req.clientIp;
  if (_.isEqual(ip, "::1")) {
    ip = "127.0.0.1";
  }

  Favourites.deleteMany({ ip: ip })
    .then((result: any) => {
      log("result = ", result);
      const data = {
        message: 'Delete all favourites!',
      };
      sendSuccessResponse(res, 200, data);
    })
    .catch((error: any) => {
      log("error = ", error);
      const data = {
        message: 'Not found'
      };
      sendErrorResponse(res, 404, data);
    });
}

export const deleteFavouritesById = (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'deleteFavouritesById');

  Favourites.findByIdAndDelete(req.params._id)
    .then((result: any) => {
      log("result = ", result);
      const data = {
        message: 'Delete favourites by id!',
      };
      sendSuccessResponse(res, 200, data);
    })
    .catch((error: any) => {
      log("error = ", error);
      const data = {
        message: 'Not found'
      };
      sendErrorResponse(res, 404, data);
    });
}
