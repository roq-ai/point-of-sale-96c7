import axios from 'axios';
import queryString from 'query-string';
import { CashierInterface, CashierGetQueryInterface } from 'interfaces/cashier';
import { GetQueryInterface } from '../../interfaces';

export const getCashiers = async (query?: CashierGetQueryInterface) => {
  const response = await axios.get(`/api/cashiers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCashier = async (cashier: CashierInterface) => {
  const response = await axios.post('/api/cashiers', cashier);
  return response.data;
};

export const updateCashierById = async (id: string, cashier: CashierInterface) => {
  const response = await axios.put(`/api/cashiers/${id}`, cashier);
  return response.data;
};

export const getCashierById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/cashiers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCashierById = async (id: string) => {
  const response = await axios.delete(`/api/cashiers/${id}`);
  return response.data;
};
