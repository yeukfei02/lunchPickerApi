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
  // At 08:30 on every day-of-week from Monday through Sunday.
  scheduleSendTopicMessage('30 8 * * 1-7', "Let's look for breakfast!", "Open lunch picker in browser now!");

  // At 11:30 on every day-of-week from Monday through Sunday.
  scheduleSendTopicMessage('30 11 * * 1-7', "Where should I have lunch?", "Open lunch picker in browser now!");

  // At 18:30 on every day-of-week from Monday through Sunday.
  scheduleSendTopicMessage('30 18 * * 1-7', "Find your dinner place now!", "Open lunch picker in browser now!");
}

export const scheduleSendTopicMessage = (scheduleTime: string, title: string, body: string) => {
  cron.schedule(scheduleTime, () => {
    log('### cron sendTopicMessage ###', '');
    sendTopicMessage(title, body);
  });
}

export const sendTopicMessage = (title: string, body: string) => {
  const topic = "all";

  const message = {
    notification: {
      title: title,
      body: body
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
