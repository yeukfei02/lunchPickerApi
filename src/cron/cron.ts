import * as cron from 'node-cron';
import * as admin from 'firebase-admin';

import { log } from '../common/common';

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
admin.initializeApp(
  {
    credential: admin.credential.cert(JSON.parse(serviceAccountStr)),
    projectId: process.env.FIREBASE_PROJECT_ID,
  },
  'cronFirebaseAdmin',
);

export const sendTopicMessage = (title: string, body: string): void => {
  const topic = 'all';

  const message = {
    notification: {
      title: title,
      body: body,
    },
    topic: topic,
  };

  admin
    .messaging()
    .send(message)
    .then(response => {
      log(`sendTopicMessage success = `, response);
    })
    .catch(error => {
      log('sendTopicMessage error = ', error);
    });
};

export const scheduleSendTopicMessage = (scheduleTime: string, title: string, body: string): void => {
  cron.schedule(scheduleTime, () => {
    log('### cron sendTopicMessage ###', '');
    sendTopicMessage(title, body);
  });
};

export const init = (): void => {
  // At 08:30 on every day-of-week from Monday through Sunday.
  scheduleSendTopicMessage('30 8 * * 1-7', "Let's look for breakfast!", 'Open lunch picker in browser now!');

  // At 11:30 on every day-of-week from Monday through Sunday.
  scheduleSendTopicMessage('30 11 * * 1-7', 'Where should I have lunch?', 'Open lunch picker in browser now!');

  // At 18:30 on every day-of-week from Monday through Sunday.
  scheduleSendTopicMessage('30 18 * * 1-7', 'Find your dinner place now!', 'Open lunch picker in browser now!');
};

export default cron;
