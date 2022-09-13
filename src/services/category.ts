import mongoose from 'mongoose';
import _ from 'lodash';

import Category from '../model/category';

export const addDataToCategoryService = async (resultData: any): Promise<void> => {
  if (!_.isEmpty(resultData.categories)) {
    for (let index = 0; index < resultData.categories.length; index++) {
      const item = resultData.categories[index];

      const category = await Category.findOne({ alias: item.alias });
      if (_.isEmpty(category)) {
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
    }
  }
};
