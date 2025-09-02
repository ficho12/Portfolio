# 🎵 Last.fm Widget Setup Guide

Perfect for GitHub Pages! No sensitive credentials, no server required.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Last.fm Account
1. Go to [Last.fm](https://www.last.fm)
2. Sign up for a free account
3. Remember your username (you'll need it later)

### Step 2: Connect Spotify to Last.fm (Optional but Recommended)
1. In Last.fm settings, go to "Applications"
2. Connect your Spotify account
3. This will "scrobble" (track) your Spotify listening to Last.fm

### Step 3: Get API Key
1. Go to [Last.fm API Account](https://www.last.fm/api/account/create)
2. Fill out the form:
   - **Application name**: "Portfolio Music Widget"
   - **Application description**: "Shows currently/recently played music on my portfolio"
   - **Contact email**: Your email
3. Click "Submit"
4. Copy your **API Key** (keep **API Secret** private, but we don't need it)

### Step 4: Configure Widget
1. Open `src/js/lastfm.js`
2. Replace these values:
   ```javascript
   this.username = 'your_actual_lastfm_username';
   this.apiKey = 'your_actual_api_key_here';
   ```
3. Set `enableLastFm = true`

### Step 5: Build and Deploy
```bash
npm run build
```

## 🎯 Features

- ✅ **Shows currently playing** (if you're actively scrobbling)
- ✅ **Shows recently played** (last track if nothing current)
- ✅ **Album artwork** (when available)
- ✅ **Click to open** track on Last.fm
- ✅ **Updates every 60 seconds**
- ✅ **GitHub Pages compatible**
- ✅ **No sensitive credentials**

## 🔧 Customization

### Change Update Frequency
```javascript
// In startPeriodicUpdate()
this.updateInterval = setInterval(() => {
    this.updateNowPlaying();
}, 30000); // 30 seconds instead of 60
```

### Change Widget Position
The widget uses the same CSS as the Spotify widget, so it appears in the bottom-right corner. To change position, modify the CSS in `_global.scss`:

```scss
.spotify-widget {
  position: fixed;
  bottom: 20px;    // Change this
  right: 20px;     // Change this
  // ... rest of styles
}
```

### Change Icon
```javascript
// In createWidget(), change this line:
<i class="bi bi-music-note-beamed"></i>
// To any Bootstrap icon, like:
<i class="bi bi-headphones"></i>
<i class="bi bi-vinyl"></i>
<i class="bi bi-disc"></i>
```

## 🎵 How It Works

1. **Scrobbling**: When you play music on Spotify (or other services), Last.fm tracks it
2. **API Call**: Widget fetches your recent tracks from Last.fm's public API
3. **Display**: Shows the most recent track with artwork and details
4. **Updates**: Refreshes every minute to show new tracks

## 🐛 Troubleshooting

### Widget Not Showing
- Check browser console for errors
- Verify username and API key are correct
- Make sure `enableLastFm = true`

### No Tracks Showing
- Check if you have any scrobbled tracks on your Last.fm profile
- Try playing a song on Spotify (if connected)
- Last.fm can take a few minutes to update

### API Errors
- Verify your API key is valid
- Check your Last.fm username spelling
- Last.fm API has rate limits (not usually an issue for personal use)

### CORS Issues
- Last.fm API supports CORS, so this shouldn't happen
- If it does, it might be a temporary API issue

## 🔒 Security Notes

- ✅ **API Key is public** - Last.fm API keys are designed to be public
- ✅ **Username is public** - Last.fm profiles are public by default
- ✅ **No sensitive data** - Only shows your public listening history
- ✅ **GitHub Pages safe** - No server-side code required

## 🎨 Styling

The widget reuses the Spotify widget styles, so it automatically adapts to:
- ✅ Light/dark mode
- ✅ Mobile responsive design
- ✅ Hover effects and animations
- ✅ Your portfolio's color scheme

## 📱 Example Configuration

```javascript
// Example working configuration
this.username = 'johndoe123';        // Your Last.fm username
this.apiKey = 'abc123def456ghi789';  // Your API key from Last.fm
```

That's it! Your portfolio will now show what you're currently listening to or recently played. 🎵
