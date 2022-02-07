import { Request, Response } from 'express';
import Stripe from 'stripe';
import _ from 'lodash';

let stripe: Stripe = null;
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  stripe = new Stripe(process.env.STRIPE_TEST_API_KEY);
} else {
  stripe = new Stripe(process.env.STRIPE_API_KEY);
}

import { addDataToCreditCardDetailsService } from '../services/stripe';
import { addDataToUserConnectionDetails, sendSuccessResponse, sendErrorResponse } from '../helpers/helpers';

export const creditCardPayment = async (req: Request, res: Response) => {
  await addDataToUserConnectionDetails(req, 'creditCardPayment');
  await addDataToCreditCardDetailsService(req.body.token, req.body.card);

  const charges = await stripe.charges.create({
    amount: req.body.amount,
    currency: req.body.currency,
    source: req.body.token,
  });

  if (!_.isEmpty(charges)) {
    const data = {
      message: 'Stripe charges credit card payment!',
      charges: charges,
    };
    sendSuccessResponse(res, 200, data);
  } else {
    const data = {
      message: 'Not found',
    };
    sendErrorResponse(res, 404, data);
  }
};
