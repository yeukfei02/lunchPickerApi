import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import * as admin from 'firebase-admin';

import FirebaseDetails from '../model/firebaseDetails';
import {
  log,
  addDataToUserConnectionDetails,
  sendSuccessResponse,
  sendErrorResponse
} from '../common/common';

const serviceAccount = require("../../lunchpicker-2232b-firebase-adminsdk-sxq0e-c802a6e8a6.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID
});

export const addTokenToFirebaseDetails = async (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'addTokenToFirebaseDetails');

  const currentToken = req.body.currentToken;
  const refreshedToken = req.body.refreshedToken;

  const record = await FirebaseDetails.findOne({ current_token: currentToken });
  if (_.isEmpty(record)) {
    const firebaseDetails = new FirebaseDetails({
      _id: new mongoose.Types.ObjectId(),
      current_token: currentToken,
      refreshed_token: refreshedToken
    });

    const result = await firebaseDetails.save();
    // log("result = ", result);
    if (!_.isEmpty(result)) {
      const data = {
        message: 'firebase addTokenToFirebaseDetails!',
      };
      sendSuccessResponse(res, 200, data);
    } else {
      const data = {
        message: 'Not found'
      };
      sendErrorResponse(res, 404, data);
    }
  } else {
    const data = {
      message: 'firebase addTokenToFirebaseDetails!',
    };
    sendSuccessResponse(res, 200, data);
  }
}

export const sendMessage = (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'sendMessage');

  const registrationToken = req.body.currentToken;

  const message = {
    notification: {
      title: "sendMessage title",
      body: "sendMessage body"
    },
    token: registrationToken
  };

  admin.messaging().send(message)
    .then((response) => {
      log('sendMessage success = ', response);
      const data = {
        message: 'firebase sendMessage!',
        result: response
      };
      sendSuccessResponse(res, 200, data);
    })
    .catch((error) => {
      log('sendMessage error = ', error);
      const data = {
        message: 'Not found'
      };
      sendErrorResponse(res, 404, data);
    });
}

export const sendMultiMessage = (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'sendMultiMessage');

  const registrationTokens = req.body.currentTokenList;

  const message = {
    notification: {
      title: "sendMultiMessage title",
      body: "sendMultiMessage body"
    },
    tokens: registrationTokens,
  }

  admin.messaging().sendMulticast(message)
    .then((response) => {
      log(`sendMultiMessage success = `, response);
      const data = {
        message: 'firebase sendMultiMessage!',
        result: response
      };
      sendSuccessResponse(res, 200, data);
    })
    .catch((error) => {
      log('sendMultiMessage error = ', error);
      const data = {
        message: 'Not found'
      };
      sendErrorResponse(res, 404, data);
    });
}

export const sendTopicMessage = (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'sendTopicMessage');

  const topic = req.body.topic;

  const message = {
    notification: {
      title: "Where should I have lunch?",
      body: "Open lunch picker in browser now!"
    },
    topic: topic
  };

  admin.messaging().send(message)
    .then((response) => {
      log(`sendTopicMessage success = `, response);
      const data = {
        message: 'firebase sendTopicMessage!',
        result: response
      };
      sendSuccessResponse(res, 200, data);
    })
    .catch((error) => {
      log('sendTopicMessage error = ', error);
      const data = {
        message: 'Not found'
      };
      sendErrorResponse(res, 404, data);
    });
}

export const subscribeTopic = (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'subscribeTopic');

  const registrationTokens = req.body.currentTokenList;
  const topic = req.body.topic;

  admin.messaging().subscribeToTopic(registrationTokens, topic)
    .then((response) => {
      log('subscribeTopic success = ', response);
      const data = {
        message: 'firebase subscribeTopic!',
        result: response
      };
      sendSuccessResponse(res, 200, data);
    })
    .catch((error) => {
      log('subscribeTopic error = ', error);
      const data = {
        message: 'Not found'
      };
      sendErrorResponse(res, 404, data);
    });
}

export const unsubscribeTopic = (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'unsubscribeTopic');

  const registrationTokens = req.body.currentTokenList;
  const topic = req.body.topic;

  admin.messaging().unsubscribeFromTopic(registrationTokens, topic)
    .then((response) => {
      log('unsubscribeTopic success = ', response);
      const data = {
        message: 'firebase unsubscribeTopic!',
        result: response
      };
      sendSuccessResponse(res, 200, data);
    })
    .catch((error) => {
      log('unsubscribeTopic error = ', error);
      const data = {
        message: 'Not found'
      };
      sendErrorResponse(res, 404, data);
    });
}
