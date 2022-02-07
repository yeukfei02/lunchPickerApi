import mongoose from 'mongoose';
import _ from 'lodash';

import Category from '../model/category';

export const addDataToCategoryService = async (resultData: any): Promise<void> => {
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
};
