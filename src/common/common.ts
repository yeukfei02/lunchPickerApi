import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';
const DeviceDetector = require('node-device-detector');

import UserConnectionDetails from '../model/userConnectionDetails';

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
  // console.log("result = ", result);
}
