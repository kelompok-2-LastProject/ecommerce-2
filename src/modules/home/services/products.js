import axios from 'axios';
// files
import { API_BASE_URL } from '../../shared/config/constants';

// create axios instance
const productsApi = axios.create({
  baseURL: `${API_BASE_URL}/products`,
});

export async function getProducts() {
  const res = await productsApi.get('');
  return {
    status: res.status,
    data: res.data,
  };
}
