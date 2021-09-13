<template>
  <div class="relation-list">
    <Toolbar :handle-add="addHandler" />

    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h1>Relation List</h1>
        </v-flex>
        <v-flex lg12>
          <DataFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
            <RelationFilterForm
              ref="filterForm"
              slot="filter"
              :values="filters"
            />
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
            <template slot="item.sender" slot-scope="{ item }">
              {{ item["@id"] }}
            </template>
            <template slot="item.recipient" slot-scope="{ item }">
              {{ item["@id"] }}
            </template>
            <template slot="item.protocol" slot-scope="{ item }">
              {{ item["@id"] }}
            </template>
            <template slot="item.createdAt" slot-scope="{ item }">
              {{ formatDateTime(item["createdAt"], "long") }}
            </template>
            <template slot="item.updatedAt" slot-scope="{ item }">
              {{ formatDateTime(item["updatedAt"], "long") }}
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
import RelationFilterForm from "@/components/entities/relation/Filter";
import DataFilter from "@/components/base/DataFilter";
import Toolbar from "@/components/base/Toolbar";

export default {
  name: "RelationList",
  servicePrefix: "Relation",
  components: {
    Toolbar,
    ActionCell,
    RelationFilterForm,
    DataFilter,
  },
  mixins: [ListMixin],
  data() {
    return {
      headers: [
        { text: "type", value: "type" },
        { text: "sender", value: "sender" },
        { text: "recipient", value: "recipient" },
        { text: "protocol", value: "protocol" },
        { text: "comments", value: "comments" },
        { text: "createdAt", value: "createdAt" },
        { text: "updatedAt", value: "updatedAt" },
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
    ...mapGetters("relation", {
      items: "list",
    }),
    ...mapFields("relation", {
      deletedItem: "deleted",
      error: "error",
      isLoading: "isLoading",
      resetList: "resetList",
      totalItems: "totalItems",
      view: "view",
    }),
  },
  methods: {
    ...mapActions("relation", {
      getPage: "fetchAll",
      deleteItem: "del",
    }),
  },
};
</script>
