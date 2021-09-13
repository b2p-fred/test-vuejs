<template>
  <div>
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm"></Toolbar>
    <DocumentVersionForm ref="createForm" :values="item" :errors="violations" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { createHelpers } from "vuex-map-fields";
import DocumentVersionForm from "@/components/entities/documentversion/Form";
import Loading from "@/components/base/Loading";
import Toolbar from "@/components/base/Toolbar";
import CreateMixin from "@/mixins/CreateMixin";

const servicePrefix = "DocumentVersion";

const { mapFields } = createHelpers({
  getterType: "documentversion/getField",
  mutationType: "documentversion/updateField",
});

export default {
  name: "DocumentVersionCreate",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
    DocumentVersionForm,
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
    ...mapActions("documentversion", ["create", "reset"]),
  },
};
</script>
