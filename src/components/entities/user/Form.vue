<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.firstName"
            :error-messages="firstNameErrors"
            :label="$t('firstName')"
            required
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
            required
            @input="$v.item.lastName.$touch()"
            @blur="$v.item.lastName.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.language"
            :error-messages="languageErrors"
            :label="$t('language')"
            required
            @input="$v.item.language.$touch()"
            @blur="$v.item.language.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.gender"
            :error-messages="genderErrors"
            :label="$t('gender')"
            @input="$v.item.gender.$touch()"
            @blur="$v.item.gender.$touch()"
          />
        </v-col>

        <!-- todo : fix the dateTime format, not supported by default on vuetify -->
        <v-col cols="12" sm="6" md="6">
          <InputDate
            v-model="item.birthdate"
            :label="$t('birthdate')"
            :error-messages="birthdateErrors"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import has from "lodash/has";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import InputDate from "@/components/base/InputDate";
import { date } from "@/validators/date";

export default {
  name: "UserForm",
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
      email: null,
      firstName: null,
      lastName: null,
      language: null,
      gender: null,
      birthdate: null,
    };
  },
  computed: {
    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    },

    emailErrors() {
      const errors = [];

      if (!this.$v.item.email.$dirty) return errors;

      has(this.violations, "email") && errors.push(this.violations.email);

      !this.$v.item.email.required && errors.push(this.$t("Field is required"));

      return errors;
    },
    firstNameErrors() {
      const errors = [];

      if (!this.$v.item.firstName.$dirty) return errors;

      has(this.violations, "firstName") &&
        errors.push(this.violations.firstName);

      !this.$v.item.firstName.required &&
        errors.push(this.$t("Field is required"));

      return errors;
    },
    lastNameErrors() {
      const errors = [];

      if (!this.$v.item.lastName.$dirty) return errors;

      has(this.violations, "lastName") && errors.push(this.violations.lastName);

      !this.$v.item.lastName.required &&
        errors.push(this.$t("Field is required"));

      return errors;
    },
    languageErrors() {
      const errors = [];

      if (!this.$v.item.language.$dirty) return errors;

      has(this.violations, "language") && errors.push(this.violations.language);

      !this.$v.item.language.required &&
        errors.push(this.$t("Field is required"));

      return errors;
    },
    genderErrors() {
      const errors = [];

      if (!this.$v.item.gender.$dirty) return errors;

      has(this.violations, "gender") && errors.push(this.violations.gender);

      return errors;
    },
    birthdateErrors() {
      const errors = [];

      if (!this.$v.item.birthdate.$dirty) return errors;

      has(this.violations, "birthdate") &&
        errors.push(this.violations.birthdate);

      return errors;
    },

    violations() {
      return this.errors || {};
    },
  },
  mounted() {},
  methods: {},
  validations: {
    item: {
      email: {
        required,
      },
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      language: {
        required,
      },
      gender: {},
      birthdate: {
        date,
      },
    },
  },
};
</script>
