import axios from 'axios';

// BASE URL FOR AXIOS REQUESTS
export const fetch = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
