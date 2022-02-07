import { Request, Response } from 'express';
import _ from 'lodash';
import axios from 'axios';

import Category from '../model/category';
import { addDataToCategoryService } from '../services/category';
import { addDataToUserConnectionDetails, sendSuccessResponse } from '../helpers/helpers';

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'getCategories');

  const result = await Category.find({});
  if (!_.isEmpty(result)) {
    const data = {
      message: 'Get categories!',
      categories: result,
    };
    sendSuccessResponse(res, 200, data);
  } else {
    const result = await axios.get(`${process.env.YELP_HOST}/categories`, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });
    if (!_.isEmpty(result) && !_.isEmpty(result.data)) {
      await addDataToCategoryService(result.data);

      res.status(200).json({
        message: 'Get categories!',
        categories: result.data,
      });
    }
  }
};

export const getCategoryByAlias = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'getCategoryByAlias');

  const result = await Category.findOne({ alias: req.params.alias });
  if (!_.isEmpty(result)) {
    const data = {
      message: 'Get categories!',
      category: result,
    };
    sendSuccessResponse(res, 200, data);
  } else {
    const result = await axios.get(`${process.env.YELP_HOST}/categories/${req.params.alias}`, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });
    if (!_.isEmpty(result) && !_.isEmpty(result.data)) {
      res.status(200).json({
        message: 'Get category by alias!',
        category: result.data,
      });
    }
  }
};
