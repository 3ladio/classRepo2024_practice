import axios from 'axios';

const BASE_URL = "http://localhost:5000";

const accessToken = sessionStorage.getItem("token");
// Regular axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Private axios instance with interceptors for authenticated requsts
const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Add request interceptor to add Authorization header
privateApi.interceptors.request.use(
  (config) => {
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export { api, privateApi };