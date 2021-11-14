/*
 * Define the application routes:
 * - main routes
 * - login and register pages
 *
 * Check user authentication
 */

import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

import OidcCallback from "@/components/OidcCallback";
import { vuexOidcCreateRouterMiddleware } from "vuex-oidc";

import address from "@/router/admin/address";
import contact from "@/router/admin/contact";
import user from "@/router/admin/user";
import document from "@/router/admin/document";

Vue.use(Router);

function lazyLoadPage(view) {
  return () => import(`../pages/${view}.vue`);
}

const router = new Router({
  mode: "history",
  routes: [
    {
      // Match redirectUri in the oidc settings (see ./config/oidc.js)
      path: "/oidc-callback",
      name: "oidcCallback",
      component: OidcCallback,
    },

    {
      path: "/login",
      name: "Login",
      component: () => import("@/pages/Landing"),
      meta: { isPublic: true },
    },
    {
      path: "/",
      name: "Home",
      component: () => import("@/pages/Home"),
      meta: { isPublic: true },
    },

    address,
    contact,
    document,
    user,

    {
      path: "/dashboard",
      component: lazyLoadPage("Home"),
    },
    {
      path: "/sites",
      component: lazyLoadPage("Sites"),
    },
    {
      path: "/libraries",
      component: lazyLoadPage("Libraries"),
    },
    {
      path: "/communities",
      component: lazyLoadPage("Communities"),
    },

    // otherwise redirect to the login page
    { path: "*", redirect: "/" },
  ],
});

/*
 * Before each navigation, check if the user is logged in
 */
router.beforeEach(vuexOidcCreateRouterMiddleware(store, "oidcStore"));

// router.beforeEach((to, from, next) => {
//   //   // redirect to login page if not logged in and trying to access a restricted page
//   //   if (to.matched.some((record) => record.userta.requiresAuth)) {
//   //     console.warn(`Protected route...`);
//   //     if (store.getters["Authentication/isLoggedIn"]) {
//   //       next();
//   //       return;
//   //     }
//   //     next("/login");
//   //   } else {
//   //     next();
//   //   }
// });

export default router;
