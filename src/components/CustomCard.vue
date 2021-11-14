<!-- Vue Component -->

<template>
  <v-card>
    <v-card-title>
      <span v-text="title" />

      <v-spacer />

      <v-btn @click="requestLogin"> Login </v-btn>
    </v-card-title>

    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CustomCard",

  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    requestLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
