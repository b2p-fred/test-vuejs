<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.type"
            :error-messages="typeErrors"
            :label="$t('type')"
            @input="$v.item.type.$touch()"
            @blur="$v.item.type.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.name"
            :error-messages="nameErrors"
            :label="$t('name')"
            @input="$v.item.name.$touch()"
            @blur="$v.item.name.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.title"
            :error-messages="titleErrors"
            :label="$t('title')"
            @input="$v.item.title.$touch()"
            @blur="$v.item.title.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.description"
            :error-messages="descriptionErrors"
            :label="$t('description')"
            @input="$v.item.description.$touch()"
            @blur="$v.item.description.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.language"
            :error-messages="languageErrors"
            :label="$t('language')"
            @input="$v.item.language.$touch()"
            @blur="$v.item.language.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.filename"
            :error-messages="filenameErrors"
            :label="$t('filename')"
            @input="$v.item.filename.$touch()"
            @blur="$v.item.filename.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-combobox
            v-model="item.site"
            :items="siteSelectItems"
            :error-messages="siteErrors"
            :no-data-text="$t('No results')"
            :label="$t('site')"
            item-text="name"
            item-value="@id"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model.number="item.version"
            :error-messages="versionErrors"
            :label="$t('version')"
            @input="$v.item.version.$touch()"
            @blur="$v.item.version.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <!-- todo : fix the dateTime format, not supported by default on vuetify -->
        <v-col cols="12" sm="6" md="6">
          <InputDate
            v-model="item.versionedAt"
            :label="$t('versionedAt')"
            :error-messages="versionedAtErrors"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-combobox
            v-model="item.versions"
            :items="versionsSelectItems"
            :error-messages="versionsErrors"
            :no-data-text="$t('No results')"
            :label="$t('versions')"
            multiple
            item-text="name"
            item-value="@id"
            chips
          />
        </v-col>
      </v-row>

      <v-row>
        <!-- todo : fix the dateTime format, not supported by default on vuetify -->
        <v-col cols="12" sm="6" md="6">
          <InputDate
            v-model="item.createdAt"
            :label="$t('createdAt')"
            :error-messages="createdAtErrors"
          />
        </v-col>

        <!-- todo : fix the dateTime format, not supported by default on vuetify -->
        <v-col cols="12" sm="6" md="6">
          <InputDate
            v-model="item.updatedAt"
            :label="$t('updatedAt')"
            :error-messages="updatedAtErrors"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import has from "lodash/has";
import { validationMixin } from "vuelidate";
import { mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";
import InputDate from "@/components/base/InputDate";
import { date } from "@/validators/date";

export default {
  name: "DocumentForm",
  components: {
    InputDate,
  },
  mixins: [validationMixin],
  props: {
    values: {
      type: Object,
      required: true,
    },

    errors: {
      type: Object,
      default: () => {},
    },

    initialValues: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      type: null,
      name: null,
      title: null,
      description: null,
      language: null,
      filename: null,
      site: null,
      version: null,
      versionedAt: null,
      versions: null,
      createdAt: null,
      updatedAt: null,
    };
  },
  computed: {
    ...mapFields("site", {
      siteSelectItems: "selectItems",
    }),
    ...mapFields("documentversion", {
      versionsSelectItems: "selectItems",
    }),

    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    },

    typeErrors() {
      const errors = [];

      if (!this.$v.item.type.$dirty) return errors;

      has(this.violations, "type") && errors.push(this.violations.type);

      return errors;
    },
    nameErrors() {
      const errors = [];

      if (!this.$v.item.name.$dirty) return errors;

      has(this.violations, "name") && errors.push(this.violations.name);

      return errors;
    },
    titleErrors() {
      const errors = [];

      if (!this.$v.item.title.$dirty) return errors;

      has(this.violations, "title") && errors.push(this.violations.title);

      return errors;
    },
    descriptionErrors() {
      const errors = [];

      if (!this.$v.item.description.$dirty) return errors;

      has(this.violations, "description") &&
        errors.push(this.violations.description);

      return errors;
    },
    languageErrors() {
      const errors = [];

      if (!this.$v.item.language.$dirty) return errors;

      has(this.violations, "language") && errors.push(this.violations.language);

      return errors;
    },
    filenameErrors() {
      const errors = [];

      if (!this.$v.item.filename.$dirty) return errors;

      has(this.violations, "filename") && errors.push(this.violations.filename);

      return errors;
    },
    siteErrors() {
      const errors = [];

      if (!this.$v.item.site.$dirty) return errors;

      has(this.violations, "site") && errors.push(this.violations.site);

      return errors;
    },
    versionErrors() {
      const errors = [];

      if (!this.$v.item.version.$dirty) return errors;

      has(this.violations, "version") && errors.push(this.violations.version);

      return errors;
    },
    versionedAtErrors() {
      const errors = [];

      if (!this.$v.item.versionedAt.$dirty) return errors;

      has(this.violations, "versionedAt") &&
        errors.push(this.violations.versionedAt);

      return errors;
    },
    versionsErrors() {
      const errors = [];

      if (!this.$v.item.versions.$dirty) return errors;

      has(this.violations, "versions") && errors.push(this.violations.versions);

      return errors;
    },
    createdAtErrors() {
      const errors = [];

      if (!this.$v.item.createdAt.$dirty) return errors;

      has(this.violations, "createdAt") &&
        errors.push(this.violations.createdAt);

      return errors;
    },
    updatedAtErrors() {
      const errors = [];

      if (!this.$v.item.updatedAt.$dirty) return errors;

      has(this.violations, "updatedAt") &&
        errors.push(this.violations.updatedAt);

      return errors;
    },

    violations() {
      return this.errors || {};
    },
  },
  mounted() {
    this.siteGetSelectItems();
    this.versionsGetSelectItems();
  },
  methods: {
    ...mapActions({
      siteGetSelectItems: "site/fetchSelectItems",
    }),
    ...mapActions({
      versionsGetSelectItems: "documentversion/fetchSelectItems",
    }),
  },
  validations: {
    item: {
      type: {},
      name: {},
      title: {},
      description: {},
      language: {},
      filename: {},
      site: {},
      version: {},
      versionedAt: {
        date,
      },
      versions: {},
      createdAt: {
        date,
      },
      updatedAt: {
        date,
      },
    },
  },
};
</script>
