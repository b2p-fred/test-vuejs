<template>
  <div>
    <Toolbar :handle-edit="editHandler" :handle-delete="del">
      <template slot="left">
        <v-toolbar-title v-if="item">{{
          `${$options.servicePrefix} ${item["@id"]}`
        }}</v-toolbar-title>
      </template>
    </Toolbar>

    <br />

    <div v-if="item" class="table-address-show">
      <v-simple-table>
        <template slot="default">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>

              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>{{ $t("type") }}</strong>
              </td>
              <td>
                {{ item["type"] }}
              </td>

              <td>
                <strong>{{ $t("address") }}</strong>
              </td>
              <td>
                {{ item["address"] }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>{{ $t("address2") }}</strong>
              </td>
              <td>
                {{ item["address2"] }}
              </td>

              <td>
                <strong>{{ $t("zipcode") }}</strong>
              </td>
              <td>
                {{ item["zipcode"] }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>{{ $t("city") }}</strong>
              </td>
              <td>
                {{ item["city"] }}
              </td>

              <td>
                <strong>{{ $t("country") }}</strong>
              </td>
              <td>
                {{ item["country"] }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>{{ $t("lat") }}</strong>
              </td>
              <td>
                {{ $t(item["lat"]) }}
              </td>

              <td>
                <strong>{{ $t("lng") }}</strong>
              </td>
              <td>
                {{ $t(item["lng"]) }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>{{ $t("site") }}</strong>
              </td>
              <td>
                {{ item["site"] && item["site"].name }}
              </td>

              <td>
                <strong>{{ $t("createdAt") }}</strong>
              </td>
              <td>
                {{ formatDateTime(item["createdAt"], "long") }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>{{ $t("updatedAt") }}</strong>
              </td>
              <td>
                {{ formatDateTime(item["updatedAt"], "long") }}
              </td>

              <td></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>

    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import Loading from "@/components/base/Loading";
import ShowMixin from "@/mixins/ShowMixin";
import Toolbar from "@/components/base/Toolbar";

const servicePrefix = "Address";

export default {
  name: "AddressShow",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
  },
  mixins: [ShowMixin],
  computed: {
    ...mapFields("address", {
      isLoading: "isLoading",
    }),
    ...mapGetters("address", ["find"]),
  },
  methods: {
    ...mapActions("address", {
      deleteItem: "del",
      reset: "resetShow",
      retrieve: "load",
    }),
  },
};
</script>
