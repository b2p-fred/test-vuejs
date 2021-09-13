<template>
  <v-toolbar class="my-md-auto" elevation="0">
    <slot name="left"></slot>
    <v-spacer />
    <div>
      <v-btn
        v-if="handleEdit"
        :loading="isLoading"
        color="primary"
        @click="editItem"
      >
        {{ $t("buttons.Edit.label") }}
      </v-btn>
      <v-btn
        v-if="handleSubmit"
        :loading="isLoading"
        color="primary"
        @click="submitItem"
      >
        {{ $t("buttons.Submit.label") }}
      </v-btn>
      <v-btn
        v-if="handleReset"
        color="primary"
        class="ml-sm-2"
        @click="resetItem"
      >
        {{ $t("buttons.Reset.label") }}
      </v-btn>
      <v-btn
        v-if="handleDelete"
        color="error"
        class="ml-sm-2"
        @click="confirmDelete = true"
      >
        {{ $t("buttons.Delete.label") }}
      </v-btn>

      <v-btn v-if="handleAdd" color="primary" rounded @click="addItem">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </div>
    <ConfirmDelete
      v-if="handleDelete"
      :visible="confirmDelete"
      :handle-delete="handleDelete"
      @close="confirmDelete = false"
    />
  </v-toolbar>
</template>

<script>
import ConfirmDelete from "./ConfirmDelete";

export default {
  name: "Toolbar",
  components: {
    ConfirmDelete,
  },
  props: {
    handleEdit: {
      type: Function,
      default: () => true,
      required: false,
    },
    handleSubmit: {
      type: Function,
      default: () => true,
      required: false,
    },
    handleReset: {
      type: Function,
      default: () => true,
      required: false,
    },
    handleDelete: {
      type: Function,
      default: () => true,
      required: false,
    },
    handleAdd: {
      type: Function,
      default: () => true,
      required: false,
    },
    title: {
      type: String,
      default: () => "Title ......................",
      required: false,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      confirmDelete: false,
    };
  },
  methods: {
    addItem() {
      if (this.handleAdd) {
        this.handleAdd();
      }
    },
    editItem() {
      if (this.handleEdit) {
        this.handleEdit();
      }
    },
    submitItem() {
      if (this.handleSubmit) {
        this.handleSubmit();
      }
    },
    resetItem() {
      if (this.handleReset) {
        this.handleReset();
      }
    },
  },
};
</script>
