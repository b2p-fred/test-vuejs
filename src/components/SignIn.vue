<template>
  <v-row justify="center">
    <v-dialog v-model="visible" persistent max-width="600px">
      <v-form v-model="valid" action="/home" @submit.prevent="tryLogin">
        <v-card>
          <v-card-title>
            <span class="text-h5">Sign in {{ userLoggedIn }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="loginData.email"
                    prepend-icon="mdi-email"
                    label="Email*"
                    required
                    :rules="[required('e-mail')]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="loginData.password"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword1 ? 'text' : 'password'"
                    label="Password*"
                    persistent-hint
                    required
                    clearable
                    :rules="[required('Password')]"
                    @click:append="showPassword1 = !showPassword1"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="leave">Close </v-btn>
            <v-btn type="submit" color="green darken-1" text :disabled="!valid">
              Sign in
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    visible: true,
    valid: false,
    showPassword1: false,
    // Form fields
    loginData: {
      email: "",
      password: "",
    },
    // Form rules
    required(property) {
      return (v) => !!v || `${property} is mandatory.`;
    },
  }),
  computed: {
    userLoggedIn() {
      return this.isLoggedIn();
    },
  },
  mounted() {
    // Make the dialog visible only if no user is logged in
    this.visible = !this.userLoggedIn;
  },
  methods: {
    ...mapGetters("User", ["isLoggedIn"]),
    ...mapActions({ login: "User/login" }),
    async tryLogin() {
      this.visible = false;

      // this.$toast.show("Logging in...");

      // todo: Login on B2P SSO
      console.log(`Authenticating with local login strategy...`);
      await this.login(this.loginData).then(() => {
        this.$root.$emit("user-signed-in");
      });
    },
    leave() {
      this.visible = true;
    },
  },
};
</script>
