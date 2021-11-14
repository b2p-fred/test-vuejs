<template>
  <v-sheet>
    <h1>{{ $t("welcome") }}</h1>

    <v-carousel
      v-model="model"
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(color, i) in colors" :key="color">
        <v-sheet :color="color" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h2">Slide {{ i + 1 }} => {{ color }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <SignInDialog />
  </v-sheet>
</template>

<script>
import SignInDialog from "@/components/dialogs/SignIn";

export default {
  name: "Landing",
  components: {
    SignInDialog,
  },
  data: () => ({
    model: 0,
    colors: [
      "indigo",
      "warning",
      "pink darken-2",
      "red lighten-1",
      "deep-purple accent-4",
    ],
    slides: ["First", "Second", "Third", "Fourth", "Fifth"],
  }),
  mounted() {
    console.log("Mounted Landing!");
  },
};
</script>
