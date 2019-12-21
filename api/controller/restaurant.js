const axios = require('axios');
const mongoose = require('mongoose');
const _ = require('lodash');

const Restaurant = require('../model/restaurant');

module.exports.getAllRestaurants = (req, res) => {
  axios.get(`${process.env.YELP_HOST}/businesses/search`, {
    params: {
      term: req.query.food,
      latitude: req.query.latitude,
      longitude: req.query.longitude,
    },
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
    .then((result) => {
      res.status(200).json({
        message: 'Get all restaurants!',
        restaurants: result.data
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: 'Not found'
      });
    });
}
