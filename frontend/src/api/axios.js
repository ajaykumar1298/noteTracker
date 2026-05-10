import axios from "axios";

// let uri = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: "https://notetracker-2.onrender.com/api",
  withCredentials: true,
});

export default api;
