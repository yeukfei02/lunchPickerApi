import { Request, Response } from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';
const DeviceDetector = require('node-device-detector');
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { createClient } from 'redis';

const expo = new Expo();

import UserConnectionDetails from '../model/userConnectionDetails';

export const getRootUrl = (): string => {
  let rootUrl = '';

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    rootUrl = 'http://localhost:3000/api';
  } else {
    rootUrl = 'https://www.lunch-picker-api.com/api';
  }

  return rootUrl;
};

export const getRedisUrl = (): string => {
  let redisUrl = '';

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    redisUrl = 'redis://127.0.0.1:6379/0';
  } else {
    if (process.env.REDIS_URL) {
      redisUrl = process.env.REDIS_URL;
    }
  }

  return redisUrl;
};

export const getRedisClient = async (): Promise<any> => {
  const redisUrl = getRedisUrl();

  const client = createClient({
    url: redisUrl,
  });
  await client.connect();

  return client;
};

export const sendSuccessResponse = (res: Response, statusCode: number, data: any): void => {
  res.set('Cache-Control', 'public, max-age=31557600');
  res.status(statusCode).json(data);
};

export const sendErrorResponse = (res: Response, statusCode: number, data: any): void => {
  res.status(statusCode).json(data);
};

export const addDataToUserConnectionDetails = async (req: Request, routeName: string): Promise<void> => {
  const userAgent = req.get('User-Agent');
  const detector = new DeviceDetector();
  const detectorUserAgentResult = detector.detect(userAgent);

  let ip = req.clientIp || req.ip;
  if (_.isEqual(ip, '::1')) {
    ip = '127.0.0.1';
  }
  if (ip.includes('::ffff:')) {
    ip = ip.replace(/::ffff:/g, '');
  }

  let os = {};
  let client = {};
  let device = {};
  if (!_.isEmpty(detectorUserAgentResult)) {
    os = detectorUserAgentResult.os;
    client = detectorUserAgentResult.client;
    device = detectorUserAgentResult.device;
  }

  const userConnectionDetails = new UserConnectionDetails({
    _id: new mongoose.Types.ObjectId(),
    ip: ip,
    os: os,
    client: client,
    device: device,
    routeName: routeName,
  });

  await userConnectionDetails.save();
};

export const expoSendPushNotification = async (
  pushNotificationTokenList: string[],
  title?: string,
  body?: string,
): Promise<void> => {
  const messages: any[] = [];

  if (pushNotificationTokenList) {
    pushNotificationTokenList.forEach((pushToken: string, i: number) => {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.log(`Push token ${pushToken} is not a valid Expo push token`);
      }

      messages.push({
        to: pushToken,
        sound: 'default',
        title: title || 'Where shoud I have lunch?',
        body: body || 'Open lunch picker now!',
        data: {},
      });
    });
  }

  const chunks = expo.chunkPushNotifications(messages);
  const tickets: any[] = [];
  if (chunks) {
    chunks.forEach(async (chunk: ExpoPushMessage[], i: number) => {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log('ticketChunk = ', ticketChunk);
        tickets.push(...ticketChunk);
      } catch (e) {
        console.log('error = ', e.message);
      }
    });
  }

  const receiptIds: any[] = [];
  if (tickets) {
    tickets.forEach((ticket: any, i: number) => {
      if (ticket && ticket.id) {
        receiptIds.push(ticket.id);
      }
    });
  }

  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  if (receiptIdChunks) {
    receiptIdChunks.forEach(async (chunk: any, i: number) => {
      try {
        const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        console.log('receipts = ', receipts);

        if (receipts) {
          for (const receiptId in receipts) {
            const { status, details } = receipts[receiptId];
            console.log('status = ', status);
            console.log('details = ', details);
          }
        }
      } catch (error) {
        console.log('error = ', error);
      }
    });
  }
};
