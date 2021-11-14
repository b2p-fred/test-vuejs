import { ENTRYPOINT } from "@/config/api";

const state = {
  apiUrl: ENTRYPOINT,
  mimeType: process.env.VUE_APP_ACCEPT_HEADER || "application/ld+json",

  // API service
  version: "/version",

  // User service - this is used only if SSO is not enabled!
  login: "/login_check",
  logout: null,
  profile: "/me",

  // User list
  users: "/users",

  // todo: TBC
  // sites, documents, ...
};

export default state;
