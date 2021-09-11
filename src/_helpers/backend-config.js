export const backendConfig = {
  apiUrl: process.env.VUE_APP_API_ROOT,
  loginEndpoint: "/token",
  refreshEndpoint: "/token/refresh",
  profileEndpoint: "/me",
  registerEndpoint: process.env.VUE_APP_API_ALLOW_REGISTER && "/user/register",
  recoverEndpoint:
    process.env.VUE_APP_API_ALLOW_LOST_PASSWORD && "/user/recover",
  equipmentsEndpoint: "/equipments",
  documentsEndpoint: "/documents",
  logsEndpoint: "/logs",
  alertEndpoint: "/alert",
  allowedRoles: ["tenant"],
};
