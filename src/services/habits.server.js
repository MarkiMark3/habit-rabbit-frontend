import { habitsClient } from "../http/habitsClient";

function getHabits() {
  return habitsClient.get("/getHabits");
}
function addHabit({ title }) {
  return habitsClient.post("/addHabit", { title });
}
function toggleHabit({ id }) {
  return habitsClient.post("/toggleHabit", { id });
}
function deleteHabit({ id }) {
  return habitsClient.post("/deleteHabit", { id });
}

export const habitsService = {
  getHabits,
  addHabit,
  toggleHabit,
  deleteHabit,
};
