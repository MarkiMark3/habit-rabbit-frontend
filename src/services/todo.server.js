import { todosClient } from "../http/todoClient";

function getTodos() {
  return todosClient.get("/getTodos");
}
function addTodo({ title }) {
  return todosClient.post("/addTodo", { title });
}
function toggleTodo({ id }) {
  return todosClient.post("/toggleTodo", { id });
}
function deleteTodo({ id }) {
  return todosClient.post("/deleteTodo", { id });
}

export const todosService = {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
};
