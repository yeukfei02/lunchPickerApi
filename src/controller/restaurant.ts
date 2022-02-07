import { Request, Response } from 'express';
import _ from 'lodash';
import axios from 'axios';

import {
  addDataToRestaurantService,
  addDataToRestaurantDetailsService,
  addDataToRestaurantDetailsReviewService,
} from '../services/restaurant';
import { addDataToUserConnectionDetails, sendSuccessResponse } from '../helpers/helpers';

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
    await addDataToRestaurantService(result.data);

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
    await addDataToRestaurantService(result.data);

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
    await addDataToRestaurantDetailsService(result.data);

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
    await addDataToRestaurantDetailsReviewService(result.data);

    const data = {
      message: 'Get restaurant details review by id!',
      restaurantDetailsReview: result.data,
    };
    sendSuccessResponse(res, 200, data);
  }
};
