import axios from "axios";

const instance = axios.create({
  baseURL: "https://tinycarebackend-ubpd.onrender.com", // Update if backend is deployed
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
