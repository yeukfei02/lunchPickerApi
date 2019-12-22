const axios = require('axios');
const mongoose = require('mongoose');
const _ = require('lodash');

const Category = require('../model/category');

module.exports.getCategories = (req, res) => {
  axios.get(`${process.env.YELP_HOST}/categories`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
    .then((result) => {
      res.status(200).json({
        message: 'Get categories!',
        categories: result.data
      });
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
