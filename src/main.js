// Polyfills
import "core-js/stable";
import "regenerator-runtime/runtime";

// Imports
import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import "./registerServiceWorker";

import store from "@/store";
import router from "@/router";
import i18n from "./i18n";

Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
  i18n,
  router,
  store,
  vuetify,
  watch: {
    locale(val) {
      console.warn("Locale changed!");
      this.$i18n.locale = val;
    },
  },
  render: (h) => h(App),
}).$mount("#app");
