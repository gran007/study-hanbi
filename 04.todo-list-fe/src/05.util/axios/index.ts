import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
});