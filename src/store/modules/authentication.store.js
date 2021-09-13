import router from "@/router";
import jwt_decode from "jwt-decode";
import authenticationService from "@/services/endpoints/authentication.service";

/*
 * We could store the user access token/refresh token in vuex store,
 * but if the user leaves our application, all of the data in
 * the vuex store disappears.
 * To ensure we allow the user to return to the application within
 * the validity time of the token and not have to log in again,
 * we have to keep the token in the browser localStorage also.
 */
const initialState = () => ({
  status: "",
  error: null,
  authenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  me: {},
});

const state = initialState();

const actions = {
  reset({ commit }) {
    commit("RESET");
  },
  login({ commit, dispatch }, { email, password }) {
    commit("LOGIN_REQUEST", { email });

    return authenticationService.login(email, password).then(
      (token) => {
        commit("LOGIN_SUCCESS");
        commit("SET_TOKEN", token);

        dispatch("Alert/loginClear", "", { root: true });
        dispatch("Alert/success", "user.ok_login", { root: true });

        // Get user profile
        dispatch("getProfile");

        // this.$emit("user-signed-in");
      },
      (error) => {
        dispatch("logout", error);
        commit("LOGIN_FAILURE", error);
        dispatch("Alert/loginAlert", "", error, { root: true });
      }
    );
  },
  getProfile({ dispatch, commit }) {
    commit("PROFILE_REQUEST");

    // Get user profile
    return authenticationService.getUserProfile().then(
      (user) => {
        commit("PROFILE_SUCCESS", user);
      },
      (error) => {
        authenticationService.logout();
        commit("PROFILE_FAILURE", error);
        dispatch("Alert/loginAlert", "", error, { root: true });
      }
    );
  },
  logout({ commit }, message) {
    commit("LOGOUT", message);

    return authenticationService.logout();
    //
    // // Navigate to login page if it is not the current page
    // // console.warn("Current path: ", router.currentRoute);
    // if (router.currentRoute.path !== "/login") {
    //   router.push("/login").catch((err) => {
    //     console.error("Login page is not available!", err);
    //   });
    // }
  },
  setLocale({ dispatch, commit }, locale) {
    commit("SET_LOCALE", locale.code);

    return dispatch(
      "Alert/success",
      router.app.$t("user.ok_language", {
        code: locale.code,
        name: locale.name,
      }),
      {
        root: true,
      }
    );
  },

  userDenied({ commit }, message) {
    commit("USER_DENIED", message);
  },
};

const getters = {
  isLoggedIn: (_state) => !!_state.token,
  isAuthorized: (_state) => {
    return _state.status && _state.status !== "denied";
  },
  getToken: (_state) => {
    return _state.token;
  },
  friendlyName: (_state) => {
    // Returns, in order of preference, prénom+nom, prénom, nom, sinon Inconnu
    return _state.me
      ? _state.me.firstName && _state.me.lastName
        ? _state.me.firstName + " " + _state.me.lastName
        : _state.me.firstName
        ? _state.me.firstName
        : _state.me.lastName
        ? _state.me.lastName
        : "user.not_named"
      : "user.not_connected";
  },
  initials: (_state) => {
    // Returns, in order of preference, prénom+nom, prénom, nom, sinon Inconnu
    return _state.me
      ? _state.me.firstName && _state.me.lastName
        ? _state.me.firstName[0] + _state.me.lastName[0]
        : _state.me.firstName
        ? _state.me.firstName[0]
        : _state.me.lastName
        ? _state.me.lastName[0]
        : "YyY"
      : "XxX";
  },
  role: (_state) => {
    return _state.me ? _state.me.role : "";
  },
  layout: (_state) => {
    return _state.me ? _state.me.layout : "";
  },
};

const mutations = {
  // Reset to the initial _state
  RESET(_state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      _state[key] = newState[key];
    });
  },
  LOGIN_REQUEST(_state, user) {
    _state.status = "logging";
    _state.error = null;
    _state.me = user;
  },
  LOGIN_SUCCESS(_state) {
    _state.status = "success";
  },
  LOGIN_FAILURE(_state, error) {
    _state.status = "error";
    _state.error = error;
    _state.me = null;
  },
  PROFILE_REQUEST(_state) {
    _state.status = "logging";
    _state.error = null;
  },
  PROFILE_SUCCESS(_state, user) {
    _state.status = "success";
    _state.me = user;
  },
  PROFILE_FAILURE(_state, error) {
    _state.status = "error";
    _state.error = error;
    _state.me = null;
  },
  LOGOUT(_state, message) {
    _state.status = "";
    _state.me = null;
    _state.token = "";
    if (message) {
      console.warn("Logout because: " + message);
    }
  },
  SET_TOKEN(_state, token) {
    // Next expiry is
    try {
      jwt_decode(token);
      _state.token = token;
      // console.log("SET_TOKEN: ", jwt_decode(token));
    } catch (exc) {
      // Got a malformed token... clean this stuff!
      _state.token = "";
    }
  },
  SET_LOCALE(_state, code) {
    if (_state.me) {
      _state.me.languageCode = code;
    }
  },
  USER_DENIED(_state, message) {
    console.warn(
      "Access denied for the current logged-in user, component: " + message
    );
    _state.status = "denied";
    _state.error = message;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
