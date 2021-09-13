<template>
  <div>
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm"></Toolbar>
    <AddressForm ref="createForm" :values="item" :errors="violations" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { createHelpers } from "vuex-map-fields";
import AddressForm from "@/components/entities/address/Form";
import Loading from "@/components/base/Loading";
import Toolbar from "@/components/base/Toolbar";
import CreateMixin from "../../mixins/CreateMixin";

const servicePrefix = "Address";

const { mapFields } = createHelpers({
  getterType: "address/getField",
  mutationType: "address/updateField",
});

export default {
  name: "AddressCreate",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
    AddressForm,
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
    ...mapActions("address", ["create", "reset"]),
  },
};
</script>
