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
            v-model="item.address"
            :error-messages="addressErrors"
            :label="$t('address')"
            @input="$v.item.address.$touch()"
            @blur="$v.item.address.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.address2"
            :error-messages="address2Errors"
            :label="$t('address2')"
            @input="$v.item.address2.$touch()"
            @blur="$v.item.address2.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.zipcode"
            :error-messages="zipcodeErrors"
            :label="$t('zipcode')"
            @input="$v.item.zipcode.$touch()"
            @blur="$v.item.zipcode.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.city"
            :error-messages="cityErrors"
            :label="$t('city')"
            @input="$v.item.city.$touch()"
            @blur="$v.item.city.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.country"
            :error-messages="countryErrors"
            :label="$t('country')"
            @input="$v.item.country.$touch()"
            @blur="$v.item.country.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model.number="item.lat"
            :error-messages="latErrors"
            :label="$t('lat')"
            step="0.1"
            @input="$v.item.lat.$touch()"
            @blur="$v.item.lat.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model.number="item.lng"
            :error-messages="lngErrors"
            :label="$t('lng')"
            step="0.1"
            @input="$v.item.lng.$touch()"
            @blur="$v.item.lng.$touch()"
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
  name: "AddressForm",
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
      address: null,
      address2: null,
      zipcode: null,
      city: null,
      country: null,
      lat: null,
      lng: null,
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
    addressErrors() {
      const errors = [];

      if (!this.$v.item.address.$dirty) return errors;

      has(this.violations, "address") && errors.push(this.violations.address);

      return errors;
    },
    address2Errors() {
      const errors = [];

      if (!this.$v.item.address2.$dirty) return errors;

      has(this.violations, "address2") && errors.push(this.violations.address2);

      return errors;
    },
    zipcodeErrors() {
      const errors = [];

      if (!this.$v.item.zipcode.$dirty) return errors;

      has(this.violations, "zipcode") && errors.push(this.violations.zipcode);

      return errors;
    },
    cityErrors() {
      const errors = [];

      if (!this.$v.item.city.$dirty) return errors;

      has(this.violations, "city") && errors.push(this.violations.city);

      return errors;
    },
    countryErrors() {
      const errors = [];

      if (!this.$v.item.country.$dirty) return errors;

      has(this.violations, "country") && errors.push(this.violations.country);

      return errors;
    },
    latErrors() {
      const errors = [];

      if (!this.$v.item.lat.$dirty) return errors;

      has(this.violations, "lat") && errors.push(this.violations.lat);

      return errors;
    },
    lngErrors() {
      const errors = [];

      if (!this.$v.item.lng.$dirty) return errors;

      has(this.violations, "lng") && errors.push(this.violations.lng);

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
      address: {},
      address2: {},
      zipcode: {},
      city: {},
      country: {},
      lat: {},
      lng: {},
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
