import axios, { AxiosResponse } from 'axios';

const ROOT_URL = 'https://lunch-picker-api.herokuapp.com/api';

export const getCategoiesTest = async (): Promise<AxiosResponse<any>> => {
  const result = await axios.get(`${ROOT_URL}/category/get-categories`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
};

export const getCategoryByAliasTest = async (): Promise<AxiosResponse<any>> => {
  const result = await axios.get(`${ROOT_URL}/category/get-category/seafood`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
};
