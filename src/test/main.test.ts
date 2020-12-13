import {
  findLocationTextByLatLongTest,
  getAllRestaurantsByLatLongTest,
  getAllRestaurantsByLocationTest,
  getRestaurantByPhoneTest,
  getRestaurantDetailsByIdTest,
  getRestaurantDetailsReviewByIdTest,
} from './restaurant';
import { getCategoriesTest, getCategoryByAliasTest } from './category';

describe('main.test', () => {
  describe('restaurant', () => {
    it('findLocationTextByLatLong', async () => {
      try {
        const result = await findLocationTextByLatLongTest();
        if (result && result.data) {
          expect(result.data).toBeDefined();
          expect(result.data.location).toBeDefined();
        }
      } catch (e) {
        console.log(`error = ${e.message}`);
      }
    });

    it('getAllRestaurantsByLatLong', async () => {
      try {
        const result = await getAllRestaurantsByLatLongTest();
        if (result && result.data) {
          expect(result.data).toBeDefined();
          expect(result.data.restaurants).toBeDefined();
          expect(result.data.restaurants.businesses).toBeDefined();
        }
      } catch (e) {
        console.log(`error = ${e.message}`);
      }
    });

    it('getAllRestaurantsByLocation', async () => {
      try {
        const result = await getAllRestaurantsByLocationTest();
        if (result && result.data) {
          expect(result.data).toBeDefined();
          expect(result.data.restaurants).toBeDefined();
          expect(result.data.restaurants.businesses).toBeDefined();
        }
      } catch (e) {
        console.log(`error = ${e.message}`);
      }
    });

    it('getRestaurantByPhone', async () => {
      try {
        const result = await getRestaurantByPhoneTest();
        if (result && result.data) {
          expect(result.data).toBeDefined();
          expect(result.data.restaurant).toBeDefined();
        }
      } catch (e) {
        console.log(`error = ${e.message}`);
      }
    });

    it('getRestaurantDetailsById', async () => {
      try {
        const result = await getRestaurantDetailsByIdTest();
        if (result && result.data) {
          expect(result.data).toBeDefined();
          expect(result.data.restaurantDetails).toBeDefined();
        }
      } catch (e) {
        console.log(`error = ${e.message}`);
      }
    });

    it('getRestaurantDetailsReviewById', async () => {
      try {
        const result = await getRestaurantDetailsReviewByIdTest();
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
    it('getCategories', async () => {
      try {
        const result = await getCategoriesTest();
        if (result && result.data) {
          expect(result.data).toBeDefined();
          expect(result.data.categories).toBeDefined();
        }
      } catch (e) {
        console.log(`error = ${e.message}`);
      }
    });

    it('getCategoryByAlias', async () => {
      try {
        const result = await getCategoryByAliasTest();
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
