import { Request, Response } from 'express';
import { sendSuccessResponse } from '../helpers/helpers';

export const getMain = (req: Request, res: Response): void => {
  const data = {
    message: 'lunchPickerApi',
  };
  sendSuccessResponse(res, 200, data);
};
