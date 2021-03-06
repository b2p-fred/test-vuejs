/*
 * Users login, logout and other services
 */
import store from "@/store";
import httpClient from "../httpClient";

import { writeToStorage, removeFromStorage } from "@/utils/local-storage";

export default {
  login,
  logout,
  getUserProfile,
};

function login(email, password) {
  return httpClient
    .post(store.state.remote.login, { email, password })
    .then((response) => {
      // store the jwt token in the local storage to keep user logged in between page refreshes
      writeToStorage("token", response.token);
      return response.token;
    });
}

function logout() {
  removeFromStorage("token");
}

function getUserProfile() {
  return httpClient.get(store.state.remote.profile).then((response) => {
    // Set the default profile layout if none (or empty) is provided
    if (!response.layout || Object.entries(response.layout).length === 0) {
      response.layout = require("../samples/layout-default.json");
    }
    return response;
  });
}
