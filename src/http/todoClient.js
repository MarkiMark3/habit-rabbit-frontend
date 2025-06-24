import { createClient } from "./index.js";

export const todosClient = createClient();

todosClient.interceptors.response.use((res) => res.data);
