import axios from "axios";

const api = axios.create({
  // baseURL: "/api",
  baseURL: "https://notetracker-2.onrender.com/api", //local
  withCredentials: true,
});

export default api;
