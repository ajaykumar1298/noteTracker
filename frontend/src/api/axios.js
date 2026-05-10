import axios from "axios";

let uri = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: uri,
  withCredentials: true,
});

export default api;
