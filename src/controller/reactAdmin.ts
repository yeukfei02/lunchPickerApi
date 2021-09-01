import { Request, Response } from 'express';

import UserConnectionDetails from '../model/userConnectionDetails';
import Restaurant from '../model/restaurant';
import RestaurantDetails from '../model/restaurantDetails';
import RestaurantDetailsReview from '../model/restaurantDetailsReview';
import Category from '../model/category';
import Favourites from '../model/favourites';

export const getUserConnectionDetails = async (req: Request, res: Response): Promise<void> => {
  const start = parseInt(req.query._start, 10);
  const end = parseInt(req.query._end, 10);
  const limit = end - start;

  const obj: any = {};
  const id = req.query.id;
  const ip = req.query.ip;
  if (id) {
    obj._id = id;
  }
  if (ip) {
    obj.ip = { $regex: ip, $options: 'i' };
  }

  let sortField = req.query._sort;
  const order = req.query._order;
  const sortObj: any = {};
  if (sortField === 'id') {
    sortField = '_id';
  }
  sortObj[sortField] = order ? order.toLowerCase() : '';

  const data = await UserConnectionDetails.find(obj).sort(sortObj).skip(start).limit(limit);
  res
    .status(200)
    .set('X-Total-Count', data.length.toString())
    .set('Access-Control-Expose-Headers', 'X-Total-Count')
    .json(data);
};

export const getUserConnectionDetailById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const data = await UserConnectionDetails.findById(id);
  res.status(200).json(data);
};

export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  const start = parseInt(req.query._start, 10);
  const end = parseInt(req.query._end, 10);
  const limit = end - start;

  const obj: any = {};
  const id = req.query.id;
  const name = req.query.name;
  const rating = req.query.rating;
  if (id) {
    obj._id = id;
  }
  if (name) {
    obj.name = { $regex: name, $options: 'i' };
  }
  if (rating) {
    obj.rating = { $gte: rating };
  }

  let sortField = req.query._sort;
  const order = req.query._order;
  const sortObj: any = {};
  if (sortField === 'id') {
    sortField = '_id';
  }
  sortObj[sortField] = order ? order.toLowerCase() : '';

  const formattedData: any[] = [];

  const data = await Restaurant.find(obj).sort(sortObj).skip(start).limit(limit);
  if (data) {
    data.forEach((item: any, i: number) => {
      const obj = {
        categories: item.categories,
        transactions: item.transactions,
        created_at: item.created_at,
        updated_at: item.updated_at,
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
    .set('X-Total-Count', formattedData.length.toString())
    .set('Access-Control-Expose-Headers', 'X-Total-Count')
    .json(formattedData);
};

export const getRestaurantById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const data = await Restaurant.findById(id);
  res.status(200).json(data);
};

export const getRestaurantDetails = async (req: Request, res: Response): Promise<void> => {
  const start = parseInt(req.query._start, 10);
  const end = parseInt(req.query._end, 10);
  const limit = end - start;

  const obj: any = {};
  const id = req.query.id;
  const name = req.query.name;
  const rating = req.query.rating;
  if (id) {
    obj._id = id;
  }
  if (name) {
    obj.name = { $regex: name, $options: 'i' };
  }
  if (rating) {
    obj.rating = { $gte: rating };
  }

  let sortField = req.query._sort;
  const order = req.query._order;
  const sortObj: any = {};
  if (sortField === 'id') {
    sortField = '_id';
  }
  sortObj[sortField] = order ? order.toLowerCase() : '';

  const formattedData: any[] = [];

  const data = await RestaurantDetails.find(obj).sort(sortObj).skip(start).limit(limit);
  if (data) {
    data.forEach((item: any, i: number) => {
      const obj = {
        categories: item.categories,
        photos: item.photos,
        hours: item.hours,
        transactions: item.transactions,
        created_at: item.created_at,
        updated_at: item.updated_at,
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
    .set('X-Total-Count', formattedData.length.toString())
    .set('Access-Control-Expose-Headers', 'X-Total-Count')
    .json(formattedData);
};

export const getRestaurantDetailsById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const data = await RestaurantDetails.findById(id);
  res.status(200).json(data);
};

export const getRestaurantDetailsReview = async (req: Request, res: Response): Promise<void> => {
  const start = parseInt(req.query._start, 10);
  const end = parseInt(req.query._end, 10);
  const limit = end - start;

  const obj: any = {};
  const id = req.query.id;
  const text = req.query.text;
  const rating = req.query.rating;
  if (id) {
    obj._id = id;
  }
  if (text) {
    obj.text = { $regex: text, $options: 'i' };
  }
  if (rating) {
    obj.rating = { $gte: rating };
  }

  let sortField = req.query._sort;
  const order = req.query._order;
  const sortObj: any = {};
  if (sortField === 'id') {
    sortField = '_id';
  }
  sortObj[sortField] = order ? order.toLowerCase() : '';

  const formattedData: any[] = [];

  const data = await RestaurantDetailsReview.find(obj).sort(sortObj).skip(start).limit(limit);
  if (data) {
    data.forEach((item: any, i: number) => {
      const obj = {
        created_at: item.created_at,
        updated_at: item.updated_at,
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
    .set('X-Total-Count', formattedData.length.toString())
    .set('Access-Control-Expose-Headers', 'X-Total-Count')
    .json(formattedData);
};

export const getRestaurantDetailsReviewById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const data = await RestaurantDetailsReview.findById(id);
  res.status(200).json(data);
};

export const getCategory = async (req: Request, res: Response): Promise<void> => {
  const start = parseInt(req.query._start, 10);
  const end = parseInt(req.query._end, 10);
  const limit = end - start;

  const obj: any = {};
  const id = req.query.id;
  const title = req.query.title;
  const alias = req.query.alias;
  if (id) {
    obj._id = id;
  }
  if (title) {
    obj.title = { $regex: title, $options: 'i' };
  }
  if (alias) {
    obj.alias = { $regex: alias, $options: 'i' };
  }

  let sortField = req.query._sort;
  const order = req.query._order;
  const sortObj: any = {};
  if (sortField === 'id') {
    sortField = '_id';
  }
  sortObj[sortField] = order ? order.toLowerCase() : '';

  const data = await Category.find(obj).sort(sortObj).skip(start).limit(limit);
  res
    .status(200)
    .set('X-Total-Count', data.length.toString())
    .set('Access-Control-Expose-Headers', 'X-Total-Count')
    .json(data);
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const data = await Category.findById(id);
  res.status(200).json(data);
};

export const getFavourites = async (req: Request, res: Response): Promise<void> => {
  const start = parseInt(req.query._start, 10);
  const end = parseInt(req.query._end, 10);
  const limit = end - start;

  const obj: any = {};
  const id = req.query.id;
  const ip = req.query.ip;
  if (id) {
    obj._id = id;
  }
  if (ip) {
    obj.ip = { $regex: ip, $options: 'i' };
  }

  let sortField = req.query._sort;
  const order = req.query._order;
  const sortObj: any = {};
  if (sortField === 'id') {
    sortField = '_id';
  }
  sortObj[sortField] = order ? order.toLowerCase() : '';

  const data = await Favourites.find(obj).sort(sortObj).skip(start).limit(limit);
  res
    .status(200)
    .set('X-Total-Count', data.length.toString())
    .set('Access-Control-Expose-Headers', 'X-Total-Count')
    .json(data);
};

export const getFavouritesById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const data = await Favourites.findById(id);
  res.status(200).json(data);
};
