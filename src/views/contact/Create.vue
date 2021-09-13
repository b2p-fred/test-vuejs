<template>
  <div>
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm"></Toolbar>
    <ContactForm ref="createForm" :values="item" :errors="violations" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { createHelpers } from "vuex-map-fields";
import ContactForm from "@/components/entities/contact/Form";
import Loading from "@/components/base/Loading";
import Toolbar from "@/components/base/Toolbar";
import CreateMixin from "../../mixins/CreateMixin";

const servicePrefix = "Contact";

const { mapFields } = createHelpers({
  getterType: "contact/getField",
  mutationType: "contact/updateField",
});

export default {
  name: "ContactCreate",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
    ContactForm,
  },
  mixins: [CreateMixin],
  data() {
    return {
      item: {},
    };
  },
  computed: {
    ...mapFields(["error", "isLoading", "created", "violations"]),
  },
  methods: {
    ...mapActions("contact", ["create", "reset"]),
  },
};
</script>
