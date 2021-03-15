import { Request, Response } from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';
import admin from 'firebase-admin';

import FirebaseDetails from '../model/firebaseDetails';
import { addDataToUserConnectionDetails, sendSuccessResponse, sendErrorResponse } from '../common/common';

const serviceAccount = {
  type: process.env.FIREBASE_ADMIN_TYPE,
  project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
};
const serviceAccountStr = JSON.stringify(serviceAccount);
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccountStr)),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

export const addTokenToFirebaseDetails = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'addTokenToFirebaseDetails');

  const currentToken = req.body.currentToken;
  const refreshedToken = req.body.refreshedToken;

  const record = await FirebaseDetails.findOne({ current_token: currentToken });
  if (_.isEmpty(record)) {
    const firebaseDetails = new FirebaseDetails({
      _id: new mongoose.Types.ObjectId(),
      current_token: currentToken,
      refreshed_token: refreshedToken,
    });

    const result = await firebaseDetails.save();
    if (!_.isEmpty(result)) {
      const data = {
        message: 'firebase addTokenToFirebaseDetails!',
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
      message: 'firebase addTokenToFirebaseDetails!',
    };
    sendSuccessResponse(res, 200, data);
  }
};

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'sendMessage');

  const registrationToken = req.body.currentToken;

  const message = {
    notification: {
      title: 'sendMessage title',
      body: 'sendMessage body',
    },
    token: registrationToken,
  };

  try {
    const response = await admin.messaging().send(message);
    if (response) {
      const data = {
        message: 'firebase sendMessage!',
      };
      sendSuccessResponse(res, 200, data);
    }
  } catch (e) {
    console.log('error = ', e.message);

    const data = {
      message: `firebase sendMessage error!, error = ${e.message}`,
    };
    sendErrorResponse(res, 400, data);
  }
};

export const sendMultiMessage = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'sendMultiMessage');

  const registrationTokens = req.body.currentTokenList;

  const message = {
    notification: {
      title: 'sendMultiMessage title',
      body: 'sendMultiMessage body',
    },
    tokens: registrationTokens,
  };

  try {
    const response = await admin.messaging().sendMulticast(message);
    if (response) {
      if (response.successCount > 0) {
        const data = {
          message: 'firebase sendMultiMessage!',
        };
        sendSuccessResponse(res, 200, data);
      } else {
        const data = {
          message: `firebase sendMultiMessage error!`,
        };
        sendErrorResponse(res, 400, data);
      }
    }
  } catch (e) {
    console.log('error = ', e.message);

    const data = {
      message: `firebase sendMultiMessage error!, error = ${e.message}`,
    };
    sendErrorResponse(res, 400, data);
  }
};

export const sendTopicMessage = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'sendTopicMessage');

  const topic = req.body.topic;

  const message = {
    notification: {
      title: 'Where should I have lunch?',
      body: 'Open lunch picker in browser now!',
    },
    topic: topic,
  };

  try {
    const response = await admin.messaging().send(message);
    if (response) {
      const data = {
        message: 'firebase sendTopicMessage!',
      };
      sendSuccessResponse(res, 200, data);
    }
  } catch (e) {
    console.log('error = ', e.message);

    const data = {
      message: `firebase sendTopicMessage error!, error = ${e.message}`,
    };
    sendErrorResponse(res, 400, data);
  }
};

export const subscribeTopic = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'subscribeTopic');

  const registrationTokens = req.body.currentTokenList;
  const topic = req.body.topic;

  try {
    const response = await admin.messaging().subscribeToTopic(registrationTokens, topic);
    if (response) {
      if (response.successCount > 0) {
        const data = {
          message: 'firebase subscribeTopic!',
        };
        sendSuccessResponse(res, 200, data);
      } else {
        const data = {
          message: `firebase subscribeTopic error!`,
        };
        sendErrorResponse(res, 400, data);
      }
    }
  } catch (e) {
    console.log('error = ', e.message);

    const data = {
      message: `firebase subscribeTopic error!, error = ${e.message}`,
    };
    sendErrorResponse(res, 400, data);
  }
};

export const unsubscribeTopic = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'unsubscribeTopic');

  const registrationTokens = req.body.currentTokenList;
  const topic = req.body.topic;

  try {
    const response = await admin.messaging().unsubscribeFromTopic(registrationTokens, topic);
    if (response) {
      if (response.successCount > 0) {
        const data = {
          message: 'firebase unsubscribeTopic!',
        };
        sendSuccessResponse(res, 200, data);
      } else {
        const data = {
          message: `firebase unsubscribeTopic error!`,
        };
        sendErrorResponse(res, 400, data);
      }
    }
  } catch (e) {
    console.log('error = ', e.message);

    const data = {
      message: `firebase unsubscribeTopic error!, error = ${e.message}`,
    };
    sendErrorResponse(res, 400, data);
  }
};
