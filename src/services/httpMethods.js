import axiosInstance from './axiosInstance';

// Basic HTTP method wrappers - no error handling or response processing
// Response processing and error handling delegated to apiExecutor
export const GET = (url, params, config = {}) => {
  return axiosInstance.get(url, { params, ...config });
};

export const POST = (url, data, config = {}) => {
  return axiosInstance.post(url, data, config);
};

export const PUT = (url, data, config = {}) => {
  return axiosInstance.put(url, data, config);
};

export const DELETE = (url, config = {}) => {
  return axiosInstance.delete(url, config);
};

export const PATCH = (url, data, config = {}) => {
  return axiosInstance.put(url, data, config);
};