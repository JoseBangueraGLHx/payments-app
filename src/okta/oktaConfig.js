export const oktaConfig = {
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  issuer: "https://tu-dominio-okta.okta.com/oauth2/default",
  redirectUri: window.location.origin + "/auth/callback", // Debe ser /auth/callback
  scopes: ["openid", "profile", "email", "groups"],
  pkce: true,
};
