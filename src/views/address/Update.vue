<template>
  <div>
    <Toolbar
      :handle-submit="onSendForm"
      :handle-reset="resetForm"
      :handle-delete="del"
    />
    <AddressForm
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
import AddressForm from "@/components/entities/address/Form.vue";
import Loading from "@/components/base/Loading";
import Toolbar from "@/components/base/Toolbar";
import UpdateMixin from "@/mixins/UpdateMixin";

const servicePrefix = "Address";

export default {
  name: "AddressUpdate",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
    AddressForm,
  },
  mixins: [UpdateMixin],

  computed: {
    ...mapFields("address", {
      deleteLoading: "isLoading",
      isLoading: "isLoading",
      error: "error",
      updated: "updated",
      violations: "violations",
    }),
    ...mapGetters("address", ["find"]),
  },

  methods: {
    ...mapActions("address", {
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
