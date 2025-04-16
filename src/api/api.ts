// services/api/api.ts
import axios from "axios";

const BASE_URL = "http://195.35.3.40:10000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Accept": "application/json",
  },
  // You can add timeout, withCredentials, etc. here if needed
});

export default api;
