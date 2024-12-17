import axios from "axios";

const LOCAL_BASE_URL = 'http://localhost:5000/api/v1/auth';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: LOCAL_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to get headers dynamically
export const getHeaders = () => {
  const token = localStorage.getItem('token');
  return token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : {
        'Content-Type': 'application/json',
      };
};

// Set headers dynamically for each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
