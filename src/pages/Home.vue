<template>
  <v-sheet>
    <v-card>
      <v-banner single-line :sticky="sticky">
        You are currently in offline mode.

        <template v-slot:actions>
          <v-btn text color="deep-purple accent-4"> Go online </v-btn>
        </template>
      </v-banner>
    </v-card>
    <v-card>
      <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <CustomCard title="Welcome to Your Vue.js App" />

        <HelloWorld msg="Welcome to Vuetify" />
      </div>
    </v-card>
  </v-sheet>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import CustomCard from "@/components/CustomCard";

export default {
  name: "Home",
  components: {
    CustomCard,
    HelloWorld,
  },
  data: () => ({
    sticky: true,
  }),
};
</script>
