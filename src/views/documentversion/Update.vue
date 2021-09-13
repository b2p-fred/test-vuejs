<template>
  <div>
    <Toolbar
      :handle-submit="onSendForm"
      :handle-reset="resetForm"
      :handle-delete="del"
    />
    <DocumentVersionForm
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
import DocumentVersionForm from "@/components/entities/documentversion/Form.vue";
import Loading from "@/components/base/Loading";
import Toolbar from "@/components/base/Toolbar";
import UpdateMixin from "@/mixins/UpdateMixin";

const servicePrefix = "DocumentVersion";

export default {
  name: "DocumentVersionUpdate",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
    DocumentVersionForm,
  },
  mixins: [UpdateMixin],

  computed: {
    ...mapFields("documentversion", {
      deleteLoading: "isLoading",
      isLoading: "isLoading",
      error: "error",
      updated: "updated",
      violations: "violations",
    }),
    ...mapGetters("documentversion", ["find"]),
  },

  methods: {
    ...mapActions("documentversion", {
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
