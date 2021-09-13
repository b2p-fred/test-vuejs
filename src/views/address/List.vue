<template>
  <div class="address-list">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h1>Address List</h1>
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
            <template slot="item.lat" slot-scope="{ item }">
              {{ $t(item["lat"]) }}
            </template>
            <template slot="item.lng" slot-scope="{ item }">
              {{ $t(item["lng"]) }}
            </template>
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
import ListMixin from "@/mixins/ListMixin";

export default {
  name: "AddressList",
  servicePrefix: "Address",
  mixins: [ListMixin],
  data() {
    return {
      headers: [
        { text: "type", value: "type" },
        { text: "address", value: "address" },
        { text: "address2", value: "address2" },
        { text: "zipcode", value: "zipcode" },
        { text: "city", value: "city" },
        { text: "country", value: "country" },
        { text: "lat", value: "lat" },
        { text: "lng", value: "lng" },
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
    ...mapGetters("theAddresses", {
      items: "list",
    }),
    ...mapFields("theAddresses", {
      deletedItem: "deleted",
      error: "error",
      isLoading: "isLoading",
      resetList: "resetList",
      totalItems: "totalItems",
      view: "view",
    }),
  },
  methods: {
    ...mapActions("theAddresses", {
      getPage: "fetchAll",
      deleteItem: "del",
    }),
  },
};
</script>
