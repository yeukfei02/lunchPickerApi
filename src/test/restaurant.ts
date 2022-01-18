import nock from 'nock';
import axios from 'axios';
import { getRootUrl } from '../helpers/helpers';

const rootUrl = getRootUrl();

export const restaurantTest = (): void => {
  describe('restaurantTest', () => {
    let id = '';

    afterAll(() => {
      nock.cleanAll();
    });

    describe('findLocationTextByLatLongTest', () => {
      beforeEach(() => {
        nock(rootUrl)
          .get('/restaurant/find-location-text-by-lat-long')
          .query({
            latitude: 1.3104729000000002,
            longitude: 103.8577962,
          })
          .matchHeader('Content-Type', 'application/json')
          .reply(200, {
            message: 'Find location text by lat long!',
            location: {
              place_id: '170105450',
              licence: 'https://locationiq.com/attribution',
              osm_type: 'way',
              osm_id: '361108619',
              lat: '1.31071175',
              lon: '103.858044570101',
              display_name: 'Boulevard Tower, 8, Kitchener Link, Kallang, Singapore, Central Region, 207225, Singapore',
              address: {
                building: 'Boulevard Tower',
                house_number: '8',
                road: 'Kitchener Link',
                suburb: 'Kallang',
                city: 'Singapore',
                county: 'Central Region',
                postcode: '207225',
                country: 'Singapore',
                country_code: 'sg',
              },
              boundingbox: ['1.3105444', '1.3108789', '103.8578806', '103.8582124'],
            },
          });
      });

      it('findLocationTextByLatLong', async () => {
        const response = await axios.get(`${rootUrl}/restaurant/find-location-text-by-lat-long`, {
          params: {
            latitude: 1.3104729000000002,
            longitude: 103.8577962,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();
        expect(response.data.message).toBeDefined();
        expect(response.data.location).toBeDefined();
      });
    });

    describe('getAllRestaurantsByLatLongTest', () => {
      beforeEach(() => {
        nock(rootUrl)
          .get('/restaurant/find-restaurants-by-lat-long')
          .query({
            term: 'chinese',
            latitude: 1.30916,
            longitude: 103.85213,
          })
          .matchHeader('Content-Type', 'application/json')
          .reply(200, {
            message: 'Get all restaurants by lat long!',
            restaurants: {
              businesses: [
                {
                  id: 'ZsMHu9sN8izRCb3_0YM6aA',
                  alias: 'si-chuan-dou-hua-singapore-4',
                  name: 'Si Chuan Dou Hua',
                  image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/XYj6o7Cy5iC7L1b5wnvXhg/o.jpg',
                  is_closed: false,
                  url:
                    'https://www.yelp.com/biz/si-chuan-dou-hua-singapore-4?adjust_creative=cNIqAxB2DvW5JmOGOuVqmA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cNIqAxB2DvW5JmOGOuVqmA',
                  review_count: 1,
                  categories: [
                    {
                      alias: 'szechuan',
                      title: 'Szechuan',
                    },
                  ],
                  rating: 4,
                  coordinates: {
                    latitude: 1.31076,
                    longitude: 103.85586,
                  },
                  transactions: [],
                  location: {
                    address1: '181 Kitchener Rd',
                    address2: 'Parkroyal',
                    address3: '',
                    city: 'Singapore',
                    zip_code: '208533',
                    country: 'SG',
                    state: 'SG',
                    display_address: ['181 Kitchener Rd', 'Parkroyal', 'Singapore 208533', 'Singapore'],
                  },
                  phone: '+6564283170',
                  display_phone: '+65 6428 3170',
                  distance: 432.4045736626178,
                },
              ],
            },
          });
      });

      it('getAllRestaurantsByLatLong', async () => {
        const response = await axios.get(`${rootUrl}/restaurant/find-restaurants-by-lat-long`, {
          params: {
            term: 'chinese',
            latitude: 1.30916,
            longitude: 103.85213,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();
        expect(response.data.message).toBeDefined();
        expect(response.data.restaurants).toBeDefined();
        expect(response.data.restaurants.businesses).toBeDefined();
      });
    });

    describe('getAllRestaurantsByLocationTest', () => {
      beforeEach(() => {
        nock(rootUrl)
          .get('/restaurant/find-restaurants-by-location')
          .query({
            term: 'chinese',
            location: 'hong kong central',
          })
          .matchHeader('Content-Type', 'application/json')
          .reply(200, {
            message: 'Get all restaurants by location!',
            restaurants: {
              businesses: [
                {
                  id: 'xmqDvIrLTi68PcBaCt_0eA',
                  alias: 'hong-kong-style-chee-cheong-fun-singapore-3',
                  name: 'Hong Kong Style Chee Cheong Fun',
                  image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/tV48eTQaURofWTH6VsiMig/o.jpg',
                  is_closed: false,
                  url:
                    'https://www.yelp.com/biz/hong-kong-style-chee-cheong-fun-singapore-3?adjust_creative=cNIqAxB2DvW5JmOGOuVqmA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cNIqAxB2DvW5JmOGOuVqmA',
                  review_count: 9,
                  categories: [
                    {
                      alias: 'chinese',
                      title: 'Chinese',
                    },
                  ],
                  rating: 5,
                  coordinates: {
                    latitude: 1.316263,
                    longitude: 103.849928,
                  },
                  transactions: [],
                  price: '$',
                  location: {
                    address1: '41A Cambridge Rd',
                    address2: '#01-25',
                    address3: '',
                    city: 'Singapore',
                    zip_code: '211041',
                    country: 'SG',
                    state: 'SG',
                    display_address: ['41A Cambridge Rd', '#01-25', 'Singapore 211041', 'Singapore'],
                  },
                  phone: '',
                  display_phone: '',
                  distance: 425.3156941376532,
                },
              ],
            },
          });
      });

      it('getAllRestaurantsByLocation', async () => {
        const response = await axios.get(`${rootUrl}/restaurant/find-restaurants-by-location`, {
          params: {
            term: 'chinese',
            location: 'hong kong central',
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();
        expect(response.data.message).toBeDefined();
        expect(response.data.restaurants).toBeDefined();
        expect(response.data.restaurants.businesses).toBeDefined();

        id = response.data.restaurants.businesses[0].id;
      });
    });

    describe('getRestaurantByPhoneTest', () => {
      beforeEach(() => {
        nock(rootUrl)
          .get('/restaurant/find-restaurant-by-phone')
          .query({
            phone: '+85227881226',
          })
          .matchHeader('Content-Type', 'application/json')
          .reply(200, {
            message: 'Get restaurant by phone!',
            restaurant: {
              businesses: [
                {
                  id: 'VMjN6yFplSYQB83Fhz3bng',
                  alias: 'wah-kee-big-prawn-noodles-singapore',
                  name: 'Wah Kee Big Prawn Noodles',
                  image_url: 'https://s3-media0.fl.yelpcdn.com/bphoto/SwIpU8gpEvbgCVolF3IE9A/o.jpg',
                  is_closed: false,
                  url:
                    'https://www.yelp.com/biz/wah-kee-big-prawn-noodles-singapore?adjust_creative=cNIqAxB2DvW5JmOGOuVqmA&utm_campaign=yelp_api_v3&utm_medium=api_v3_phone_search&utm_source=cNIqAxB2DvW5JmOGOuVqmA',
                  review_count: 7,
                  categories: [
                    {
                      alias: 'chinese',
                      title: 'Chinese',
                    },
                    {
                      alias: 'foodstands',
                      title: 'Food Stands',
                    },
                  ],
                  rating: 4,
                  coordinates: {
                    latitude: 1.31623695078127,
                    longitude: 103.85016641954,
                  },
                  transactions: [],
                  price: '$',
                  location: {
                    address1: '41A Cambridge Rd',
                    address2: '#01-15',
                    address3: null,
                    city: 'Singapore',
                    zip_code: '211041',
                    country: 'SG',
                    state: 'SG',
                    display_address: ['41A Cambridge Rd', '#01-15', 'Singapore 211041', 'Singapore'],
                  },
                  phone: '+6596883633',
                  display_phone: '+65 9688 3633',
                },
              ],
              total: 1,
            },
          });
      });

      it('getRestaurantByPhone', async () => {
        const response = await axios.get(`${rootUrl}/restaurant/find-restaurant-by-phone`, {
          params: {
            phone: '+85227881226',
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();
        expect(response.data.message).toBeDefined();
        expect(response.data.restaurant).toBeDefined();
        expect(response.data.restaurant.businesses).toBeDefined();
        expect(response.data.restaurant.total).toBeDefined();
      });
    });

    describe('getRestaurantDetailsByIdTest', () => {
      beforeEach(() => {
        nock(rootUrl)
          .get(`/restaurant/get-restaurant-details/${id}`)
          .matchHeader('Content-Type', 'application/json')
          .reply(200, {
            message: 'Get restaurant details by id!',
            restaurantDetails: {
              id: 'X7b2izv3qhklnCDjoF37tA',
              alias: '鼎泰豐-香港-6',
              name: 'Din Tai Fung',
              image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/VylSMKF2eidQSxnUpHqnRQ/o.jpg',
              is_claimed: false,
              is_closed: false,
              url:
                'https://www.yelp.com/biz/%E9%BC%8E%E6%B3%B0%E8%B1%90-%E9%A6%99%E6%B8%AF-6?adjust_creative=cNIqAxB2DvW5JmOGOuVqmA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=cNIqAxB2DvW5JmOGOuVqmA',
              phone: '+85231608998',
              display_phone: '+852 3160 8998',
              review_count: 131,
              categories: [
                {
                  alias: 'shanghainese',
                  title: 'Shanghainese',
                },
                {
                  alias: 'taiwanese',
                  title: 'Taiwanese',
                },
                {
                  alias: 'dimsum',
                  title: 'Dim Sum',
                },
              ],
              rating: 4.5,
              location: {
                address1: '怡和街68號',
                address2: '地下3-11舖',
                address3: null,
                city: 'Hong Kong',
                zip_code: '',
                country: 'HK',
                state: 'HK',
                display_address: ['Shop 3-11, G/F, 68 Yee Wo Street', '怡和街68號地下3-11舖', 'Hong Kong'],
                cross_streets: '',
              },
              coordinates: {
                latitude: 22.279305,
                longitude: 114.186432,
              },
              photos: [
                'https://s3-media1.fl.yelpcdn.com/bphoto/VylSMKF2eidQSxnUpHqnRQ/o.jpg',
                'https://s3-media2.fl.yelpcdn.com/bphoto/KYa6DWkRWil0RAZrdyMgTw/o.jpg',
                'https://s3-media1.fl.yelpcdn.com/bphoto/2NTEML09-_2PmvOrFBi3Tg/o.jpg',
              ],
              price: '$$',
              hours: [
                {
                  open: [
                    {
                      is_overnight: false,
                      start: '1130',
                      end: '2200',
                      day: 0,
                    },
                    {
                      is_overnight: false,
                      start: '1130',
                      end: '2200',
                      day: 1,
                    },
                    {
                      is_overnight: false,
                      start: '1130',
                      end: '2200',
                      day: 2,
                    },
                    {
                      is_overnight: false,
                      start: '1130',
                      end: '2200',
                      day: 3,
                    },
                    {
                      is_overnight: false,
                      start: '1130',
                      end: '2200',
                      day: 4,
                    },
                    {
                      is_overnight: false,
                      start: '1130',
                      end: '2200',
                      day: 5,
                    },
                    {
                      is_overnight: false,
                      start: '1130',
                      end: '2200',
                      day: 6,
                    },
                  ],
                  hours_type: 'REGULAR',
                  is_open_now: false,
                },
              ],
              transactions: [],
            },
          });
      });

      it('getRestaurantDetailsById', async () => {
        const response = await axios.get(`${rootUrl}/restaurant/get-restaurant-details/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();
        expect(response.data.message).toBeDefined();
        expect(response.data.restaurantDetails).toBeDefined();
      });
    });

    describe('getRestaurantDetailsReviewByIdTest', () => {
      beforeEach(() => {
        nock(rootUrl)
          .get(`/restaurant/get-restaurant-details-review/${id}`)
          .matchHeader('Content-Type', 'application/json')
          .reply(200, {
            message: 'Get restaurant details review by id!',
            restaurantDetailsReview: {
              reviews: [
                {
                  id: '3yZ5vWCuGgT_HLTjTMunTQ',
                  url:
                    'https://www.yelp.com/biz/%E9%BC%8E%E6%B3%B0%E8%B1%90-%E9%A6%99%E6%B8%AF-6?adjust_creative=cNIqAxB2DvW5JmOGOuVqmA&hrid=3yZ5vWCuGgT_HLTjTMunTQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=cNIqAxB2DvW5JmOGOuVqmA',
                  text:
                    'You must try their flagship Xiao Long Bao (steamed pork dumplings) at this Michelin one restaurant.  The skin is not too thin that it breaks apart or so...',
                  rating: 4,
                  time_created: '2020-01-19 21:25:00',
                  user: {
                    id: 'hrYOEsw6YkYTf9joi_styw',
                    profile_url: 'https://www.yelp.com/user_details?userid=hrYOEsw6YkYTf9joi_styw',
                    image_url: 'https://s3-media2.fl.yelpcdn.com/photo/WAlyes_7ysTS9cj_ybt1xA/o.jpg',
                    name: 'Dennis C.',
                  },
                },
                {
                  id: 'OHOetGAhHgJNsKN3mQOO5w',
                  url:
                    'https://www.yelp.com/biz/%E9%BC%8E%E6%B3%B0%E8%B1%90-%E9%A6%99%E6%B8%AF-6?adjust_creative=cNIqAxB2DvW5JmOGOuVqmA&hrid=OHOetGAhHgJNsKN3mQOO5w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=cNIqAxB2DvW5JmOGOuVqmA',
                  text:
                    "Second visit here after two years and still maintain 3-star rating mainly due to lackluster XLB, pork meat filling was dry, odd because it's what they're...",
                  rating: 3,
                  time_created: '2019-09-28 14:35:04',
                  user: {
                    id: 'M2YgIMu5i_ojZLCBzinx6A',
                    profile_url: 'https://www.yelp.com/user_details?userid=M2YgIMu5i_ojZLCBzinx6A',
                    image_url: 'https://s3-media2.fl.yelpcdn.com/photo/P_BsNVGtT1TwRjzvCgVY0w/o.jpg',
                    name: 'Mike Z.',
                  },
                },
                {
                  id: 'z_zGHXzGoW-INC7DE6ZS0Q',
                  url:
                    'https://www.yelp.com/biz/%E9%BC%8E%E6%B3%B0%E8%B1%90-%E9%A6%99%E6%B8%AF-6?adjust_creative=cNIqAxB2DvW5JmOGOuVqmA&hrid=z_zGHXzGoW-INC7DE6ZS0Q&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=cNIqAxB2DvW5JmOGOuVqmA',
                  text:
                    'The food was delicious, however, this was severely eclipsed by the unpleasant atmosphere and apathetic service. \n\nThis location is enormous and most...',
                  rating: 3,
                  time_created: '2019-06-06 22:45:11',
                  user: {
                    id: 'Ygcv3NX9_oEAwLli_GdKrQ',
                    profile_url: 'https://www.yelp.com/user_details?userid=Ygcv3NX9_oEAwLli_GdKrQ',
                    image_url: 'https://s3-media1.fl.yelpcdn.com/photo/PYsCBisSlWgdKOqexidocw/o.jpg',
                    name: 'Laura L.',
                  },
                },
              ],
              total: 131,
              possible_languages: ['zh', 'fr', 'en', 'tr', 'ja'],
            },
          });
      });

      it('getRestaurantDetailsReviewById', async () => {
        const response = await axios.get(`${rootUrl}/restaurant/get-restaurant-details-review/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();
        expect(response.data.message).toBeDefined();
        expect(response.data.restaurantDetailsReview).toBeDefined();
        expect(response.data.restaurantDetailsReview.reviews).toBeDefined();
        expect(response.data.restaurantDetailsReview.total).toBeDefined();
        expect(response.data.restaurantDetailsReview.possible_languages).toBeDefined();
      });
    });
  });
};
