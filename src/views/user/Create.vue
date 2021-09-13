<template>
  <div>
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm"></Toolbar>
    <UserForm ref="createForm" :values="item" :errors="violations" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { createHelpers } from "vuex-map-fields";
import UserForm from "@/components/entities/user/Form";
import Loading from "@/components/base/Loading";
// import Toolbar from "@/components/base/Toolbar";
import CreateMixin from "../../mixins/CreateMixin";

const servicePrefix = "User";

const { mapFields } = createHelpers({
  getterType: "user/getField",
  mutationType: "user/updateField",
});

export default {
  name: "UserCreate",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
    UserForm,
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
    ...mapActions("user", ["create", "reset"]),
  },
};
</script>
