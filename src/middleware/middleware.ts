import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { sendErrorResponse } from '../helpers/helpers';

export const isUserLoggedIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

export const validateReactAdminRoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = !_.isEmpty(req.headers.authorization) ? req.headers.authorization : '';

  if (!_.isEmpty(token) && token === 'lunchPickerAdmin') {
    next();
  } else {
    const data = {
      message: 'validateReactAdminRoute error, please check authorization header',
    };
    sendErrorResponse(res, 400, data);
  }
};
