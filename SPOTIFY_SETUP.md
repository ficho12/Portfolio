# Spotify Now Playing Widget Setup

This guide will help you set up the Spotify "Now Playing" widget for your portfolio.

## Step 1: Create a Spotify App

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create an App"
4. Fill in the form:
   - **App Name**: "Portfolio Now Playing" (or any name you prefer)
   - **App Description**: "Shows currently playing song on my portfolio"
   - **Redirect URI**: `http://localhost:8888/callback` (for initial setup)
5. Accept the terms and click "Create"
6. Note down your **Client ID** and **Client Secret**

## Step 2: Get Your Refresh Token

You'll need to get a refresh token to access your Spotify data. Here's a simple way:

1. Replace `YOUR_CLIENT_ID` in this URL with your actual Client ID:
```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:8888/callback&scope=user-read-currently-playing,user-read-playback-state
```

2. Visit that URL in your browser
3. Authorize the app - you'll be redirected to a URL like:
   `http://localhost:8888/callback?code=AUTHORIZATION_CODE`
4. Copy the `AUTHORIZATION_CODE` from the URL

5. Use this code to get your refresh token. You can use a tool like Postman or curl:

```bash
curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Authorization: Basic $(echo -n 'YOUR_CLIENT_ID:YOUR_CLIENT_SECRET' | base64)" \
     -d "grant_type=authorization_code&code=AUTHORIZATION_CODE&redirect_uri=http://localhost:8888/callback"
```

6. The response will include a `refresh_token` - save this!

## Step 3: Configure Your Portfolio

1. Open `src/js/spotify.js`
2. Replace the placeholder values:
   ```javascript
   this.clientId = 'YOUR_ACTUAL_CLIENT_ID';
   this.clientSecret = 'YOUR_ACTUAL_CLIENT_SECRET';
   this.refreshToken = 'YOUR_ACTUAL_REFRESH_TOKEN';
   ```
3. Change `hasCredentials` to `true`:
   ```javascript
   const hasCredentials = true;
   ```

## Step 4: Alternative - Serverless Setup (Recommended)

For better security, consider using a serverless function to handle the Spotify API calls:

### Option A: Vercel Functions
1. Create a `/api/spotify.js` file in your project
2. Deploy to Vercel
3. Use environment variables for your secrets

### Option B: Netlify Functions
1. Create a `/.netlify/functions/spotify.js` file
2. Deploy to Netlify
3. Use environment variables for your secrets

## Step 5: Test

1. Build your portfolio: `npm run build`
2. Make sure you're playing a song on Spotify
3. The widget should appear in the bottom-right corner

## Features

- Shows currently playing song with album art
- Updates every 30 seconds
- Click to open in Spotify
- Smooth animations
- Dark/light mode support
- Mobile responsive
- Hides when nothing is playing

## Troubleshooting

- **Widget not showing**: Check browser console for errors
- **401 errors**: Your refresh token may have expired, get a new one
- **CORS errors**: You may need to use a serverless function instead of direct API calls

## Security Note

The current implementation exposes your Client Secret in the frontend code. For production use, consider:
1. Using a serverless function to proxy Spotify API calls
2. Storing secrets as environment variables
3. Implementing proper token rotation

Let me know if you need help with any of these steps!
