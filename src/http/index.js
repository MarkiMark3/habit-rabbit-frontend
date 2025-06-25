import axios from "axios";

export function createClient() {
  return axios.create({
    // baseURL: "http://localhost:3002",
    baseURL: "https://habit-rabbit-backend-production.up.railway.app",
    withCredentials: true,
  });
}
