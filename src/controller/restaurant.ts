import { Request, Response } from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';
import axios from 'axios';

import Restaurant from '../model/restaurant';
import RestaurantDetails from '../model/restaurantDetails';
import RestaurantDetailsReview from '../model/restaurantDetailsReview';
import { addDataToUserConnectionDetails, sendSuccessResponse } from '../common/common';

async function addDataToRestaurantTable(resultData: any): Promise<void> {
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

        await restaurant.save();
      }
    });
  }
}

async function addDataToRestaurantDetailsTable(resultData: any): Promise<void> {
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
      transactions: resultData.transactions,
    });

    await restaurantDetails.save();
  }
}

async function addDataToRestaurantDetailsReviewTable(resultData: any): Promise<void> {
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

        await restaurantDetailsReview.save();
      }
    });
  }
}

export const findLocationTextByLatLong = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'findLocationTextByLatLong');

  const result = await axios.get(`https://us1.locationiq.com/v1/reverse.php`, {
    params: {
      key: process.env.LOCATION_IQ_TOKEN,
      lat: req.query.latitude,
      lon: req.query.longitude,
      format: 'json',
    },
  });
  if (!_.isEmpty(result) && !_.isEmpty(result.data)) {
    const data = {
      message: 'Find location text by lat long!',
      location: result.data,
    };
    sendSuccessResponse(res, 200, data);
  }
};

export const getAllRestaurantsByLatLong = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'getAllRestaurantsByLatLong');

  const result = await axios.get(`${process.env.YELP_HOST}/businesses/search`, {
    params: {
      term: req.query.term,
      latitude: req.query.latitude,
      longitude: req.query.longitude,
    },
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
  });
  if (!_.isEmpty(result) && !_.isEmpty(result.data)) {
    await addDataToRestaurantTable(result.data);

    const data = {
      message: 'Get all restaurants by lat long!',
      restaurants: result.data,
    };
    sendSuccessResponse(res, 200, data);
  }
};

export const getAllRestaurantsByLocation = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'getAllRestaurantsByLocation');

  const result = await axios.get(`${process.env.YELP_HOST}/businesses/search`, {
    params: {
      term: req.query.term,
      location: req.query.location,
    },
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
  });
  if (!_.isEmpty(result) && !_.isEmpty(result.data)) {
    await addDataToRestaurantTable(result.data);

    const data = {
      message: 'Get all restaurants by location!',
      restaurants: result.data,
    };
    sendSuccessResponse(res, 200, data);
  }
};

export const getRestaurantByPhone = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'getRestaurantByPhone');

  const result = await axios.get(`${process.env.YELP_HOST}/businesses/search/phone`, {
    params: {
      phone: req.query.phone,
    },
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
  });
  if (!_.isEmpty(result) && !_.isEmpty(result.data)) {
    const data = {
      message: 'Get restaurant by phone!',
      restaurant: result.data,
    };
    sendSuccessResponse(res, 200, data);
  }
};

export const getRestaurantDetailsById = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'getRestaurantDetailsById');

  const result = await axios.get(`${process.env.YELP_HOST}/businesses/${req.params.id}`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
  });

  if (!_.isEmpty(result) && !_.isEmpty(result.data)) {
    await addDataToRestaurantDetailsTable(result.data);

    const data = {
      message: 'Get restaurant details by id!',
      restaurantDetails: result.data,
    };
    sendSuccessResponse(res, 200, data);
  }
};

export const getRestaurantDetailsReviewById = async (req: Request, res: Response): Promise<void> => {
  await addDataToUserConnectionDetails(req, 'getRestaurantDetailsReviewById');

  const result = await axios.get(`${process.env.YELP_HOST}/businesses/${req.params.id}/reviews`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
  });
  if (!_.isEmpty(result) && !_.isEmpty(result.data)) {
    await addDataToRestaurantDetailsReviewTable(result.data);

    const data = {
      message: 'Get restaurant details review by id!',
      restaurantDetailsReview: result.data,
    };
    sendSuccessResponse(res, 200, data);
  }
};
