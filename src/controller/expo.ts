import { Request, Response } from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';

import ExpoDetails from '../model/expoDetails';
import {
  addDataToUserConnectionDetails,
  expoSendPushNotification,
  sendSuccessResponse,
  sendErrorResponse,
} from '../common/common';

export const addPushNotificationTokenToExpoDetails = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'addPushNotificationTokenToExpoDetails');

  const pushNotificationToken = req.body.pushNotificationToken;

  const record = await ExpoDetails.findOne({ push_notification_token: pushNotificationToken });
  if (_.isEmpty(record)) {
    const expoDetails = new ExpoDetails({
      _id: new mongoose.Types.ObjectId(),
      push_notification_token: pushNotificationToken,
    });

    const result = await expoDetails.save();
    if (!_.isEmpty(result)) {
      const data = {
        message: 'expo addPushNotificationTokenToExpoDetails!',
      };
      sendSuccessResponse(res, 200, data);
    } else {
      const data = {
        message: 'Not found',
      };
      sendErrorResponse(res, 404, data);
    }
  } else {
    const data = {
      message: 'expo addPushNotificationTokenToExpoDetails!',
    };
    sendSuccessResponse(res, 200, data);
  }
};

export const subscribeMessage = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'subscribeMessage');

  const pushNotificationTokenList = req.body.pushNotificationTokenList;
  if (pushNotificationTokenList) {
    pushNotificationTokenList.forEach(async (pushNotificationToken: string, i: number) => {
      const record = await ExpoDetails.findOne({ push_notification_token: pushNotificationToken });
      if (_.isEmpty(record)) {
        const expoDetails = new ExpoDetails({
          _id: new mongoose.Types.ObjectId(),
          push_notification_token: pushNotificationToken,
        });
        await expoDetails.save();
      }
    });

    await expoSendPushNotification(pushNotificationTokenList);
    const data = {
      message: 'expo subscribeMessage!',
    };
    sendSuccessResponse(res, 200, data);
  }
};

export const unsubscribeMessage = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'unsubscribeMessage');

  const pushNotificationTokenList = req.body.pushNotificationTokenList;
  if (pushNotificationTokenList) {
    pushNotificationTokenList.forEach(async (pushNotificationToken: string, i: number) => {
      await ExpoDetails.findOneAndDelete({ push_notification_token: pushNotificationToken });
    });

    const data = {
      message: 'expo unsubscribeMessage!',
    };
    sendSuccessResponse(res, 200, data);
  }
};
