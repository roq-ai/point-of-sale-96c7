import axios from 'axios';
import queryString from 'query-string';
import { InventoryManagerInterface, InventoryManagerGetQueryInterface } from 'interfaces/inventory-manager';
import { GetQueryInterface } from '../../interfaces';

export const getInventoryManagers = async (query?: InventoryManagerGetQueryInterface) => {
  const response = await axios.get(`/api/inventory-managers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createInventoryManager = async (inventoryManager: InventoryManagerInterface) => {
  const response = await axios.post('/api/inventory-managers', inventoryManager);
  return response.data;
};

export const updateInventoryManagerById = async (id: string, inventoryManager: InventoryManagerInterface) => {
  const response = await axios.put(`/api/inventory-managers/${id}`, inventoryManager);
  return response.data;
};

export const getInventoryManagerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/inventory-managers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteInventoryManagerById = async (id: string) => {
  const response = await axios.delete(`/api/inventory-managers/${id}`);
  return response.data;
};
