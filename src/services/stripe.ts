import mongoose from 'mongoose';
import _ from 'lodash';

import CreditCardDetails from '../model/creditCardDetails';

export const addDataToCreditCardDetailsService = async (token: string, card: any): Promise<void> => {
  if (!_.isEmpty(token) && !_.isEmpty(card)) {
    const creditCardDetails = await CreditCardDetails.findOne({ token: token });
    if (_.isEmpty(creditCardDetails)) {
      const creditCardDetails = new CreditCardDetails({
        _id: new mongoose.Types.ObjectId(),
        token: token,
        card: card,
      });
      await creditCardDetails.save();
    }
  }
};
