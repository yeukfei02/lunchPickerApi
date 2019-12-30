import * as cron from 'node-cron';
import * as admin from 'firebase-admin';
import * as _ from 'lodash';

import { log } from '../common/common';

const serviceAccount = require("../../lunchpicker-2232b-firebase-adminsdk-sxq0e-c802a6e8a6.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID
}, 'cronFirebaseAdmin');

export const init = () => {
  scheduleSendTopicMessage();
}

export const scheduleSendTopicMessage = () => {
  // At 11:30 on every day-of-week from Monday through Sunday.
  cron.schedule('30 11 * * 1-7', () => {
    log('### cron sendTopicMessage ###', '');
    sendTopicMessage();
  });
}

export const sendTopicMessage = () => {
  const topic = "all";

  const message = {
    notification: {
      title: "Where should I have lunch?",
      body: "Open your lunch picker in browser now!"
    },
    topic: topic
  };

  admin.messaging().send(message)
    .then((response) => {
      log(`sendTopicMessage success = `, response);
    })
    .catch((error) => {
      log('sendTopicMessage error = ', error);
    });
}

export default cron;
