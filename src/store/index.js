import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import backendConfiguration from "./remote";

// OIDC client
import { vuexOidcCreateStoreModule } from "vuex-oidc";
import { oidcSettings } from "@/config/oidc";

import makeCrudModule from "./modules/crud";

import VuexPersistence from "vuex-persist";
const vuexLocal = new VuexPersistence({
  key: process.env.VUE_APP_STORE_KEY || "pwa-store",
  storage: localStorage,
});

// ----------------------------------------
// Store modules list

// See ./module/index.js for importing all modules at once:
// fixme: This is a great solution but it breaks the PhpStorm syntactic analysis !
// import modules from "./modules";

// A such, we do manually import all the store modules
import addressService from "@/services/endpoints/address";
import contactService from "@/services/endpoints/contact";
import documentService from "@/services/endpoints/document";
import documentVersionService from "@/services/endpoints/documentversion";
import relationService from "@/services/endpoints/relation";
import userService from "@/services/endpoints/user";

import Alert from "./modules/alert.store";
import Api from "./modules/apiVersion.store";
import Authentication from "./modules/authentication.store";

import Notifications from "./modules/notifications";

const modules = {
  theAddresses: makeCrudModule({ service: addressService }),
  theContacts: makeCrudModule({ service: contactService }),
  theDocuments: makeCrudModule({ service: documentService }),
  theDocumentVersions: makeCrudModule({ service: documentVersionService }),
  theRelations: makeCrudModule({ service: relationService }),
  theUsers: makeCrudModule({ service: userService }),

  Alert,
  Api,
  Authentication,
  // Users,

  Notifications,
};

// B2P SSO, get the OIDC configuration
if (process.env.VUE_APP_AUTH_URL) {
  modules["oidcStore"] = vuexOidcCreateStoreModule(
    oidcSettings,
    {
      namespaced: true,
      publicRoutePaths: ["/login", "/oidc-callback", "/about"],
      dispatchEventsOnWindow: true,
    },
    // Optional OIDC event listeners
    {
      userLoaded: (user) => {
        console.log("***** oidc - OIDC user is loaded:");
      },
      userUnloaded: () => {
        console.log("***** oidc - OIDC user is unloaded");
      },
      accessTokenExpiring: () =>
        console.log(
          "***** oidc - Access token will expire. You should renew..."
        ),
      accessTokenExpired: () => {
        console.log("***** oidc - Access token exists but did expire!");
        store.commit("Authentication/RESET");
      },
      silentRenewError: () =>
        console.log("***** oidc - OIDC silent renew error, user is unloaded"),
      userSignedIn: () => console.log("***** oidc - OIDC user signed in"),
      userSignedOut: () => console.log("***** oidc - OIDC user is signed out"),
      userSessionChanged: () =>
        console.log("***** oidc - OIDC user session changed"),

      oidcError: (payload) =>
        console.log(`An error occurred at ${payload.context}:`, payload.error),
      automaticSilentRenewError: (payload) =>
        console.log(
          "***** oidc - Automatic silent renew failed.",
          payload.error
        ),
    }
  );
}
// ----------------------------------------

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

  // The default is to user the 'local' authentication strategy
  oAuthEnabled: false,
});

const store = new Vuex.Store({
  // modules,
  modules: modules,
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
    },
  },
  strict: debug,
  plugins: debug ? [vuexLocal.plugin, createLogger()] : [vuexLocal.plugin],
});

export default store;
