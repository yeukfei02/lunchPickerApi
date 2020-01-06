import * as _ from 'lodash';
const axios = require('axios');

const ROOT_URL = "https://lunch-picker-api.herokuapp.com/api";

export const getCategoies = async () => {
  const result = await axios.get(
    `${ROOT_URL}/category/get-categories`,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (!_.isEmpty(result.data)) {
    expect(result.data).toBeDefined();
    expect(result.data.categories).toBeDefined();
  }
}

export const getCategoryByAlias = async () => {
  const result = await axios.get(
    `${ROOT_URL}/category/get-category/seafood`,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (!_.isEmpty(result.data)) {
    expect(result.data).toBeDefined();
    expect(result.data.category).toBeDefined();
  }
}
