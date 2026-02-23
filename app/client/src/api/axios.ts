import axios from "axios";
import { LocalStorageKeys, getLocalStorageItem, removeLocalStorageItem } from "../utils/localStorage";

const api = axios.create({
  baseURL: "http://localhost:8082/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getLocalStorageItem<string | null>(LocalStorageKeys.TOKEN, null);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      removeLocalStorageItem(LocalStorageKeys.TOKEN);
      removeLocalStorageItem(LocalStorageKeys.USER);
      window.location.href = "/auth";
    }
    return Promise.reject(err);
  }
);

export default api;
