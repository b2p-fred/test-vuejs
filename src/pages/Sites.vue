<template>
  <v-row>
    <v-col class="text-center">
      <blockquote class="blockquote">
        &#8220;Petite phrase d'introduction ...&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
      <v-card class="mx-auto" max-width="300" tile>
        <v-list shaped>
          <v-subheader>Icons</v-subheader>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 1,
    items: [
      { text: "Factory", icon: "mdi-factory" },
      { text: "Home city", icon: "mdi-home-city" },
      { text: "Home city outline", icon: "mdi-home-city-outline" },
      { text: "Home", icon: "mdi-home" },
      { text: "Home outline", icon: "mdi-home-outline" },
      { text: "Home variant", icon: "mdi-home-variant" },
      { text: "Home variant outlint", icon: "mdi-home-variant-outline" },
      { text: "Home modern", icon: "mdi-home-modern" },
    ],
  }),
};
</script>
