import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';

import { sendErrorResponse } from '../common/common';

export const isUserLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  const token = !_.isEmpty(req.headers.authorization) ? req.headers.authorization.substring(7).trim() : '';

  if (!_.isEmpty(token)) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!_.isEmpty(decoded)) {
        next();
      }
    } catch (e) {
      const data = {
        message: `isUserLoggedIn error, error = ${e.message}`,
      };
      sendErrorResponse(res, 400, data);
    }
  } else {
    const data = {
      message: 'isUserLoggedIn error, please add bearer token',
    };
    sendErrorResponse(res, 400, data);
  }
};
