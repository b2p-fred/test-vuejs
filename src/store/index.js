import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import backendConfiguration from "./remote";

import VuexPersistence from "vuex-persist";
import localForage from "localforage";

const vuexLocal = new VuexPersistence({
  key: process.env.VUE_APP_STORE_KEY || "pwa-store",
  storage: localForage,
});

// See ./module/index.js for importing all modules at once:
// fixme: This is a great solution but it breaks the PhpStorm syntactic analysis !
// import modules from "./modules";
// A such, we do manually import all the store modules
import Alert from "./modules/alert.store";
import Api from "./modules/api.store";
import OidcConfiguration from "./modules/oidcConfiguration.store";
import User from "./modules/user.store";
import Users from "./modules/users.store";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

const initialState = () => ({
  status: "",
  warnings: [],
  errors: [],

  // The application current language
  // currentLanguage: 'fr-FR',
  // Use the language of the client browser per default (same as ../i18n.js!)
  currentLanguage: navigator.language.split("-")[0],

  // The API backend configuration and endpoints list
  remote: backendConfiguration,

  // A user is logged in
  userLoggedIn: false,

  // The default is to user the 'local' authentication strategy
  oAuthEnabled: false,
  oAuthStrategy: "local",
});

const store = new Vuex.Store({
  // modules,
  modules: {
    Alert,
    Api,
    User,
    Users,
    OidcConfiguration,
  },
  state: initialState(),
  actions: {
    // Global store reset is calling each module 'reset' action
    reset({ commit }) {
      // resets state of all the modules
      Object.keys(modules).forEach((moduleName) => {
        commit(`${moduleName}/RESET`);
      });
    },
  },
  // getters: {
  //   /* Partially Implemented not for production use */
  //   loggedIn: (_state) => !!_state.token,
  // },
  mutations: {
    // Reset to the initial state
    RESET(_state) {
      const newState = initialState();
      Object.keys(newState).forEach((key) => {
        _state[key] = newState[key];
      });
    },
    WARNING(_state, message) {
      _state.status = "warning";
      _state.warnings.push(message);
    },
    ERROR(_state, message) {
      _state.status = "error";
      _state.errors.push(message);
    },
    SET_LANGUAGE(_state, code) {
      _state.currentLanguage = code;
    },
    ENABLE_OAUTH(_state, strategy = null) {
      _state.oAuthEnabled = true;

      // Default is to use the 'b2p' configured strategy if none is requested
      _state.oAuthStrategy = strategy || "b2p";
    },
  },
  strict: debug,
  plugins: debug ? [vuexLocal.plugin, createLogger()] : [vuexLocal.plugin],
});

export default store;
