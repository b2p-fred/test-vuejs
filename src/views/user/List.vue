<template>
  <div class="user-list">
    <Toolbar :handle-add="addHandler" />

    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h1>User List</h1>
        </v-flex>
        <v-flex lg12>
          <DataFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
            <UserFilterForm ref="filterForm" slot="filter" :values="filters" />
          </DataFilter>

          <br />

          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :items-per-page.sync="options.itemsPerPage"
            :loading="isLoading"
            :loading-text="$t('Loading...')"
            :options.sync="options"
            :server-items-length="totalItems"
            class="elevation-1"
            item-key="@id"
            show-select
            @update:options="onUpdateOptions"
          >
            <template slot="item.birthdate" slot-scope="{ item }">
              {{ formatDateTime(item["birthdate"], "long") }}
            </template>

            <ActionCell
              slot="item.action"
              slot-scope="props"
              :handle-show="() => showHandler(props.item)"
              :handle-edit="() => editHandler(props.item)"
              :handle-delete="() => deleteHandler(props.item)"
            ></ActionCell>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import ListMixin from "@/mixins/ListMixin";
import ActionCell from "@/components/base/ActionCell";
import UserFilterForm from "@/components/entities/user/Filter";
import DataFilter from "@/components/base/DataFilter";
// import Toolbar from "@/components/base/base/Toolbar";

export default {
  name: "UserList",
  servicePrefix: "User",
  components: {
    Toolbar,
    ActionCell,
    UserFilterForm,
    DataFilter,
  },
  mixins: [ListMixin],
  data() {
    return {
      headers: [
        { text: "email", value: "email" },
        { text: "roles", value: "roles" },
        { text: "firstName", value: "firstName" },
        { text: "lastName", value: "lastName" },
        { text: "language", value: "language" },
        { text: "gender", value: "gender" },
        { text: "birthdate", value: "birthdate" },
        {
          text: "Actions",
          value: "action",
          sortable: false,
        },
      ],
      selected: [],
    };
  },
  computed: {
    ...mapGetters("theUsers", {
      items: "list",
    }),
    ...mapFields("theUsers", {
      deletedItem: "deleted",
      error: "error",
      isLoading: "isLoading",
      resetList: "resetList",
      totalItems: "totalItems",
      view: "view",
    }),
  },
  methods: {
    ...mapActions("theUsers", {
      getPage: "fetchAll",
      deleteItem: "del",
    }),
  },
};
</script>
