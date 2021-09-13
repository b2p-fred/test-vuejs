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

    <div v-if="item" class="table-contact-show">
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
                <strong>{{ $t("firstName") }}</strong>
              </td>
              <td>
                {{ item["firstName"] }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>{{ $t("lastName") }}</strong>
              </td>
              <td>
                {{ item["lastName"] }}
              </td>

              <td>
                <strong>{{ $t("email") }}</strong>
              </td>
              <td>
                {{ item["email"] }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>{{ $t("identifier") }}</strong>
              </td>
              <td>
                {{ item["identifier"] }}
              </td>

              <td>
                <strong>{{ $t("password") }}</strong>
              </td>
              <td>
                {{ item["password"] }}
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
                <strong>{{ $t("phone") }}</strong>
              </td>
              <td>
                {{ item["phone"] }}
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

const servicePrefix = "Contact";

export default {
  name: "ContactShow",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
  },
  mixins: [ShowMixin],
  computed: {
    ...mapFields("contact", {
      isLoading: "isLoading",
    }),
    ...mapGetters("contact", ["find"]),
  },
  methods: {
    ...mapActions("contact", {
      deleteItem: "del",
      reset: "resetShow",
      retrieve: "load",
    }),
  },
};
</script>
