import nock from 'nock';
import axios from 'axios';
import { getRootUrl } from '../helpers/helpers';

const rootUrl = getRootUrl();

export const categoryTest = (): void => {
  describe('categoryTest', () => {
    afterAll(() => {
      nock.cleanAll();
    });

    describe('getCategoriesTest', () => {
      beforeEach(() => {
        nock(rootUrl)
          .get('/category/get-categories')
          .matchHeader('Content-Type', 'application/json')
          .reply(200, {
            message: 'Get categories!',
            categories: [
              {
                parent_aliases: ['food'],
                country_whitelist: [],
                country_blacklist: ['AR', 'CL', 'IT', 'MX', 'PL', 'TR'],
                created_by: '2020-01-19T16:08:23.000Z',
                updated_by: '2020-01-19T16:08:23.000Z',
                _id: '5e247f1a90828984ac6132d8',
                alias: 'acaibowls',
                title: 'Acai Bowls',
                __v: 0,
              },
            ],
          });
      });

      it('getCategories', async () => {
        const response = await axios.get(`${rootUrl}/category/get-categories`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();
        expect(response.data.message).toBeDefined();
        expect(response.data.categories).toBeDefined();
      });
    });

    describe('getCategoryByAliasTest', () => {
      const alias = 'seafood';

      beforeEach(() => {
        nock(rootUrl)
          .get(`/category/get-categories/${alias}`)
          .matchHeader('Content-Type', 'application/json')
          .reply(200, {
            message: 'Get categories!',
            category: {
              parent_aliases: ['restaurants'],
              country_whitelist: [],
              country_blacklist: [],
              created_by: '2020-01-19T16:08:23.000Z',
              updated_by: '2020-01-19T16:08:23.000Z',
              _id: '5e247f1b90828984ac6138be',
              alias: 'seafood',
              title: 'Seafood',
              __v: 0,
            },
          });
      });

      it('getCategoryByAlias', async () => {
        const response = await axios.get(`${rootUrl}/category/get-categories/${alias}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();
        expect(response.data.message).toBeDefined();
        expect(response.data.category).toBeDefined();
      });
    });
  });
};
