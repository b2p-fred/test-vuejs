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

    <div v-if="item" class="table-relation-show">
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
                <strong>{{ $t("sender") }}</strong>
              </td>
              <td>
                {{ item["sender"] && item["sender"].name }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>{{ $t("recipient") }}</strong>
              </td>
              <td>
                {{ item["recipient"] && item["recipient"].name }}
              </td>

              <td>
                <strong>{{ $t("protocol") }}</strong>
              </td>
              <td>
                {{ item["protocol"] && item["protocol"].name }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>{{ $t("comments") }}</strong>
              </td>
              <td>
                {{ item["comments"] }}
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

const servicePrefix = "Relation";

export default {
  name: "RelationShow",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
  },
  mixins: [ShowMixin],
  computed: {
    ...mapFields("relation", {
      isLoading: "isLoading",
    }),
    ...mapGetters("relation", ["find"]),
  },
  methods: {
    ...mapActions("relation", {
      deleteItem: "del",
      reset: "resetShow",
      retrieve: "load",
    }),
  },
};
</script>
