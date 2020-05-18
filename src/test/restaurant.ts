import axios from 'axios';

const ROOT_URL = 'https://lunch-picker-api.herokuapp.com/api';

export const findLocationTextByLatLongTest = async () => {
  const result = await axios.get(`${ROOT_URL}/restaurant/find-location-text-by-lat-long`, {
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

export const getAllRestaurantsByLatLongTest = async () => {
  const result = await axios.get(`${ROOT_URL}/restaurant/find-restaurants-by-lat-long`, {
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

export const getAllRestaurantsByLocationTest = async () => {
  const result = await axios.get(`${ROOT_URL}/restaurant/find-restaurants-by-location`, {
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

export const getRestaurantByPhoneTest = async () => {
  const result = await axios.get(`${ROOT_URL}/restaurant/find-restaurant-by-phone`, {
    params: {
      phone: '+85227881226',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
};

export const getRestaurantDetailsByIdTest = async () => {
  const result = await axios.get(`${ROOT_URL}/restaurant/get-restaurant-details/X7b2izv3qhklnCDjoF37tA`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
};

export const getRestaurantDetailsReviewByIdTest = async () => {
  const result = await axios.get(`${ROOT_URL}/restaurant/get-restaurant-details-review/X7b2izv3qhklnCDjoF37tA`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
};
