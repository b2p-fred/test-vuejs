<template>
  <div class="document-list">
    <Toolbar :handle-add="addHandler" />

    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h1>Document List</h1>
        </v-flex>
        <v-flex lg12>
          <DataFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
            <DocumentFilterForm
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
            <template slot="item.site" slot-scope="{ item }">
              {{ item["@id"] }}
            </template>
            <template slot="item.version" slot-scope="{ item }">
              {{ $t(item["version"]) }}
            </template>
            <template slot="item.versionedAt" slot-scope="{ item }">
              {{ formatDateTime(item["versionedAt"], "long") }}
            </template>
            <template slot="item.versions" slot-scope="{ item }">
              <ul>
                <li v-for="_item in item['versions']" :key="_item['@id']">
                  {{ _item["@id"] }}
                </li>
              </ul>
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
import DocumentFilterForm from "@/components/entities/document/Filter";
import DataFilter from "@/components/base/DataFilter";
import Toolbar from "@/components/base/Toolbar";

export default {
  name: "DocumentList",
  servicePrefix: "Document",
  components: {
    Toolbar,
    ActionCell,
    DocumentFilterForm,
    DataFilter,
  },
  mixins: [ListMixin],
  data() {
    return {
      headers: [
        { text: "type", value: "type" },
        { text: "name", value: "name" },
        { text: "title", value: "title" },
        { text: "description", value: "description" },
        { text: "language", value: "language" },
        { text: "filename", value: "filename" },
        { text: "site", value: "site" },
        { text: "version", value: "version" },
        { text: "versionedAt", value: "versionedAt" },
        { text: "versions", value: "versions" },
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
    ...mapGetters("theDocuments", {
      items: "list",
    }),
    ...mapFields("theDocuments", {
      deletedItem: "deleted",
      error: "error",
      isLoading: "isLoading",
      resetList: "resetList",
      totalItems: "totalItems",
      view: "view",
    }),
  },
  methods: {
    ...mapActions("theDocuments", {
      getPage: "fetchAll",
      deleteItem: "del",
    }),
  },
};
</script>
