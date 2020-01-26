import * as _ from 'lodash';
import axios from 'axios';

const ROOT_URL = 'https://lunch-picker-api.herokuapp.com/api';

export const findLocationTextByLatLong = async () => {
  const result = await axios.get(`${ROOT_URL}/restaurant/find-location-text-by-lat-long`, {
    params: {
      latitude: 1.3104729000000002,
      longitude: 103.8577962,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!_.isEmpty(result.data)) {
    expect(result.data).toBeDefined();
    expect(result.data.location).toBeDefined();
  }
};

export const getAllRestaurantsByLatLong = async () => {
  const result = await axios.get(`${ROOT_URL}/restaurant/find-restaurants-by-lat-long`, {
    params: {
      term: 'food',
      latitude: 1.30916,
      longitude: 103.85213,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!_.isEmpty(result.data)) {
    expect(result.data).toBeDefined();
    expect(result.data.restaurants).toBeDefined();
    expect(result.data.restaurants.businesses).toBeDefined();
  }
};

export const getAllRestaurantsByLocation = async () => {
  const result = await axios.get(`${ROOT_URL}/restaurant/find-restaurants-by-location`, {
    params: {
      term: 'food',
      location: 'hong kong central',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!_.isEmpty(result.data)) {
    expect(result.data).toBeDefined();
    expect(result.data.restaurants).toBeDefined();
    expect(result.data.restaurants.businesses).toBeDefined();
  }
};

export const getRestaurantByPhone = async () => {
  const result = await axios.get(`${ROOT_URL}/restaurant/find-restaurant-by-phone`, {
    params: {
      phone: '+85227881226',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!_.isEmpty(result.data)) {
    expect(result.data).toBeDefined();
    expect(result.data.restaurant).toBeDefined();
  }
};

export const getRestaurantDetailsById = async () => {
  const result = await axios.get(`${ROOT_URL}/restaurant/get-restaurant-details/X7b2izv3qhklnCDjoF37tA`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!_.isEmpty(result.data)) {
    expect(result.data).toBeDefined();
    expect(result.data.restaurantDetails).toBeDefined();
  }
};

export const getRestaurantDetailsReviewById = async () => {
  const result = await axios.get(`${ROOT_URL}/restaurant/get-restaurant-details-review/X7b2izv3qhklnCDjoF37tA`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!_.isEmpty(result.data)) {
    expect(result.data).toBeDefined();
    expect(result.data.restaurantDetailsReview).toBeDefined();
  }
};
