import axios from "axios";

export const api = axios.create({
  baseURL: '/api',
  timeout: 1000,
  withCredentials: true,
  validateStatus: (status) => [200,201,204].includes(status),
});