import axios from "axios";

export function createClient() {
  return axios.create({
    baseURL: "https://habit-rabbit-backend-production.up.railway.app",
    withCredentials: true,
  });
}
