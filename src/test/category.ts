import axios, { AxiosResponse } from 'axios';
import { getRootUrl } from '../common/common';

const ROOT_URL = getRootUrl();

export const getCategoriesTest = async (): Promise<AxiosResponse<any>> => {
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
