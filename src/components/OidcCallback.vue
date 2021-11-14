<!-- https://github.com/perarnborg/vuex-oidc-example/blob/master/src/views/OidcCallback.vue -->

<template>
  <div></div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "OidcCallback",
  mounted() {
    this.oidcSignInCallback()
      .then((redirectPath) => {
        this.$router.push(redirectPath);
      })
      .catch((err) => {
        console.error("oidc callback, redirect: ", err);
        // todo: what to do?
        this.$router.push("/error"); // Handle errors any way you want
      });
  },
  methods: {
    ...mapActions({ oidcSignInCallback: "oidcStore/oidcSignInCallback" }),
  },
};
</script>
