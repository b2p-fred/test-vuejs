/*
 * Configuration for the B2P SSO OIDC
 */
export const oidcSettings = {
  authority: `${process.env.VUE_APP_AUTH_URL}/oidc`,
  clientId: "epr_frontend",
  redirectUri: `${process.env.VUE_APP_BASE_URL}/oidc-callback`,
  responseType: "code",
  scope: "openid",
};
