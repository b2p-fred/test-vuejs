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

    <div v-if="item" class="table-document-show">
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
                <strong>{{ $t("name") }}</strong>
              </td>
              <td>
                {{ item["name"] }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>{{ $t("title") }}</strong>
              </td>
              <td>
                {{ item["title"] }}
              </td>

              <td>
                <strong>{{ $t("description") }}</strong>
              </td>
              <td>
                {{ item["description"] }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>{{ $t("language") }}</strong>
              </td>
              <td>
                {{ item["language"] }}
              </td>

              <td>
                <strong>{{ $t("filename") }}</strong>
              </td>
              <td>
                {{ item["filename"] }}
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
                <strong>{{ $t("version") }}</strong>
              </td>
              <td>
                {{ $t(item["version"]) }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>{{ $t("versionedAt") }}</strong>
              </td>
              <td>
                {{ formatDateTime(item["versionedAt"], "long") }}
              </td>

              <td>
                <strong>{{ $t("versions") }}</strong>
              </td>
              <td>
                <ul>
                  <li v-for="_item in item['versions']" :key="_item['@id']">
                    {{ _item["@id"] }}
                  </li>
                </ul>
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

const servicePrefix = "Document";

export default {
  name: "DocumentShow",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
  },
  mixins: [ShowMixin],
  computed: {
    ...mapFields("document", {
      isLoading: "isLoading",
    }),
    ...mapGetters("document", ["find"]),
  },
  methods: {
    ...mapActions("document", {
      deleteItem: "del",
      reset: "resetShow",
      retrieve: "load",
    }),
  },
};
</script>
