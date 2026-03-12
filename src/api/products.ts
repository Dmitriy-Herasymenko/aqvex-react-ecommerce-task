import axios from 'axios';
import type { ApiResponse } from '../types';

export const fetchProducts = async () => {
  const response = await axios.get<ApiResponse>('/api/v1/products');
  return response.data;
};