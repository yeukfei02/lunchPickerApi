import * as restaurant from './restaurant';
import * as category from './category';

describe('main.test', () => {
  beforeEach(() => {
    jest.setTimeout(90000);
  });

  describe('restaurant', () => {
    test('findLocationTextByLatLong', async () => {
      try {
        const result = await restaurant.findLocationTextByLatLongTest();
        if (result && result.data) {
          expect(result.data).toBeDefined();
          expect(result.data.location).toBeDefined();
        }
      } catch (e) {
        console.log(`error = ${e.message}`);
      }
    });

    test('getAllRestaurantsByLatLong', async () => {
      try {
        const result = await restaurant.getAllRestaurantsByLatLongTest();
        if (result && result.data) {
          expect(result.data).toBeDefined();
          expect(result.data.restaurants).toBeDefined();
          expect(result.data.restaurants.businesses).toBeDefined();
        }
      } catch (e) {
        console.log(`error = ${e.message}`);
      }
    });

    test('getAllRestaurantsByLocation', async () => {
      try {
        const result = await restaurant.getAllRestaurantsByLocationTest();
        if (result && result.data) {
          expect(result.data).toBeDefined();
          expect(result.data.restaurants).toBeDefined();
          expect(result.data.restaurants.businesses).toBeDefined();
        }
      } catch (e) {
        console.log(`error = ${e.message}`);
      }
    });

    test('getRestaurantByPhone', async () => {
      try {
        const result = await restaurant.getRestaurantByPhoneTest();
        if (result && result.data) {
          expect(result.data).toBeDefined();
          expect(result.data.restaurant).toBeDefined();
        }
      } catch (e) {
        console.log(`error = ${e.message}`);
      }
    });

    test('getRestaurantDetailsById', async () => {
      try {
        const result = await restaurant.getRestaurantDetailsByIdTest();
        if (result && result.data) {
          expect(result.data).toBeDefined();
          expect(result.data.restaurantDetails).toBeDefined();
        }
      } catch (e) {
        console.log(`error = ${e.message}`);
      }
    });

    test('getRestaurantDetailsReviewById', async () => {
      try {
        const result = await restaurant.getRestaurantDetailsReviewByIdTest();
        if (result && result.data) {
          expect(result.data).toBeDefined();
          expect(result.data.restaurantDetailsReview).toBeDefined();
        }
      } catch (e) {
        console.log(`error = ${e.message}`);
      }
    });
  });

  describe('category', () => {
    test('getCategoies', async () => {
      try {
        const result = await category.getCategoiesTest();
        if (result && result.data) {
          expect(result.data).toBeDefined();
          expect(result.data.categories).toBeDefined();
        }
      } catch (e) {
        console.log(`error = ${e.message}`);
      }
    });

    test('getCategoryByAlias', async () => {
      try {
        const result = await category.getCategoryByAliasTest();
        if (result && result.data) {
          expect(result.data).toBeDefined();
          expect(result.data.category).toBeDefined();
        }
      } catch (e) {
        console.log(`error = ${e.message}`);
      }
    });
  });
});
