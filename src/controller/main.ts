import { Request, Response } from 'express';
import { sendSuccessResponse } from '../common/common';

export const getMain = (req: Request, res: Response) => {
  const data = {
    message: 'lunchPickerApi',
  };
  sendSuccessResponse(res, 200, data);
};
