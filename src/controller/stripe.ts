import { Request, Response } from 'express';
const stripe = require('stripe')('sk_test_Llfx6jVThxkkhFswpevUfLV500zBExuxmU');
import * as _ from 'lodash';

import { log } from '../common/common';

export const getClientSecret = async (req: Request, res: Response) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'sgd',
  });

  res.status(200).json({
    message: 'Get stripe client secret!',
    clientSecret: paymentIntent
  });
}
