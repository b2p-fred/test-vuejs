const state = {
  apiUrl: process.env.API_URL,

  // API service
  version: "/version",

  // OIDC configuration
  oidcConfiguration: "/release/oidc/.well-known/oauth-authorization-server",

  // User service
  login: "/login_check",
  logout: null,
  profile: "/me",

  // User list
  users: "/users",

  // Allowed users roles
  allowedRoles: ["ROLE_USER"],
};

export default state;
