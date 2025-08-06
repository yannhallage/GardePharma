import axios from 'axios';
import type { AxiosInstance } from 'axios';


const urlAuth = import.meta.env.VITE_API_URL_AUTH;
const urlPharma = import.meta.env.VITE_API_URL_PHARMA;
const urlAdmin = import.meta.env.VITE_API_URL_ADMIN;

export const axiosAuth = axios.create({
  baseURL: urlAuth,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosPharma = axios.create({
  baseURL: urlPharma,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosAdmin = axios.create({
  baseURL: urlAdmin,
  headers: {
    'Content-Type': 'application/json',
  },
});

const get = <T>(instance: AxiosInstance, url: string, config = {}) =>
  instance.get<T>(url, config).then((res) => res.data);

const post = <T, D = unknown>(instance: AxiosInstance, url: string, data?: D, config = {}) =>
  instance.post<T>(url, data, config).then((res) => res.data);

const put = <T, D = unknown>(instance: AxiosInstance, url: string, data?: D, config = {}) =>
  instance.put<T>(url, data, config).then((res) => res.data);

const del = <T>(instance: AxiosInstance, url: string, config = {}) =>
  instance.delete<T>(url, config).then((res) => res.data);

export const http = {
  get,
  post,
  put,
  delete: del,
};
