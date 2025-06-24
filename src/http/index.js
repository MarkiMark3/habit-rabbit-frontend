import axios from "axios";

export function createClient() {
  return axios.create({
    baseURL: "http://habit-rabbit-backend-production.up.railway.app",
    withCredentials: true,
  });
}
