import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import { Timber } from "@timberio/node";

const DeviceDetector = require('node-device-detector');

import UserConnectionDetails from '../model/userConnectionDetails';

export const log = (message: string, item: any) => {
  console.log(message, item);

  // timber
  const timber = new Timber(process.env.TIMBER_API_KEY, process.env.TIMBER_SOURCE_ID);
  if (typeof item === 'object') {
    timber.log(`${message} ${JSON.stringify(item)}`);
  } else if (typeof item === 'string') {
    timber.log(`${message} ${item}`);
  }
}

export const addDataToUserConnectionDetails = async (req: Request, routeName: string) => {
  const userAgent = req.get('User-Agent');
  const detector = new DeviceDetector;
  const detectorUserAgentResult = detector.detect(userAgent);

  let ip = req.clientIp;
  if (_.isEqual(ip, "::1")) {
    ip = "127.0.0.1";
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
    routeName: routeName
  });

  const result = await userConnectionDetails.save();
  // log("result = ", result);
}
