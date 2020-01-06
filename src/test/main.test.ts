
import * as restaurant from './restaurant';
import * as category from './category';

describe('main.test', () => {
  describe('restaurant', () => {
    test('findLocationTextByLatLong', () => {
      restaurant.findLocationTextByLatLong();
    });

    test('getAllRestaurantsByLatLong', () => {
      restaurant.getAllRestaurantsByLatLong();
    });

    test('getAllRestaurantsByLocation', () => {
      restaurant.getAllRestaurantsByLocation();
    });

    test('getRestaurantByPhone', () => {
      restaurant.getRestaurantByPhone();
    });

    test('getRestaurantDetailsById', () => {
      restaurant.getRestaurantDetailsById();
    });

    test('getRestaurantDetailsReviewById', () => {
      restaurant.getRestaurantDetailsReviewById();
    });
  });

  describe('category', () => {
    test('getCategoies', () => {
      category.getCategoies();
    });

    test('getCategoryByAlias', () => {
      category.getCategoryByAlias();
    });
  });
});
