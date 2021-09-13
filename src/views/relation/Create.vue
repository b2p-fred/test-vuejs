<template>
  <div>
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm"></Toolbar>
    <RelationForm ref="createForm" :values="item" :errors="violations" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { createHelpers } from "vuex-map-fields";
import RelationForm from "@/components/entities/relation/Form";
import Loading from "@/components/base/Loading";
import Toolbar from "@/components/base/Toolbar";
import CreateMixin from "@/mixins/CreateMixin";

const servicePrefix = "Relation";

const { mapFields } = createHelpers({
  getterType: "relation/getField",
  mutationType: "relation/updateField",
});

export default {
  name: "RelationCreate",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
    RelationForm,
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
    ...mapActions("relation", ["create", "reset"]),
  },
};
</script>
