<template>
  <div>
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm"></Toolbar>
    <DocumentForm ref="createForm" :values="item" :errors="violations" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { createHelpers } from "vuex-map-fields";
import DocumentForm from "@/components/entities/document/Form";
import Loading from "@/components/base/Loading";
import Toolbar from "@/components/base/Toolbar";
import CreateMixin from "@/mixins/CreateMixin";

const servicePrefix = "Document";

const { mapFields } = createHelpers({
  getterType: "document/getField",
  mutationType: "document/updateField",
});

export default {
  name: "DocumentCreate",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
    DocumentForm,
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
    ...mapActions("document", ["create", "reset"]),
  },
};
</script>
