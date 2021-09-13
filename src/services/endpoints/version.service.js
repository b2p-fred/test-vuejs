/*
 * Get the API version data
 */
import store from "@/store";
import httpClient from "../httpClient";

export default {
  get,
};

function get(parameters) {
  return httpClient.get(store.state.remote.version, { params: parameters });
}
