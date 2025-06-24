import { createClient } from "./index.js";

export const habitsClient = createClient();

habitsClient.interceptors.response.use((res) => res.data);
