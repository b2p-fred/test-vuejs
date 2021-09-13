<template>
  <div class="documentversion-list">
    <Toolbar :handle-add="addHandler" />

    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h1>DocumentVersion List</h1>
        </v-flex>
        <v-flex lg12>
          <DataFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
            <DocumentVersionFilterForm
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
            <template slot="item.document" slot-scope="{ item }">
              {{ item["@id"] }}
            </template>
            <template slot="item.version" slot-scope="{ item }">
              {{ $t(item["version"]) }}
            </template>
            <template slot="item.initiator" slot-scope="{ item }">
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
import ListMixin from "../../mixins/ListMixin";
import ActionCell from "@/components/base/ActionCell";
import DocumentVersionFilterForm from "@/components/entities/documentversion/Filter";
import DataFilter from "@/components/base/DataFilter";
import Toolbar from "@/components/base/Toolbar";

export default {
  name: "DocumentVersionList",
  servicePrefix: "DocumentVersion",
  components: {
    Toolbar,
    ActionCell,
    DocumentVersionFilterForm,
    DataFilter,
  },
  mixins: [ListMixin],
  data() {
    return {
      headers: [
        { text: "document", value: "document" },
        { text: "version", value: "version" },
        { text: "description", value: "description" },
        { text: "initiator", value: "initiator" },
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
    ...mapGetters("documentversion", {
      items: "list",
    }),
    ...mapFields("documentversion", {
      deletedItem: "deleted",
      error: "error",
      isLoading: "isLoading",
      resetList: "resetList",
      totalItems: "totalItems",
      view: "view",
    }),
  },
  methods: {
    ...mapActions("documentversion", {
      getPage: "fetchAll",
      deleteItem: "del",
    }),
  },
};
</script>
