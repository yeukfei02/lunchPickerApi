import nock from 'nock';
import axios from 'axios';
import { getRootUrl } from '../helpers/helpers';

const rootUrl = getRootUrl();

export const userTest = (): void => {
  describe('userTest', () => {
    afterAll(() => {
      nock.cleanAll();
    });

    describe('signupTest', () => {
      beforeEach(() => {
        const body = {
          email: 'test@test.com',
          password: 'test',
        };

        nock(rootUrl).post('/user/signup', body).matchHeader('Content-Type', 'application/json').reply(200, {
          message: 'signup success!',
        });
      });

      it('signup', async () => {
        const response = await axios.post(
          `${rootUrl}/user/signup`,
          { email: 'test@test.com', password: 'test' },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();
        expect(response.data.message).toEqual('signup success!');
      });
    });

    describe('loginTest', () => {
      beforeEach(() => {
        const body = {
          email: 'test@test.com',
          password: 'test',
        };

        nock(rootUrl).post('/user/login', body).matchHeader('Content-Type', 'application/json').reply(200, {
          message: 'login success!',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFmZGQ5OTAyLWU3NzUtNDUxNC1hYjZkLTcxMDRhNDA5MzdkZCIsImlhdCI6MTU5MDI0NjI5NSwiZXhwIjoxNTkwMzMyNjk1fQ.LlfXo9EEuzRfQOQyzYLgFIt1FITjftDE-_Al7uK3FSM',
        });
      });

      it('login', async () => {
        const response = await axios.post(
          `${rootUrl}/user/login`,
          { email: 'test@test.com', password: 'test' },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();
        expect(response.data.message).toEqual('login success!');
        expect(response.data.token).toBeDefined();
      });
    });

    describe('usersTest', () => {
      beforeEach(() => {
        nock(rootUrl)
          .get('/user')
          .matchHeader('Content-Type', 'application/json')
          .reply(200, {
            message: 'Get all user!',
            users: [
              {
                created_by: '2020-05-23T14:38:46.000Z',
                updated_by: '2020-05-23T14:38:46.000Z',
                _id: '5ec935790211501aa8a4882f',
                email: 'test@test.com',
                password: '$2b$10$UeOEeTGeDWt.9jNtrbYUauF50mfb38m1icpwavRMnRMNKwTGPTMNC',
                __v: 0,
              },
            ],
          });
      });

      it('users', async () => {
        const response = await axios.get(`${rootUrl}/user`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();
        expect(response.data.message).toEqual('Get all user!');
        expect(response.data.users).toBeDefined();
      });
    });
  });
};
