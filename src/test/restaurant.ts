import axios, { AxiosResponse } from 'axios';
import { getRootUrl } from '../common/common';

const rootUrl = getRootUrl();

export const findLocationTextByLatLongTest = async (): Promise<AxiosResponse<any>> => {
  const result = await axios.get(`${rootUrl}/restaurant/find-location-text-by-lat-long`, {
    params: {
      latitude: 1.3104729000000002,
      longitude: 103.8577962,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
};

export const getAllRestaurantsByLatLongTest = async (): Promise<AxiosResponse<any>> => {
  const result = await axios.get(`${rootUrl}/restaurant/find-restaurants-by-lat-long`, {
    params: {
      term: 'chinese',
      latitude: 1.30916,
      longitude: 103.85213,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
};

export const getAllRestaurantsByLocationTest = async (): Promise<AxiosResponse<any>> => {
  const result = await axios.get(`${rootUrl}/restaurant/find-restaurants-by-location`, {
    params: {
      term: 'chinese',
      location: 'hong kong central',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
};

export const getRestaurantByPhoneTest = async (): Promise<AxiosResponse<any>> => {
  const result = await axios.get(`${rootUrl}/restaurant/find-restaurant-by-phone`, {
    params: {
      phone: '+85227881226',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
};

export const getRestaurantDetailsByIdTest = async (): Promise<AxiosResponse<any>> => {
  const result = await axios.get(`${rootUrl}/restaurant/get-restaurant-details/X7b2izv3qhklnCDjoF37tA`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
};

export const getRestaurantDetailsReviewByIdTest = async (): Promise<AxiosResponse<any>> => {
  const result = await axios.get(`${rootUrl}/restaurant/get-restaurant-details-review/X7b2izv3qhklnCDjoF37tA`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
};
