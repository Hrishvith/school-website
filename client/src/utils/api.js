import axios from 'axios';

// Empty default = same-origin requests, proxied to the Express backend by Vite
// in development. Set VITE_API_BASE_URL to point at a separate backend URL in production.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
export { API_BASE_URL };