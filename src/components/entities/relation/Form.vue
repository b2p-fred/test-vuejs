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
          <v-combobox
            v-model="item.sender"
            :items="senderSelectItems"
            :error-messages="senderErrors"
            :no-data-text="$t('No results')"
            :label="$t('sender')"
            item-text="name"
            item-value="@id"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-combobox
            v-model="item.recipient"
            :items="recipientSelectItems"
            :error-messages="recipientErrors"
            :no-data-text="$t('No results')"
            :label="$t('recipient')"
            item-text="name"
            item-value="@id"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-combobox
            v-model="item.protocol"
            :items="protocolSelectItems"
            :error-messages="protocolErrors"
            :no-data-text="$t('No results')"
            :label="$t('protocol')"
            item-text="name"
            item-value="@id"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.comments"
            :error-messages="commentsErrors"
            :label="$t('comments')"
            @input="$v.item.comments.$touch()"
            @blur="$v.item.comments.$touch()"
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
  name: "RelationForm",
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
      sender: null,
      recipient: null,
      protocol: null,
      comments: null,
      createdAt: null,
      updatedAt: null,
    };
  },
  computed: {
    ...mapFields("user", {
      senderSelectItems: "selectItems",
    }),
    ...mapFields("user", {
      recipientSelectItems: "selectItems",
    }),
    ...mapFields("documentversion", {
      protocolSelectItems: "selectItems",
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
    senderErrors() {
      const errors = [];

      if (!this.$v.item.sender.$dirty) return errors;

      has(this.violations, "sender") && errors.push(this.violations.sender);

      return errors;
    },
    recipientErrors() {
      const errors = [];

      if (!this.$v.item.recipient.$dirty) return errors;

      has(this.violations, "recipient") &&
        errors.push(this.violations.recipient);

      return errors;
    },
    protocolErrors() {
      const errors = [];

      if (!this.$v.item.protocol.$dirty) return errors;

      has(this.violations, "protocol") && errors.push(this.violations.protocol);

      return errors;
    },
    commentsErrors() {
      const errors = [];

      if (!this.$v.item.comments.$dirty) return errors;

      has(this.violations, "comments") && errors.push(this.violations.comments);

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
    this.senderGetSelectItems();
    this.recipientGetSelectItems();
    this.protocolGetSelectItems();
  },
  methods: {
    ...mapActions({
      senderGetSelectItems: "user/fetchSelectItems",
    }),
    ...mapActions({
      recipientGetSelectItems: "user/fetchSelectItems",
    }),
    ...mapActions({
      protocolGetSelectItems: "documentversion/fetchSelectItems",
    }),
  },
  validations: {
    item: {
      type: {},
      sender: {},
      recipient: {},
      protocol: {},
      comments: {},
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
