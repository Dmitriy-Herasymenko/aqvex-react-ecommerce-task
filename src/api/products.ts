import axios from 'axios';
import type { ApiResponse } from '../types';

const PRODUCTS_API_URL = '/api/v1/products';

export const fetchProducts = async () => {
  const response = await axios.get<ApiResponse>(PRODUCTS_API_URL);
  return response.data;
};