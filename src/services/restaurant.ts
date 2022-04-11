import mongoose from 'mongoose';
import _ from 'lodash';

import Restaurant from '../model/restaurant';
import RestaurantDetails from '../model/restaurantDetails';
import RestaurantDetailsReview from '../model/restaurantDetailsReview';

export const addDataToRestaurantService = async (resultData: any): Promise<void> => {
  if (!_.isEmpty(resultData.businesses)) {
    resultData.businesses.map(async (item: any, i: number) => {
      const restaurant = await Restaurant.findOne({ id: item.id });
      if (_.isEmpty(restaurant)) {
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
};

export const addDataToRestaurantDetailsService = async (resultData: any): Promise<void> => {
  const restaurantDetails = await RestaurantDetails.findOne({ id: resultData.id });
  if (_.isEmpty(restaurantDetails)) {
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
};

export const addDataToRestaurantDetailsReviewService = async (resultData: any): Promise<void> => {
  if (!_.isEmpty(resultData.reviews)) {
    resultData.reviews.map(async (item: any, i: number) => {
      const restaurantDetailsReview = await RestaurantDetailsReview.findOne({ id: item.id });
      if (_.isEmpty(restaurantDetailsReview)) {
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
};
