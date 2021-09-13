<template>
  <div>
    <Toolbar
      :handle-submit="onSendForm"
      :handle-reset="resetForm"
      :handle-delete="del"
    />
    <ContactForm
      v-if="item"
      ref="updateForm"
      :values="item"
      :errors="violations"
    />
    <Loading :visible="isLoading || deleteLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import ContactForm from "@/components/entities/contact/Form.vue";
import Loading from "@/components/base/Loading";
import Toolbar from "@/components/base/Toolbar";
import UpdateMixin from "@/mixins/UpdateMixin";

const servicePrefix = "Contact";

export default {
  name: "ContactUpdate",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
    ContactForm,
  },
  mixins: [UpdateMixin],

  computed: {
    ...mapFields("contact", {
      deleteLoading: "isLoading",
      isLoading: "isLoading",
      error: "error",
      updated: "updated",
      violations: "violations",
    }),
    ...mapGetters("contact", ["find"]),
  },

  methods: {
    ...mapActions("contact", {
      createReset: "resetCreate",
      deleteItem: "del",
      delReset: "resetDelete",
      retrieve: "load",
      update: "update",
      updateReset: "resetUpdate",
    }),
  },
};
</script>
