<template>
  <v-app id="my-front">
    <snackbar></snackbar>

    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer
      v-show="userLoggedIn"
      v-model="drawer"
      :mini-variant="miniVariant"
      permanent
      expand-on-hover
      clipped
      fixed
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Application </v-list-item-title>
          <v-list-item-subtitle> pages </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'AddressList' }">
          <v-list-item-action>
            <v-icon>mdi-book</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Books </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'ContactList' }">
          <v-list-item-action>
            <v-icon>mdi-comment-quote</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Reviews </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense nav>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            router
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      v-show="userLoggedIn"
      clipped-left
      color="deep-purple accent-1"
      fixed
      dense
      elevate-on-scroll
      dark
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <span v-if="userLoggedIn">
        <v-avatar color="primary" size="32">{{ userInitials }}</v-avatar>
      </span>
    </v-app-bar>

    <v-main>
      <Breadcrumb layout-class="pl-3 py-3" />

      <v-container fluid>
        <LocaleChanger
          flag
          label
          current-language="fr-FR"
          :flag-height="12"
        ></LocaleChanger>

        <router-view />
      </v-container>
    </v-main>

    <v-navigation-drawer
      v-show="true"
      v-model="rightDrawer"
      right
      clipped
      temporary
      fixed
      app
    >
      <template #prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-avatar color="primary" size="32">{{ userInitials }}</v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ userFriendlyName }}</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider />

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Application </v-list-item-title>
          <v-list-item-subtitle> settings </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list-item @click="goLogout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} - B2PWeb</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { readFromStorage } from "@/utils/local-storage";
import router from "@/router";

import Breadcrumb from "@/components/base/Breadcrumb";
import Snackbar from "@/components/base/Snackbar";

import LocaleChanger from "@/components/base/LocaleChanger";

export default {
  components: {
    Breadcrumb,
    Snackbar,
    LocaleChanger,
  },

  data: () => ({
    drawer: null,
    fixed: false,
    selectedItem: 1,
    items: [
      {
        icon: "mdi-apps",
        title: "Dashboard",
        to: "/",
      },
      {
        icon: "mdi-home-city-outline",
        title: "Addresses",
        to: "/addresses",
      },
      {
        icon: "mdi-account-group",
        title: "Contacts",
        to: "/contacts",
      },
      {
        icon: "mdi-book",
        title: "Documents",
        to: "/documents",
      },
      {
        icon: "mdi-book-alphabet",
        title: "Documents versions",
        to: "/documentversions",
      },
      {
        icon: "mdi-signature-freehand",
        title: "Relations",
        to: "/relations",
      },
      {
        icon: "mdi-factory",
        title: "Sites",
        to: "/sites",
      },
      // {
      //   icon: "mdi-library-shelves",
      //   title: "Libraries",
      //   to: "/libraries",
      // },
      // {
      //   icon: "mdi-account-group",
      //   title: "Communities",
      //   to: "/communities",
      // },
    ],
    miniVariant: true,
    rightDrawer: false,
    title: "This is the application title",
  }),
  computed: {
    ...mapState({
      currentUser: (state) => state.Authentication,
      currentLanguage: (state) => state.currentLanguage,
    }),
    userLoggedIn() {
      return this.isLoggedIn();
    },
    userFriendlyName() {
      return this.friendlyName();
    },
    userInitials() {
      return this.initials();
    },
  },
  created() {
    const userToken = readFromStorage("token") || "";
    this.$store.commit("Authentication/SET_TOKEN", userToken);
    if (userToken) {
      console.log("A user is still signed-in!", this.currentUser);
    }

    // Get the main API configuration
    this.getApiVersion({ language: this.currentLanguage });

    // Test V4V, get the OIDC configuration
    if (process.env.AUTH_URL) {
      console.warn(
        `An external authorization URL (${process.env.AUTH_URL}) is defined, enabling oAuth...`
      );
      this.$store.commit("ENABLE_OAUTH");
      this.getOidcConfiguration();
    }

    // Only if a user signed in
    this.$root.$on("user-signed-in", () => {
      console.log("A user just signed-in!", this.currentUser);

      if (router.currentRoute.path === "/login") {
        router.push("/").catch((err) => {
          console.error("Home page is not available!", err);
        });
      }

      // this.userLoggedIn = true;
    });
  },
  mounted() {
    console.log("mounted - Logged-in", this.userLoggedIn, this.isLoggedIn());

    this.userLoggedIn && this.$root.$emit("user-signed-in");
  },
  methods: {
    ...mapGetters("Alert", ["lastLoginMessage"]),
    ...mapGetters("Authentication", ["isLoggedIn", "friendlyName", "initials"]),
    ...mapActions({ getApiVersion: "Api/getVersion" }),
    ...mapActions({ logout: "Authentication/logout" }),
    ...mapActions({
      getOidcConfiguration: "OidcConfiguration/getOidcConfiguration",
    }),
    goLogout() {
      this.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
