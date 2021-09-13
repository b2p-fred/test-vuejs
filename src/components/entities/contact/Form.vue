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
            v-model="item.firstName"
            :error-messages="firstNameErrors"
            :label="$t('firstName')"
            @input="$v.item.firstName.$touch()"
            @blur="$v.item.firstName.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.lastName"
            :error-messages="lastNameErrors"
            :label="$t('lastName')"
            @input="$v.item.lastName.$touch()"
            @blur="$v.item.lastName.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.email"
            :error-messages="emailErrors"
            :label="$t('email')"
            @input="$v.item.email.$touch()"
            @blur="$v.item.email.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.identifier"
            :error-messages="identifierErrors"
            :label="$t('identifier')"
            @input="$v.item.identifier.$touch()"
            @blur="$v.item.identifier.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.password"
            :error-messages="passwordErrors"
            :label="$t('password')"
            @input="$v.item.password.$touch()"
            @blur="$v.item.password.$touch()"
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
            v-model="item.phone"
            :error-messages="phoneErrors"
            :label="$t('phone')"
            @input="$v.item.phone.$touch()"
            @blur="$v.item.phone.$touch()"
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

        <!-- todo : fix the dateTime format, not supported by default on vuetify -->
        <v-col cols="12" sm="6" md="6">
          <InputDate
            v-model="item.createdAt"
            :label="$t('createdAt')"
            :error-messages="createdAtErrors"
          />
        </v-col>
      </v-row>

      <v-row>
        <!-- todo : fix the dateTime format, not supported by default on vuetify -->
        <v-col cols="12" sm="6" md="6">
          <InputDate
            v-model="item.updatedAt"
            :label="$t('updatedAt')"
            :error-messages="updatedAtErrors"
          />
        </v-col>

        <v-col cols="12"></v-col>
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
  name: "ContactForm",
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
      firstName: null,
      lastName: null,
      email: null,
      identifier: null,
      password: null,
      language: null,
      phone: null,
      site: null,
      createdAt: null,
      updatedAt: null,
    };
  },
  computed: {
    ...mapFields("site", {
      siteSelectItems: "selectItems",
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
    firstNameErrors() {
      const errors = [];

      if (!this.$v.item.firstName.$dirty) return errors;

      has(this.violations, "firstName") &&
        errors.push(this.violations.firstName);

      return errors;
    },
    lastNameErrors() {
      const errors = [];

      if (!this.$v.item.lastName.$dirty) return errors;

      has(this.violations, "lastName") && errors.push(this.violations.lastName);

      return errors;
    },
    emailErrors() {
      const errors = [];

      if (!this.$v.item.email.$dirty) return errors;

      has(this.violations, "email") && errors.push(this.violations.email);

      return errors;
    },
    identifierErrors() {
      const errors = [];

      if (!this.$v.item.identifier.$dirty) return errors;

      has(this.violations, "identifier") &&
        errors.push(this.violations.identifier);

      return errors;
    },
    passwordErrors() {
      const errors = [];

      if (!this.$v.item.password.$dirty) return errors;

      has(this.violations, "password") && errors.push(this.violations.password);

      return errors;
    },
    languageErrors() {
      const errors = [];

      if (!this.$v.item.language.$dirty) return errors;

      has(this.violations, "language") && errors.push(this.violations.language);

      return errors;
    },
    phoneErrors() {
      const errors = [];

      if (!this.$v.item.phone.$dirty) return errors;

      has(this.violations, "phone") && errors.push(this.violations.phone);

      return errors;
    },
    siteErrors() {
      const errors = [];

      if (!this.$v.item.site.$dirty) return errors;

      has(this.violations, "site") && errors.push(this.violations.site);

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
  },
  methods: {
    ...mapActions({
      siteGetSelectItems: "site/fetchSelectItems",
    }),
  },
  validations: {
    item: {
      type: {},
      firstName: {},
      lastName: {},
      email: {},
      identifier: {},
      password: {},
      language: {},
      phone: {},
      site: {},
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
