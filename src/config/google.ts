// Google OAuth Configuration
// To set up Google OAuth:
// 1. Go to https://console.developers.google.com/
// 2. Create a new project or select existing one
// 3. Enable Google+ API
// 4. Go to Credentials and create OAuth 2.0 Client ID
// 5. Set authorized origins to: https://kumaramrit30.github.io
// 6. Set authorized redirect URIs to: https://kumaramrit30.github.io/autoAssist/
// 7. Copy your Client ID and replace the placeholder below

export const GOOGLE_CONFIG = {
  clientId:
    import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-google-client-id-here",
  // For development, you can use a test client ID
  // For production, make sure to set the environment variable
};
