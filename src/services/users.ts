import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import User from '../model/user';

export const addDataToUserService = async (email: string, password: string): Promise<void> => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: email,
    password: bcrypt.hashSync(password, 10),
  });
  await user.save();
};
