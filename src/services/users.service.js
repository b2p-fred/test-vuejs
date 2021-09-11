/*
 * Users data
 */
import store from "@/store";
import apiClient from "./apiClient";

export default {
  getAll,
};

function getAll() {
  return apiClient.get(store.state.remote.users).then((response) => {
    const { data } = response;
    console.log("Got", response, data);

    // // Set the default profile layout if none (or empty) is provided
    // if (!data.layout || Object.entries(data.layout).length === 0) {
    //   data.layout = require("../assets/layout-default.json");
    // }
    return data;
  });
}
