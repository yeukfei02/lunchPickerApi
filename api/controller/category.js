const axios = require('axios');
const mongoose = require('mongoose');
const _ = require('lodash');

const Category = require('../model/category');

function addDataToCategoryTable(resultData) {
  resultData.categories.map(async (item, i) => {
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
      console.log("result = ", result);
    }
  });
}

module.exports.getCategories = (req, res) => {
  axios.get(`${process.env.YELP_HOST}/categories`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
    .then((result) => {
      if (!_.isEmpty(result.data)) {
        addDataToCategoryTable(result.data);

        res.status(200).json({
          message: 'Get categories!',
          categories: result.data
        });
      }
    })
    .catch((error) => {
      console.log("error = ", error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}

module.exports.getCategoryByAlias = (req, res) => {
  axios.get(`${process.env.YELP_HOST}/categories/${req.params.alias}`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
    .then((result) => {
      res.status(200).json({
        message: 'Get category by alias!',
        category: result.data
      });
    })
    .catch((error) => {
      console.log("error = ", error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}
