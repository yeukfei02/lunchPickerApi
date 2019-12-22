const axios = require('axios');
const mongoose = require('mongoose');
const _ = require('lodash');

const Restaurant = require('../model/restaurant');

module.exports.getAllRestaurantsByLatLong = (req, res) => {
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
        message: 'Get all restaurants by lat long!',
        restaurants: result.data
      });
    })
    .catch((error) => {
      console.log("error = ", error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}

module.exports.getAllRestaurantsByLocation = (req, res) => {
  axios.get(`${process.env.YELP_HOST}/businesses/search`, {
    params: {
      term: req.query.food,
      location: req.query.location
    },
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
    .then((result) => {
      res.status(200).json({
        message: 'Get all restaurants by location!',
        restaurants: result.data
      });
    })
    .catch((error) => {
      console.log("error = ", error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}

module.exports.getRestaurantByPhone = (req, res) => {
  axios.get(`${process.env.YELP_HOST}/businesses/search/phone`, {
    params: {
      phone: req.query.phone
    },
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
    .then((result) => {
      res.status(200).json({
        message: 'Get restaurant by phone!',
        restaurant: result.data
      });
    })
    .catch((error) => {
      console.log("error = ", error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}

module.exports.getRestaurantDetailsById = (req, res) => {
  axios.get(`${process.env.YELP_HOST}/businesses/${req.params.id}`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
    .then((result) => {
      res.status(200).json({
        message: 'Get restaurant details by id!',
        restaurantDetails: result.data
      });
    })
    .catch((error) => {
      console.log("error = ", error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}

module.exports.getRestaurantDetailsReviewById = (req, res) => {
  axios.get(`${process.env.YELP_HOST}/businesses/${req.params.id}/reviews`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
    .then((result) => {
      res.status(200).json({
        message: 'Get restaurant details review by id!',
        restaurantDetailsReview: result.data
      });
    })
    .catch((error) => {
      console.log("error = ", error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}

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
