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

Vue.use(Router);

function lazyLoadPage(view) {
  return () => import(`../pages/${view}.vue`);
}

const router = new Router({
  mode: "history",
  routes: [
    { path: "/login", component: lazyLoadPage("Landing") },
    {
      path: "/",
      component: lazyLoadPage("Home"),
      meta: { requiresAuth: true },
    },
    {
      path: "/dashboard",
      component: lazyLoadPage("Home"),
      meta: { requiresAuth: true },
    },
    {
      path: "/sites",
      component: lazyLoadPage("Sites"),
      meta: { requiresAuth: true },
    },
    {
      path: "/libraries",
      component: lazyLoadPage("Libraries"),
      meta: { requiresAuth: true },
    },
    {
      path: "/communities",
      component: lazyLoadPage("Communities"),
      meta: { requiresAuth: true },
    },

    // otherwise redirect to the login page
    { path: "*", redirect: "/", meta: { requiresAuth: true } },
  ],
});

/*
 * Before each navigation, check if the user is logged in
 */
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.warn(`Protected route...`);
    if (store.getters["User/isLoggedIn"]) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
