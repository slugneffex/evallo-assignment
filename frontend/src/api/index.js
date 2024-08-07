import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
export const getAuthToken = () => localStorage.getItem("AvJO)%zOxm}S/iy");
export const setAuthToken = (token) =>
  localStorage.setItem("AvJO)%zOxm}S/iy", token);
export const removeAuthToken = () => localStorage.removeItem("AvJO)%zOxm}S/iy");

export default api;
