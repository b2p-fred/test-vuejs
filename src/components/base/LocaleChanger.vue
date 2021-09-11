// LocaleChanger.vue
<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on: menu }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn icon v-on="{ ...tooltip, ...menu }">
            <img v-if="currentLanguageIcon" :src="currentLanguageIcon" />
            <v-icon v-else>mdi-earth</v-icon>
          </v-btn>
        </template>
        <span>Switch Language</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item
        v-for="language in languages"
        :key="language.id"
        @click="changeLanguage(language.id)"
      >
        <v-list-item-avatar tile size="24">
          <v-img :src="language.flagSrc"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{ language.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

  <div v-if="!dropdown" class="text-center">
    <b-list-group horizontal="sm" class="my-3 text-center">
      <b-list-group-item
        v-for="locale in locales"
        :key="locale.code"
        button
        :disabled="locale.code === $i18n.locale"
        class="w-25 mx-auto"
        @click="relocalize(locale.code)"
      >
        <img
          v-if="flag"
          :src="require('@/assets/flags/' + locale.flag + '.png')"
          :height="flagHeight"
          :alt="locale.name"
        />
        <span v-if="flag && name"> &nbsp;&nbsp; </span>
        <span v-if="name">
          {{ locale.name }}
        </span>
      </b-list-group-item>
    </b-list-group>
  </div>

  <b-nav-item-dropdown v-else right>
    <template v-slot:button-content>
      <img
        v-if="flag"
        :src="require('@/assets/flags/' + locales[$i18n.locale].flag + '.png')"
        height="16px"
        :alt="locales[$i18n.locale].name"
      />
      <span v-if="flag && name"> &nbsp;&#8208;&nbsp; </span>
      <span v-if="name">
        {{ locales[$i18n.locale].name }}
      </span>
    </template>

    <b-dropdown-item
      v-for="locale in locales"
      :key="locale.code"
      @click="relocalize(locale.code)"
    >
      <img
        v-if="flag"
        :src="require('../assets/flags/' + locale.flag + '.png')"
        :height="flagHeight"
        :alt="locale.name"
      />
      <span v-if="flag && name"> &nbsp;&#8208;&nbsp; </span>
      <span v-if="name">
        {{ locale.name }}
      </span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { localize } from "vee-validate";

export default {
  name: "LocaleChanger",
  props: {
    // true to display a drop down for a navigation bar (default: true)
    dropdown: {
      type: Boolean,
      default: true,
    },
    // true to display image flags with each language (default: true)
    flag: {
      type: Boolean,
      default: true,
    },
    // true to display name with each language (default: true)
    name: {
      type: Boolean,
      default: true,
    },
    // set the height of the image flags (default: 32)
    flagHeight: {
      type: Number,
      default: 32,
    },

    languages: {
      type: Array,
      required: true,
    },
    currentLanguage: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      locales: {
        en: {
          code: "en",
          flag: "gb",
          name: "English",
        },
        fr: {
          code: "fr",
          flag: "fr",
          name: "Français",
        },
      },
    };
  },
  computed: {
    currentLanguageIcon() {
      if (!this.currentLanguage || !this.currentLanguage) {
        return null;
      }
      return this.languages.filter((x) => x.id === this.currentLanguage)[0]
        .flagSrc;
    },
  },
  methods: {
    relocalize(code) {
      this.$i18n.locale = code;
      // Vee-validation locale update
      // localize(code);

      // Local change signal for the root application
      // this.$emit("language-changed", code);
      // this.$root.$emit("language-changed", code);
      this.$store.commit("SET_LANGUAGE");
    },
  },
};
</script>
