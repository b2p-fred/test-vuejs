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

    <div v-if="item" class="table-user-show">
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
                <strong>{{ $t("email") }}</strong>
              </td>
              <td>
                {{ item["email"] }}
              </td>

              <td>
                <strong>{{ $t("roles") }}</strong>
              </td>
              <td>
                {{ item["roles"] }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>{{ $t("firstName") }}</strong>
              </td>
              <td>
                {{ item["firstName"] }}
              </td>

              <td>
                <strong>{{ $t("lastName") }}</strong>
              </td>
              <td>
                {{ item["lastName"] }}
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
                <strong>{{ $t("gender") }}</strong>
              </td>
              <td>
                {{ item["gender"] }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>{{ $t("birthdate") }}</strong>
              </td>
              <td>
                {{ formatDateTime(item["birthdate"], "long") }}
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
// import Toolbar from "@/components/base/Toolbar";

const servicePrefix = "User";

export default {
  name: "UserShow",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
  },
  mixins: [ShowMixin],
  computed: {
    ...mapFields("user", {
      isLoading: "isLoading",
    }),
    ...mapGetters("user", ["find"]),
  },
  methods: {
    ...mapActions("user", {
      deleteItem: "del",
      reset: "resetShow",
      retrieve: "load",
    }),
  },
};
</script>
