import axios from 'axios';
import queryString from 'query-string';
import { StoreManagerInterface, StoreManagerGetQueryInterface } from 'interfaces/store-manager';
import { GetQueryInterface } from '../../interfaces';

export const getStoreManagers = async (query?: StoreManagerGetQueryInterface) => {
  const response = await axios.get(`/api/store-managers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createStoreManager = async (storeManager: StoreManagerInterface) => {
  const response = await axios.post('/api/store-managers', storeManager);
  return response.data;
};

export const updateStoreManagerById = async (id: string, storeManager: StoreManagerInterface) => {
  const response = await axios.put(`/api/store-managers/${id}`, storeManager);
  return response.data;
};

export const getStoreManagerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/store-managers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStoreManagerById = async (id: string) => {
  const response = await axios.delete(`/api/store-managers/${id}`);
  return response.data;
};
