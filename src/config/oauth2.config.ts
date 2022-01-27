export interface OAuth2Config {
  contactEmail: string;
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
  refresh_token: string;
}

export default (): { oAuth2Config: OAuth2Config } => ({
  oAuth2Config: {
    contactEmail: process.env.CONTACT_EMAIL,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    redirectUri: 'https://developers.google.com/oauthplayground',
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  },
});
