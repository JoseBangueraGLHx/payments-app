import axios from "axios";
import { API_BASE_URL } from "../api/endpoints";
import { buildAuthHeaders } from "./apiHeaders";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
});

api.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      ...buildAuthHeaders(),
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
