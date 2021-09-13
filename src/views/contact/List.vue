<template>
  <div class="contact-list">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h1>Contact List</h1>
        </v-flex>
        <v-flex lg12>
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
            <template slot="item.createdAt" slot-scope="{ item }">
              {{ formatDateTime(item["createdAt"], "long") }}
            </template>
            <template slot="item.updatedAt" slot-scope="{ item }">
              {{ formatDateTime(item["updatedAt"], "long") }}
            </template>
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

export default {
  name: "ContactList",
  servicePrefix: "Contact",
  mixins: [ListMixin],
  data() {
    return {
      headers: [
        { text: "type", value: "type" },
        { text: "firstName", value: "firstName" },
        { text: "lastName", value: "lastName" },
        { text: "email", value: "email" },
        { text: "identifier", value: "identifier" },
        { text: "password", value: "password" },
        { text: "language", value: "language" },
        { text: "phone", value: "phone" },
        { text: "site", value: "site" },
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
    ...mapGetters("theContacts", {
      items: "list",
    }),
    ...mapFields("theContacts", {
      deletedItem: "deleted",
      error: "error",
      isLoading: "isLoading",
      resetList: "resetList",
      totalItems: "totalItems",
      view: "view",
    }),
  },
  methods: {
    ...mapActions("theContacts", {
      getPage: "fetchAll",
      deleteItem: "del",
    }),
  },
};
</script>
