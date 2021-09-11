/*
 * Get the API version data
 */
import store from "@/store";
import apiClient from "./apiClient";

export default {
  get,
};

function get(parameters) {
  return apiClient.get(store.state.remote.version, { params: parameters });
}
