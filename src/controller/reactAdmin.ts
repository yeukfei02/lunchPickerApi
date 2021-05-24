import { Request, Response } from 'express';

import UserConnectionDetails from '../model/userConnectionDetails';
import Restaurant from '../model/restaurant';
import RestaurantDetails from '../model/restaurantDetails';
import RestaurantDetailsReview from '../model/restaurantDetailsReview';
import Category from '../model/category';
import Favourites from '../model/favourites';

export const getUserConnectionDetails = async (req: Request, res: Response): Promise<void> => {
  const data = await UserConnectionDetails.find({}).sort({ created_by: 'desc' }).limit(50);
  res
    .status(200)
    .set('X-Total-Count', data.length.toString())
    .set('Access-Control-Expose-Headers', 'X-Total-Count')
    .json(data);
};

export const getUserConnectionDetailById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const data = await UserConnectionDetails.findById(id);
  res.status(200).set('X-Total-Count', '1').set('Access-Control-Expose-Headers', 'X-Total-Count').json(data);
};

export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  const formattedData: any[] = [];

  const data = await Restaurant.find({}).sort({ created_by: 'desc' }).limit(50);
  if (data) {
    data.forEach((item: any, i: number) => {
      const obj = {
        categories: item.categories,
        transactions: item.transactions,
        created_by: item.created_by,
        updated_by: item.updated_by,
        _id: item._id,
        id: item._id,
        alias: item.alias,
        name: item.name,
        image_url: item.image_url,
        is_closed: item.is_closed,
        url: item.url,
        review_count: item.review_count,
        rating: item.rating,
        coordinates: item.coordinates,
        location: item.location,
        phone: item.phone,
        display_phone: item.display_phone,
        distance: item.distance,
        __v: item.__v,
      };
      formattedData.push(obj);
    });
  }

  res
    .status(200)
    .set('X-Total-Count', data.length.toString())
    .set('Access-Control-Expose-Headers', 'X-Total-Count')
    .json(formattedData);
};

export const getRestaurantById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const data = await Restaurant.findById(id);
  res.status(200).set('X-Total-Count', '1').set('Access-Control-Expose-Headers', 'X-Total-Count').json(data);
};

export const getRestaurantDetails = async (req: Request, res: Response): Promise<void> => {
  const formattedData: any[] = [];

  const data = await RestaurantDetails.find({}).sort({ created_by: 'desc' }).limit(50);
  if (data) {
    data.forEach((item: any, i: number) => {
      const obj = {
        categories: item.categories,
        photos: item.photos,
        hours: item.hours,
        transactions: item.transactions,
        created_by: item.created_by,
        updated_by: item.updated_by,
        _id: item._id,
        id: item._id,
        alias: item.alias,
        name: item.name,
        image_url: item.image_url,
        is_claimed: item.is_claimed,
        is_closed: item.is_closed,
        url: item.url,
        phone: item.phone,
        display_phone: item.display_phone,
        review_count: item.review_count,
        rating: item.rating,
        location: item.location,
        coordinates: item.coordinates,
        price: item.price,
        __v: item.__v,
      };
      formattedData.push(obj);
    });
  }

  res
    .status(200)
    .set('X-Total-Count', data.length.toString())
    .set('Access-Control-Expose-Headers', 'X-Total-Count')
    .json(formattedData);
};

export const getRestaurantDetailsById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const data = await RestaurantDetails.findById(id);
  res.status(200).set('X-Total-Count', '1').set('Access-Control-Expose-Headers', 'X-Total-Count').json(data);
};

export const getRestaurantDetailsReview = async (req: Request, res: Response): Promise<void> => {
  const formattedData: any[] = [];

  const data = await RestaurantDetailsReview.find({}).sort({ created_by: 'desc' }).limit(50);
  if (data) {
    data.forEach((item: any, i: number) => {
      const obj = {
        created_by: item.created_by,
        updated_by: item.updated_by,
        _id: item._id,
        id: item._id,
        url: item.url,
        text: item.text,
        rating: item.rating,
        time_created: item.time_created,
        user: item.user,
        __v: item.__v,
      };
      formattedData.push(obj);
    });
  }

  res
    .status(200)
    .set('X-Total-Count', data.length.toString())
    .set('Access-Control-Expose-Headers', 'X-Total-Count')
    .json(formattedData);
};

export const getRestaurantDetailsReviewById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const data = await RestaurantDetailsReview.findById(id);
  res.status(200).set('X-Total-Count', '1').set('Access-Control-Expose-Headers', 'X-Total-Count').json(data);
};

export const getCategory = async (req: Request, res: Response): Promise<void> => {
  const data = await Category.find({}).sort({ created_by: 'desc' }).limit(50);
  res
    .status(200)
    .set('X-Total-Count', data.length.toString())
    .set('Access-Control-Expose-Headers', 'X-Total-Count')
    .json(data);
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const data = await Category.findById(id);
  res.status(200).set('X-Total-Count', '1').set('Access-Control-Expose-Headers', 'X-Total-Count').json(data);
};

export const getFavourites = async (req: Request, res: Response): Promise<void> => {
  const data = await Favourites.find({}).sort({ created_by: 'desc' }).limit(50);
  res
    .status(200)
    .set('X-Total-Count', data.length.toString())
    .set('Access-Control-Expose-Headers', 'X-Total-Count')
    .json(data);
};

export const getFavouritesById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const data = await Favourites.findById(id);
  res.status(200).set('X-Total-Count', '1').set('Access-Control-Expose-Headers', 'X-Total-Count').json(data);
};
