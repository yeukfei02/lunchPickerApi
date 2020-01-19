import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';
const axios = require('axios');

import Category from '../model/category';
import {
  log,
  addDataToUserConnectionDetails,
  sendSuccessResponse,
  sendErrorResponse
} from '../common/common';

function addDataToCategoryTable(resultData: any) {
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

        const result = await category.save();
        // log("result = ", result);
      }
    });
  }
}

function getCategoriesFromYelp(res: Response) {
  axios.get(`${process.env.YELP_HOST}/categories`,
    {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
      }
    }
  )
    .then((result: any) => {
      if (!_.isEmpty(result.data)) {
        addDataToCategoryTable(result.data);

        res.status(200).json({
          message: 'Get categories!',
          categories: result.data
        });
      }
    })
    .catch((error: any) => {
      log("error = ", error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}

function getCategoryByAliasFromYelp(req: Request, res: Response) {
  axios.get(`${process.env.YELP_HOST}/categories/${req.params.alias}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
      }
    }
  )
    .then((result: any) => {
      res.status(200).json({
        message: 'Get category by alias!',
        category: result.data
      });
    })
    .catch((error: any) => {
      log("error = ", error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}

export const getCategories = (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'getCategories');

  Category.find({})
    .then((result: any) => {
      if (!_.isEmpty(result)) {
        const data = {
          message: 'Get categories!',
          categories: result
        };
        sendSuccessResponse(res, 200, data);
      } else {
        getCategoriesFromYelp(res);
      }
    })
    .catch((error: any) => {
      log("error = ", error);
      const data = {
        message: 'Not found'
      };
      sendErrorResponse(res, 404, data);
    });
}

export const getCategoryByAlias = (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'getCategoryByAlias');

  Category.findOne({ alias: req.params.alias })
    .then((result: any) => {
      if (!_.isEmpty(result)) {
        const data = {
          message: 'Get categories!',
          category: result
        };
        sendSuccessResponse(res, 200, data);
      } else {
        getCategoryByAliasFromYelp(req, res);
      }
    })
    .catch((error: any) => {
      log("error = ", error);
      const data = {
        message: 'Not found'
      };
      sendErrorResponse(res, 404, data);
    });
}
