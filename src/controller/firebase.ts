import { Request, Response } from 'express';
import * as _ from 'lodash';
import * as admin from 'firebase-admin';

import { log } from '../common/common';

const serviceAccount = require("../../lunchpicker-2232b-firebase-adminsdk-sxq0e-c802a6e8a6.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID
});

export const sendMessage = (req: Request, res: Response) => {
  const registrationToken = req.body.currentToken;

  const message = {
    data: {
      message: 'sendMessage test'
    },
    token: registrationToken
  };

  admin.messaging().send(message)
    .then((response) => {
      log('sendMessage success = ', response);
      res.status(200).json({
        message: 'firebase sendMessage!',
        result: response
      });
    })
    .catch((error) => {
      log('sendMessage error = ', error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}

export const sendMultiMessage = (req: Request, res: Response) => {
  const registrationTokens = req.body.currentTokenList;

  const message = {
    data: {
      message: 'sendMultiMessage test'
    },
    tokens: registrationTokens,
  }

  admin.messaging().sendMulticast(message)
    .then((response) => {
      log(`sendMultiMessage success = `, response);
      res.status(200).json({
        message: 'firebase sendMultiMessage!',
        result: response
      });
    })
    .catch((error) => {
      log('sendMultiMessage error = ', error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}

export const sendTopicMessage = (req: Request, res: Response) => {
  const topic = req.body.topic;

  const message = {
    data: {
      message: "sendTopicMessage test"
    },
    topic: topic
  };

  admin.messaging().send(message)
    .then((response) => {
      log(`sendTopicMessage success = `, response);
      res.status(200).json({
        message: 'firebase sendTopicMessage!',
        result: response
      });
    })
    .catch((error) => {
      log('sendTopicMessage error = ', error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}

export const subscribeTopic = (req: Request, res: Response) => {
  const registrationTokens = req.body.currentTokenList;
  const topic = req.body.topic;

  admin.messaging().subscribeToTopic(registrationTokens, topic)
    .then((response) => {
      log('subscribeTopic success = ', response);
      res.status(200).json({
        message: 'firebase subscribeTopic!',
        result: response
      });
    })
    .catch((error) => {
      log('subscribeTopic error = ', error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}


export const unsubscribeTopic = (req: Request, res: Response) => {
  const registrationTokens = req.body.currentTokenList;
  const topic = req.body.topic;

  admin.messaging().unsubscribeFromTopic(registrationTokens, topic)
    .then((response) => {
      log('unsubscribeTopic success = ', response);
      res.status(200).json({
        message: 'firebase unsubscribeTopic!',
        result: response
      });
    })
    .catch((error) => {
      log('unsubscribeTopic error = ', error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}
