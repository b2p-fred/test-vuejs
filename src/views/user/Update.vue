<template>
  <div>
    <Toolbar
      :handle-submit="onSendForm"
      :handle-reset="resetForm"
      :handle-delete="del"
    />
    <UserForm
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
import UserForm from "@/components/entities/user/Form.vue";
import Loading from "@/components/base/Loading";
import Toolbar from "@/components/base/Toolbar";
import UpdateMixin from "@/mixins/UpdateMixin";

const servicePrefix = "User";

export default {
  name: "UserUpdate",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
    UserForm,
  },
  mixins: [UpdateMixin],

  computed: {
    ...mapFields("user", {
      deleteLoading: "isLoading",
      isLoading: "isLoading",
      error: "error",
      updated: "updated",
      violations: "violations",
    }),
    ...mapGetters("user", ["find"]),
  },

  methods: {
    ...mapActions("user", {
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
