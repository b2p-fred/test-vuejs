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

    <div v-if="item" class="table-documentversion-show">
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
                <strong>{{ $t("document") }}</strong>
              </td>
              <td>
                {{ item["document"] && item["document"].name }}
              </td>

              <td>
                <strong>{{ $t("version") }}</strong>
              </td>
              <td>
                {{ $t(item["version"]) }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>{{ $t("description") }}</strong>
              </td>
              <td>
                {{ item["description"] }}
              </td>

              <td>
                <strong>{{ $t("initiator") }}</strong>
              </td>
              <td>
                {{ item["initiator"] && item["initiator"].name }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>{{ $t("createdAt") }}</strong>
              </td>
              <td>
                {{ formatDateTime(item["createdAt"], "long") }}
              </td>

              <td>
                <strong>{{ $t("updatedAt") }}</strong>
              </td>
              <td>
                {{ formatDateTime(item["updatedAt"], "long") }}
              </td>
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

const servicePrefix = "DocumentVersion";

export default {
  name: "DocumentVersionShow",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
  },
  mixins: [ShowMixin],
  computed: {
    ...mapFields("documentversion", {
      isLoading: "isLoading",
    }),
    ...mapGetters("documentversion", ["find"]),
  },
  methods: {
    ...mapActions("documentversion", {
      deleteItem: "del",
      reset: "resetShow",
      retrieve: "load",
    }),
  },
};
</script>
