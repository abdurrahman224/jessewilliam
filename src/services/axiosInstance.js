import axios from 'axios';
import { API_CONFIG } from '../config/constants';
import { getCookie } from '../utils/cookies';

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('app_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Only for non-error responses
// Error handling is delegated to apiExecutor for Redux thunks
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Pass through errors without handling - let apiExecutor handle them
    return Promise.reject(error);
  }
);

export default axiosInstance;
