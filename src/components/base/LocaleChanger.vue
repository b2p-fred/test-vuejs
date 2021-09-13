// LocaleChanger.vue
<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on: menu }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn icon v-on="{ ...tooltip, ...menu }">
            <v-img
              v-if="getLanguageFlag()"
              :src="getLanguageFlag()"
              :size="flagHeight"
            />
            <v-icon v-else>mdi-earth</v-icon>
          </v-btn>
        </template>
        <span
          >Switch Language {{ currentLanguageCode }} -
          {{ currentLanguageLabel }}</span
        >
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item
        v-for="language in languages"
        :key="language.code"
        @click="changeLanguage(language.code)"
      >
        <v-list-item-avatar v-if="flag" tile>
          <v-img
            v-if="getLanguageFlag(language.code)"
            :src="getLanguageFlag(language.code)"
            :size="flagHeight"
          ></v-img>
          <v-icon v-else>mdi-earth</v-icon>
        </v-list-item-avatar>
        <v-list-item-title v-if="label">{{ language.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import locales from "@/config/locales";

export default {
  name: "LocaleChanger",
  props: {
    // true to display image flags with each language (default: true)
    flag: {
      type: Boolean,
      default: true,
    },
    // true to display name with each language (default: true)
    label: {
      type: Boolean,
      default: true,
    },
    // set the height of the image flags (default: 32)
    flagHeight: {
      type: Number,
      default: 16,
    },
    currentLanguage: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    languages() {
      return locales.getLanguages();
    },
    currentLanguageCode() {
      if (!this.currentLanguage || !this.currentLanguage) {
        return null;
      }
      return this.languages.filter((l) => l.code === this.currentLanguage)[0]
        .code;
    },
    currentLanguageLabel() {
      if (!this.currentLanguage || !this.currentLanguage) {
        return null;
      }
      return this.languages.filter((l) => l.code === this.currentLanguage)[0]
        .label;
    },
  },
  methods: {
    getLanguageFlag(code = null) {
      if (!code) {
        code = this.currentLanguageCode;
      }
      if ((!code && !this.currentLanguage) || !this.currentLanguage) {
        return null;
      }
      const languages = this.languages.filter((l) => l.code === code);
      return languages ? `/img/flags/${languages[0].flag}.png` : "";
    },
    changeLanguage(code) {
      this.$i18n.locale = code;
      this.$store.commit("SET_LANGUAGE", code);
    },
  },
};
</script>
