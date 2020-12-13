import restaurant from './restaurant';
import category from './category';

describe('main.test', () => {
  beforeAll(() => {
    jest.setTimeout(60000);
  });

  describe('restaurant', () => {
    it('findLocationTextByLatLong', async () => {
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

    it('getAllRestaurantsByLatLong', async () => {
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

    it('getAllRestaurantsByLocation', async () => {
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

    it('getRestaurantByPhone', async () => {
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

    it('getRestaurantDetailsById', async () => {
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

    it('getRestaurantDetailsReviewById', async () => {
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
    it('getCategoies', async () => {
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

    it('getCategoryByAlias', async () => {
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
