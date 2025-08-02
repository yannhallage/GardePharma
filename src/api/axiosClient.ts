import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://api.tonsite.com',
  headers: {
    'Content-Type': 'application/json',
  },
});


const get = <T>(url: string, config = {}) =>
  axiosClient.get<T>(url, config).then((res) => res.data);

const post = <T, D = unknown>(url: string, data?: D, config = {}) =>
  axiosClient.post<T>(url, data, config).then((res) => res.data);

const put = <T, D = unknown>(url: string, data?: D, config = {}) =>
  axiosClient.put<T>(url, data, config).then((res) => res.data);

const del = <T>(url: string, config = {}) =>
  axiosClient.delete<T>(url, config).then((res) => res.data);

export const http = {
  get,
  post,
  put,
  delete: del,
};
