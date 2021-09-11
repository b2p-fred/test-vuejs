import axios from "axios";
import { readFromStorage } from "@/_helpers/local-storage";
import store from "@/store";
import router from "@/router";

import {
  cacheAdapterEnhancer,
  throttleAdapterEnhancer,
} from "axios-extensions";

// Axios cache management is installed but disabled per default
// ---
const cacheConfig = {
  enabledByDefault: false,
  cacheFlag: "useCache",
  // defaultCache: new LRUCache({ maxAge: FIVE_MINUTES, max: 100 })
};
// To use:
// const getUsers = () => apiClient.get('/users', { useCache: true });
// All the subsequent calls after the first call will be responded from the cache.

// Axios throttle configuration
const throttleConfig = {
  threshold: 2 * 1000, // 2 seconds
};

const defaultHeaders = {
  Accept: process.env.VUE_APP_ACCEPT_HEADER || "application/ld+json",
  "X-User-Agent": `${process.env.APP_NAME}/${process.env.APP_VERSION}`,
};
// Specific extension formatted as a user agent (see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent)
if (process.env.APP_COMMENTS && process.env.APP_COMMENTS !== "") {
  defaultHeaders[
    "X-User-Agent"
  ] = `${process.env.APP_NAME}/${process.env.APP_VERSION} (${process.env.APP_COMMENTS})`;
}

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 1000,
  // withCredentials: false,
  headers: defaultHeaders,
  adapter: throttleAdapterEnhancer(
    cacheAdapterEnhancer(axios.defaults.adapter, cacheConfig),
    throttleConfig
  ),
});

// Interceptor to set the headers according to user credentials
apiClient.interceptors.request.use(
  (request) => {
    // Set authorization header with jwt access token
    if (!("Authorization" in request.headers)) {
      let token = readFromStorage("token") || null;
      if (token) {
        console.log("Headers", request.headers);
        request.headers["Authorization"] = `Bearer ${token}`;
      }
      console.log("Headers", request.headers);
      return request;
    }
  },
  (error) => {
    console.error("Request interceptor error: ", error);
  }
);

// Interceptor to catch errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response interceptor error: ", error);
    // all the error responses
    switch (error.response.status) {
      case 400:
        console.error(error.response);
        store.commit("ERROR", "No data found!");
        break;

      case 401: // authentication error, logout the user
        console.warn("Please login again", "Session Expired");
        store.commit("WARNING", "Session expired. Please login again!");
        localStorage.removeItem("token");
        router.push("/login");
        break;

      default:
        console.error(error.response.status, error.message);
        store.commit("ERROR", "Server error!");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
