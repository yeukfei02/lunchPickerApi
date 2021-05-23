import AdminBro from 'admin-bro';
import AdminBroExpress from '@admin-bro/express';
import AdminBroMongoose from '@admin-bro/mongoose';
AdminBro.registerAdapter(AdminBroMongoose);

import UserConnectionDetails from '../model/userConnectionDetails';
import Restaurant from '../model/restaurant';
import RestaurantDetails from '../model/restaurantDetails';
import RestaurantDetailsReview from '../model/restaurantDetailsReview';
import Favourites from '../model/favourites';
import Category from '../model/category';

const adminBro = new AdminBro({
  resources: [
    {
      resource: UserConnectionDetails,
      options: {
        actions: {
          new: { isVisible: false },
          bulkDelete: { isVisible: false },
          edit: { isVisible: false },
          delete: { isVisible: false },
        },
      },
    },
    {
      resource: Restaurant,
      options: {
        actions: {
          new: { isVisible: false },
          bulkDelete: { isVisible: false },
          edit: { isVisible: false },
          delete: { isVisible: false },
        },
      },
    },
    {
      resource: RestaurantDetails,
      options: {
        actions: {
          new: { isVisible: false },
          bulkDelete: { isVisible: false },
          edit: { isVisible: false },
          delete: { isVisible: false },
        },
      },
    },
    {
      resource: RestaurantDetailsReview,
      options: {
        actions: {
          new: { isVisible: false },
          bulkDelete: { isVisible: false },
          edit: { isVisible: false },
          delete: { isVisible: false },
        },
      },
    },
    {
      resource: Category,
      options: {
        actions: {
          new: { isVisible: false },
          bulkDelete: { isVisible: false },
          edit: { isVisible: false },
          delete: { isVisible: false },
        },
      },
    },
    {
      resource: Favourites,
      options: {
        actions: {
          new: { isVisible: false },
          bulkDelete: { isVisible: false },
          edit: { isVisible: false },
          delete: { isVisible: false },
        },
      },
    },
  ],
  branding: {
    favicon: 'https://raw.githubusercontent.com/yeukfei02/lunchPicker/master/src/images/favicon.ico',
    companyName: 'LunchPicker',
    softwareBrothers: false,
  },
  rootPath: '/admin',
});
const router = AdminBroExpress.buildRouter(adminBro);

export default router;
