import { Request, Response } from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';
import axios from 'axios';

import Category from '../model/category';
import { addDataToUserConnectionDetails, sendSuccessResponse } from '../common/common';

async function addDataToCategoryTable(resultData: any): Promise<void> {
  if (!_.isEmpty(resultData.categories)) {
    resultData.categories.map(async (item: any, i: number) => {
      const record = await Category.findOne({ alias: item.alias });
      if (_.isEmpty(record)) {
        const category = new Category({
          _id: new mongoose.Types.ObjectId(),
          alias: item.alias,
          title: item.title,
          parent_aliases: item.parent_aliases,
          country_whitelist: item.country_whitelist,
          country_blacklist: item.country_blacklist,
        });

        await category.save();
      }
    });
  }
}

async function getCategoriesFromYelp(res: Response): Promise<void> {
  const result = await axios.get(`${process.env.YELP_HOST}/categories`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
  });
  if (!_.isEmpty(result) && !_.isEmpty(result.data)) {
    await addDataToCategoryTable(result.data);

    res.status(200).json({
      message: 'Get categories!',
      categories: result.data,
    });
  }
}

async function getCategoryByAliasFromYelp(req: Request, res: Response): Promise<void> {
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
    await getCategoriesFromYelp(res);
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
    await getCategoryByAliasFromYelp(req, res);
  }
};
