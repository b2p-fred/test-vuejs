/*
 * Users login, logout and other services
 */
import store from "@/store";
import apiClient from "./apiClient";

import { writeToStorage, removeFromStorage } from "@/_helpers/local-storage";

export default {
  login,
  logout,
  getUserProfile,
};

function login(email, password) {
  return apiClient
    .post(store.state.remote.login, { email, password })
    .then((response) => {
      const data = response.data;
      if (data && data.token) {
        // store the jwt token in the local storage to keep user logged in between page refreshes
        writeToStorage("token", data.token);
      }
      return data.token;
    });
}

function logout() {
  removeFromStorage("token");
}

function getUserProfile() {
  return apiClient.get(store.state.remote.profile).then((response) => {
    const { data } = response;

    // Set the default profile layout if none (or empty) is provided
    if (!data.layout || Object.entries(data.layout).length === 0) {
      data.layout = require("../assets/layout-default.json");
    }
    return data;
  });
}
