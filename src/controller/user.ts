import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import User from '../model/user';
import { log, addDataToUserConnectionDetails, sendSuccessResponse, sendErrorResponse } from '../common/common';

async function addDataToUserTable(email: string, password: string) {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: email,
    password: bcrypt.hashSync(password, 10),
  });

  const result = await user.save();
  // log("result = ", result);
}

export const signup = async (req: Request, res: Response) => {
  await addDataToUserConnectionDetails(req, 'signup');

  const email = req.body.email;
  const password = req.body.password;

  if (!_.isEmpty(email) && !_.isEmpty(password)) {
    const record = await User.findOne({ email: email });
    if (_.isEmpty(record)) {
      await addDataToUserTable(email, password);

      const data = {
        message: 'signup success!',
      };
      sendSuccessResponse(res, 200, data);
    } else {
      const data = {
        message: 'signup error, email already exists',
      };
      sendErrorResponse(res, 400, data);
    }
  }
};

export const login = async (req: Request, res: Response) => {
  await addDataToUserConnectionDetails(req, 'login');

  const email = req.body.email;
  const password = req.body.password;

  if (!_.isEmpty(email) && !_.isEmpty(password)) {
    const user = await User.findOne({ email: email });
    if (!_.isEmpty(user)) {
      const userPasswordFromDB = user.get('password');
      if (bcrypt.compareSync(password, userPasswordFromDB)) {
        const token = jwt.sign(
          {
            id: uuidv4(),
          },
          process.env.JWT_SECRET,
          { expiresIn: '1d' },
        );

        const data = {
          message: 'login success',
          token: token,
        };
        sendSuccessResponse(res, 201, data);
      } else {
        const data = {
          message: 'login error, password is not correct',
        };
        sendErrorResponse(res, 400, data);
      }
    } else {
      const data = {
        message: 'login error, cannot find user by email',
      };
      sendErrorResponse(res, 400, data);
    }
  }
};
