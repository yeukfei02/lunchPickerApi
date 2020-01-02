import * as express from 'express';
const app = express();
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';

let stripe: any = null;
const environment = app.get('env');
if (environment === 'development') {
  stripe = require('stripe')(process.env.STRIPE_TEST_API_KEY);
} else {
  stripe = require('stripe')(process.env.STRIPE_API_KEY);
}

import CreditCardDetails from '../model/creditCardDetails';
import { addDataToUserConnectionDetails } from '../common/common';

async function addDataToCreditCardDetails(token: string, card: any) {
  if (!_.isEmpty(token) && !_.isEmpty(card)) {
    const record = await CreditCardDetails.findOne({ token: token });
    if (_.isEmpty(record)) {
      const creditCardDetails = new CreditCardDetails({
        _id: new mongoose.Types.ObjectId(),
        token: token,
        card: card
      });

      const result = await creditCardDetails.save();
      // log("result = ", result);
    }
  }
}

export const creditCardPayment = async (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'creditCardPayment');
  addDataToCreditCardDetails(req.body.token, req.body.card);

  const charges = await stripe.charges.create({
    amount: req.body.amount,
    currency: req.body.currency,
    source: req.body.token
  });

  if (!_.isEmpty(charges)) {
    res.status(200).json({
      message: 'Stripe charges credit card payment!',
      charges: charges
    });
  } else {
    res.status(404).json({
      message: 'Not found'
    });
  }
}
