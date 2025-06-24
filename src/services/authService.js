import { authClient } from "../http/authClient.js";

function register({ name, email, password }) {
  return authClient.post("/sign-up", { name, email, password });
}

function login({ email, password }) {
  return authClient.post("/login", { email, password });
}

function logout() {
  return authClient.post("/logout");
}

function activate(activationToken) {
  return authClient.get(`/activation/${activationToken}`);
}

function refresh() {
  return authClient.get("/refresh");
}

function reset({ email }) {
  return authClient.post("/reset", { email });
}

function resetPass({ password, confirmPassword }) {
  return authClient.post("/resetPassword", { password, confirmPassword });
}

function changeName({ name }) {
  return authClient.post("users/changeName", { name });
}

function changePassword({ oldPassword, newPassword, confPassword }) {
  return authClient.post("users/changePassword", {
    oldPassword,
    newPassword,
    confPassword,
  });
}

function getUser() {
  return authClient.get("users/user");
}

function changeEmail({ password, email }) {
  return authClient.post("users/changeEmail", { password, email });
}

function activateEmail({ email }) {
  return authClient.get(`users/changeEmail/${email}`);
}

export const authService = {
  register,
  login,
  logout,
  activate,
  refresh,
  reset,
  resetPass,
  changeName,
  changePassword,
  changeEmail,
  activateEmail,
  getUser,
};
