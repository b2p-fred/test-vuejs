// Polyfills
import "core-js/stable";
import "regenerator-runtime/runtime";

// Imports
import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "./registerServiceWorker";
import i18n from "./i18n";
import store from "@/store";
import router from "@/router";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  i18n,
  watch: {
    locale(val) {
      console.warn("Locale changed!");
      this.$i18n.locale = val;
    },
  },
  render: (h) => h(App),
}).$mount("#app");
