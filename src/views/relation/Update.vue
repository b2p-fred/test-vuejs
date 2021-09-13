<template>
  <div>
    <Toolbar
      :handle-submit="onSendForm"
      :handle-reset="resetForm"
      :handle-delete="del"
    />
    <RelationForm
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
import RelationForm from "@/components/entities/relation/Form.vue";
import Loading from "@/components/base/Loading";
import Toolbar from "@/components/base/Toolbar";
import UpdateMixin from "@/mixins/UpdateMixin";

const servicePrefix = "Relation";

export default {
  name: "RelationUpdate",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
    RelationForm,
  },
  mixins: [UpdateMixin],

  computed: {
    ...mapFields("relation", {
      deleteLoading: "isLoading",
      isLoading: "isLoading",
      error: "error",
      updated: "updated",
      violations: "violations",
    }),
    ...mapGetters("relation", ["find"]),
  },

  methods: {
    ...mapActions("relation", {
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
