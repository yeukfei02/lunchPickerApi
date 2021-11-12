import axios, { AxiosResponse } from 'axios';
import { getRootUrl } from '../common/common';

const rootUrl = getRootUrl();

export const getCategoriesTest = async (): Promise<AxiosResponse<any>> => {
  const result = await axios.get(`${rootUrl}/category/get-categories`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
};

export const getCategoryByAliasTest = async (): Promise<AxiosResponse<any>> => {
  const result = await axios.get(`${rootUrl}/category/get-category/seafood`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
};
