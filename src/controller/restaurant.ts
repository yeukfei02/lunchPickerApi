import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';
const axios = require('axios');

import * as env from 'dotenv';
env.config();

import Restaurant from '../model/restaurant';
import RestaurantDetails from '../model/restaurantDetails';
import RestaurantDetailsReview from '../model/restaurantDetailsReview';
import { addDataToUserConnectionDetails } from '../common/common';

async function addDataToRestaurantTable(resultData: any) {
  if (!_.isEmpty(resultData.businesses)) {
    resultData.businesses.map(async (item: any, i: number) => {
      const record = await Restaurant.findOne({ id: item.id });
      if (_.isEmpty(record)) {
        const restaurant = new Restaurant({
          _id: new mongoose.Types.ObjectId(),
          id: item.id,
          alias: item.alias,
          name: item.name,
          image_url: item.image_url,
          is_closed: item.is_closed,
          url: item.url,
          review_count: item.review_count,
          categories: item.categories,
          rating: item.rating,
          coordinates: item.coordinates,
          transactions: item.transactions,
          price: item.price,
          location: item.location,
          phone: item.phone,
          display_phone: item.display_phone,
          distance: item.distance,
        });

        const result = await restaurant.save();
        // console.log("result = ", result);
      }
    });
  }
}

async function addDataToRestaurantDetailsTable(resultData: any) {
  const record = await RestaurantDetails.findOne({ id: resultData.id });
  if (_.isEmpty(record)) {
    const restaurantDetails = new RestaurantDetails({
      _id: new mongoose.Types.ObjectId(),
      id: resultData.id,
      alias: resultData.alias,
      name: resultData.name,
      image_url: resultData.image_url,
      is_claimed: resultData.is_claimed,
      is_closed: resultData.is_closed,
      url: resultData.url,
      phone: resultData.phone,
      display_phone: resultData.display_phone,
      review_count: resultData.review_count,
      categories: resultData.categories,
      rating: resultData.rating,
      location: resultData.location,
      coordinates: resultData.coordinates,
      photos: resultData.photos,
      price: resultData.price,
      hours: resultData.hours,
      transactions: resultData.transactions
    });

    const result = await restaurantDetails.save();
    // console.log("result = ", result);
  }
}

async function addDataToRestaurantDetailsReviewTable(resultData: any) {
  if (!_.isEmpty(resultData.reviews)) {
    resultData.reviews.map(async (item: any, i: number) => {
      const record = await RestaurantDetailsReview.findOne({ id: item.id });
      if (_.isEmpty(record)) {
        const restaurantDetailsReview = new RestaurantDetailsReview({
          _id: new mongoose.Types.ObjectId(),
          id: item.id,
          url: item.url,
          text: item.text,
          rating: item.rating,
          time_created: item.time_created,
          user: item.user,
        });

        const result = await restaurantDetailsReview.save();
        // console.log("result = ", result);
      }
    });
  }
}

export const getAllRestaurantsByLatLong = (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'getAllRestaurantsByLatLong');
  axios.get(`${process.env.YELP_HOST}/businesses/search`,
    {
      params: {
        term: req.query.term,
        latitude: req.query.latitude,
        longitude: req.query.longitude,
      },
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
      }
    }
  )
    .then((result: any) => {
      if (!_.isEmpty(result.data)) {
        addDataToRestaurantTable(result.data);

        res.status(200).json({
          message: 'Get all restaurants by lat long!',
          restaurants: result.data
        });
      }
    })
    .catch((error: any) => {
      console.log("error = ", error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}

export const getAllRestaurantsByLocation = (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'getAllRestaurantsByLocation');
  axios.get(`${process.env.YELP_HOST}/businesses/search`,
    {
      params: {
        term: req.query.term,
        location: req.query.location
      },
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
      }
    }
  )
    .then((result: any) => {
      if (!_.isEmpty(result.data)) {
        addDataToRestaurantTable(result.data);

        res.status(200).json({
          message: 'Get all restaurants by location!',
          restaurants: result.data
        });
      }
    })
    .catch((error: any) => {
      console.log("error = ", error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}

export const getRestaurantByPhone = (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'getRestaurantByPhone');
  axios.get(`${process.env.YELP_HOST}/businesses/search/phone`,
    {
      params: {
        phone: req.query.phone
      },
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
      }
    }
  )
    .then((result: any) => {
      res.status(200).json({
        message: 'Get restaurant by phone!',
        restaurant: result.data
      });
    })
    .catch((error: any) => {
      console.log("error = ", error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}

export const getRestaurantDetailsById = (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'getRestaurantDetailsById');
  axios.get(`${process.env.YELP_HOST}/businesses/${req.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
      }
    }
  )
    .then((result: any) => {
      if (!_.isEmpty(result.data)) {
        addDataToRestaurantDetailsTable(result.data);

        res.status(200).json({
          message: 'Get restaurant details by id!',
          restaurantDetails: result.data
        });
      }
    })
    .catch((error: any) => {
      console.log("error = ", error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}

export const getRestaurantDetailsReviewById = (req: Request, res: Response) => {
  addDataToUserConnectionDetails(req, 'getRestaurantDetailsReviewById');
  axios.get(`${process.env.YELP_HOST}/businesses/${req.params.id}/reviews`,
    {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
      }
    }
  )
    .then((result: any) => {
      if (!_.isEmpty(result.data)) {
        addDataToRestaurantDetailsReviewTable(result.data);

        res.status(200).json({
          message: 'Get restaurant details review by id!',
          restaurantDetailsReview: result.data
        });
      }
    })
    .catch((error: any) => {
      console.log("error = ", error);
      res.status(404).json({
        message: 'Not found'
      });
    });
}
