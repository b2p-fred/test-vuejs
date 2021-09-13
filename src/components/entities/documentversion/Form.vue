<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-combobox
            v-model="item.document"
            :items="documentSelectItems"
            :error-messages="documentErrors"
            :no-data-text="$t('No results')"
            :label="$t('document')"
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
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.description"
            :error-messages="descriptionErrors"
            :label="$t('description')"
            @input="$v.item.description.$touch()"
            @blur="$v.item.description.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-combobox
            v-model="item.initiator"
            :items="initiatorSelectItems"
            :error-messages="initiatorErrors"
            :no-data-text="$t('No results')"
            :label="$t('initiator')"
            item-text="name"
            item-value="@id"
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
  name: "DocumentVersionForm",
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
      document: null,
      version: null,
      description: null,
      initiator: null,
      createdAt: null,
      updatedAt: null,
    };
  },
  computed: {
    ...mapFields("document", {
      documentSelectItems: "selectItems",
    }),
    ...mapFields("user", {
      initiatorSelectItems: "selectItems",
    }),

    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    },

    documentErrors() {
      const errors = [];

      if (!this.$v.item.document.$dirty) return errors;

      has(this.violations, "document") && errors.push(this.violations.document);

      return errors;
    },
    versionErrors() {
      const errors = [];

      if (!this.$v.item.version.$dirty) return errors;

      has(this.violations, "version") && errors.push(this.violations.version);

      return errors;
    },
    descriptionErrors() {
      const errors = [];

      if (!this.$v.item.description.$dirty) return errors;

      has(this.violations, "description") &&
        errors.push(this.violations.description);

      return errors;
    },
    initiatorErrors() {
      const errors = [];

      if (!this.$v.item.initiator.$dirty) return errors;

      has(this.violations, "initiator") &&
        errors.push(this.violations.initiator);

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
    this.documentGetSelectItems();
    this.initiatorGetSelectItems();
  },
  methods: {
    ...mapActions({
      documentGetSelectItems: "document/fetchSelectItems",
    }),
    ...mapActions({
      initiatorGetSelectItems: "user/fetchSelectItems",
    }),
  },
  validations: {
    item: {
      document: {},
      version: {},
      description: {},
      initiator: {},
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
