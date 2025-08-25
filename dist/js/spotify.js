// Spotify Now Playing Widget
class SpotifyWidget {
    constructor() {
        this.isVisible = false;
        this.currentTrack = null;
        this.updateInterval = null;
        this.widget = null;
        
        // ⚠️ SECURITY WARNING: NEVER put real credentials in a public repository!
        // Use environment variables with serverless deployment instead.
        // See SECURITY_GUIDE.md for safe implementation approaches.
        this.useServerless = true; // ALWAYS use serverless for public repos
        this.apiEndpoint = this.useServerless ? '/api/spotify' : null;
        
        // ❌ DO NOT replace these with real values in a public repo
        // ✅ Use environment variables in your deployment platform instead
        this.clientId = 'YOUR_SPOTIFY_CLIENT_ID';
        this.clientSecret = 'YOUR_SPOTIFY_CLIENT_SECRET';
        this.refreshToken = 'YOUR_REFRESH_TOKEN';
        
        this.init();
    }
    
    async init() {
        this.createWidget();
        await this.updateNowPlaying();
        this.startPeriodicUpdate();
    }
    
    createWidget() {
        // Create the Spotify widget HTML
        const widget = document.createElement('div');
        widget.id = 'spotify-widget';
        widget.className = 'spotify-widget';
        widget.innerHTML = `
            <div class="spotify-content">
                <div class="spotify-icon">
                    <i class="bi bi-spotify"></i>
                </div>
                <div class="spotify-info">
                    <div class="spotify-status">Currently listening to</div>
                    <div class="spotify-track">Loading...</div>
                    <div class="spotify-artist"></div>
                </div>
                <div class="spotify-album-art">
                    <img src="" alt="Album Art" style="display: none;">
                </div>
            </div>
        `;
        
        // Add to page body
        document.body.appendChild(widget);
        this.widget = widget;
    }
    
    async getCurrentlyPlaying() {
        try {
            if (this.useServerless) {
                return await this.getFromServerless();
            } else {
                return await this.getFromDirectAPI();
            }
        } catch (error) {
            console.error('Error fetching currently playing:', error);
            return null;
        }
    }
    
    async getFromServerless() {
        const response = await fetch(this.apiEndpoint);
        if (response.ok) {
            return await response.json();
        }
        return null;
    }
    
    async getFromDirectAPI() {
        // ⚠️ WARNING: This method exposes credentials in frontend code
        // ONLY use this for local development, NEVER in production with a public repo
        console.warn('🚨 Direct API method should not be used in public repositories!');
        
        const accessToken = await this.getAccessToken();
        if (!accessToken) return null;
        
        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        
        if (response.status === 204 || response.status === 202) {
            return { isPlaying: false };
        }
        
        if (response.status === 200) {
            const data = await response.json();
            return {
                isPlaying: data.is_playing,
                track: data.item ? {
                    name: data.item.name,
                    artist: data.item.artists.map(artist => artist.name).join(', '),
                    album: data.item.album.name,
                    albumArt: data.item.album.images[0]?.url,
                    spotifyUrl: data.item.external_urls.spotify
                } : null
            };
        }
        
        return null;
    }
    
    async getAccessToken() {
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
                },
                body: 'grant_type=refresh_token&refresh_token=' + this.refreshToken
            });
            
            const data = await response.json();
            return data.access_token;
        } catch (error) {
            console.error('Error getting access token:', error);
            return null;
        }
    }
    
    async updateNowPlaying() {
        const data = await this.getCurrentlyPlaying();
        
        if (data && data.isPlaying && data.track) {
            this.showTrack(data.track);
            this.isVisible = true;
        } else {
            this.hideWidget();
            this.isVisible = false;
        }
    }
    
    showTrack(track) {
        // Update widget content
        const trackElement = this.widget.querySelector('.spotify-track');
        const artistElement = this.widget.querySelector('.spotify-artist');
        const albumArtElement = this.widget.querySelector('.spotify-album-art img');
        
        trackElement.textContent = track.name;
        artistElement.textContent = track.artist;
        
        if (track.albumArt) {
            albumArtElement.src = track.albumArt;
            albumArtElement.style.display = 'block';
        } else {
            albumArtElement.style.display = 'none';
        }
        
        // Make widget clickable to open in Spotify
        if (track.spotifyUrl) {
            this.widget.onclick = () => window.open(track.spotifyUrl, '_blank');
            this.widget.style.cursor = 'pointer';
            this.widget.title = `Listen to ${track.name} by ${track.artist} on Spotify`;
        }
        
        // Show widget with animation
        this.widget.classList.add('visible');
        this.currentTrack = track;
    }
    
    hideWidget() {
        this.widget.classList.remove('visible');
        this.widget.querySelector('.spotify-track').textContent = 'Nothing playing';
        this.widget.querySelector('.spotify-artist').textContent = '';
        this.widget.querySelector('.spotify-album-art img').style.display = 'none';
        this.widget.style.cursor = 'default';
        this.widget.onclick = null;
        this.widget.title = '';
    }
    
    startPeriodicUpdate() {
        // Update every 30 seconds
        this.updateInterval = setInterval(() => {
            this.updateNowPlaying();
        }, 30000);
    }
    
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        if (this.widget) {
            this.widget.remove();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // � IMPORTANT: Spotify widget is NOT compatible with GitHub Pages
    // GitHub Pages only serves static files and cannot run serverless functions
    // 
    // For GitHub Pages deployment, consider these alternatives:
    // 1. Use Last.fm widget (lastfm.js) - no sensitive credentials needed
    // 2. Deploy to Vercel/Netlify for full Spotify integration
    // 3. Use embedded Spotify widgets (limited customization)
    
    const enableSpotify = false; // KEEP as false for GitHub Pages
    
    if (enableSpotify) {
        console.error('❌ Spotify widget cannot run on GitHub Pages!');
        console.log('💡 Consider using Last.fm widget instead (lastfm.js)');
    } else {
        console.log('🎵 Spotify widget is disabled (not compatible with GitHub Pages).');
        console.log('📖 Use Last.fm widget for GitHub Pages deployment.');
        console.log('� Or deploy to Vercel/Netlify for full Spotify support.');
    }
});
