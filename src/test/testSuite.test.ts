import { userTest } from './user';
import { categoryTest } from './category';
import { restaurantTest } from './restaurant';

describe('testSuite test case', () => {
  userTest();
  restaurantTest();
  categoryTest();
});
