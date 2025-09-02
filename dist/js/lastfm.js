// Last.fm Now Playing Widget (GitHub Pages Compatible)
class LastFmWidget {
    constructor() {
        this.isVisible = false;
        this.currentTrack = null;
        this.updateInterval = null;
        this.widget = null;
        
        // 🎵 Public credentials - safe for GitHub Pages
        this.username = 'ficho12'; // Replace with your Last.fm username
        this.apiKey = '093846ffbd02f4e67664bcaeeaee73d6'; // Get from https://www.last.fm/api/account/create
        this.apiUrl = 'https://ws.audioscrobbler.com/2.0/';
        
        this.init();
    }
    
    async init() {
        this.createWidget();
        await this.updateNowPlaying();
        this.startPeriodicUpdate();
    }
    
    createWidget() {
        // Create the music widget HTML (reuses Spotify styling)
        const widget = document.createElement('div');
        widget.id = 'lastfm-widget';
        widget.className = 'spotify-widget'; // Reuse existing styles
        widget.innerHTML = `
            <div class="spotify-content">
                <div class="spotify-icon">
                    <i class="bi bi-music-note-beamed"></i>
                </div>
                <div class="spotify-info">
                    <div class="spotify-status">Recently played</div>
                    <div class="spotify-track">Loading...</div>
                    <div class="spotify-artist"></div>
                </div>
                <div class="spotify-album-art">
                    <img src="" alt="Album Art" style="display: none;">
                </div>
            </div>
        `;
        
        document.body.appendChild(widget);
        this.widget = widget;
    }
    
    async getCurrentTrack() {
        try {
            // Check if credentials are configured
            if (this.username === 'YOUR_LASTFM_USERNAME' || this.apiKey === 'YOUR_LASTFM_API_KEY') {
                console.log('🎵 Last.fm credentials not configured yet');
                return null;
            }
            
            const url = `${this.apiUrl}?method=user.getrecenttracks&user=${this.username}&api_key=${this.apiKey}&format=json&limit=1&extended=1`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                console.error('Last.fm API error:', data.message);
                return null;
            }
            
            if (data.recenttracks && data.recenttracks.track && data.recenttracks.track.length > 0) {
                return data.recenttracks.track[0];
            }
            
            return null;
        } catch (error) {
            console.error('Error fetching Last.fm data:', error);
            return null;
        }
    }
    
    async updateNowPlaying() {
        const track = await this.getCurrentTrack();
        
        if (track) {
            this.showTrack(track);
        } else {
            this.hideWidget();
        }
    }
    
    showTrack(track) {
        const trackName = track.name;
        const artistName = track.artist.name || track.artist['#text'] || 'Unknown Artist';
        const albumName = track.album ? (track.album.name || track.album['#text']) : '';
        const albumArt = this.getAlbumArt(track);
        const isNowPlaying = track['@attr'] && track['@attr'].nowplaying;
        const trackUrl = track.url;
        
        // Update widget content
        const statusElement = this.widget.querySelector('.spotify-status');
        const trackElement = this.widget.querySelector('.spotify-track');
        const artistElement = this.widget.querySelector('.spotify-artist');
        const albumArtElement = this.widget.querySelector('.spotify-album-art img');
        
        statusElement.textContent = isNowPlaying ? 'Currently listening to' : 'Recently played';
        trackElement.textContent = trackName;
        artistElement.textContent = artistName;
        
        if (albumArt) {
            albumArtElement.src = albumArt;
            albumArtElement.style.display = 'block';
            albumArtElement.alt = `${albumName} by ${artistName}`;
        } else {
            albumArtElement.style.display = 'none';
        }
        
        // Make widget clickable to open on Last.fm
        if (trackUrl) {
            this.widget.onclick = () => window.open(trackUrl, '_blank');
            this.widget.style.cursor = 'pointer';
            this.widget.title = `View ${trackName} by ${artistName} on Last.fm`;
        }
        
        // Show widget with animation
        this.widget.classList.add('visible');
        this.currentTrack = track;
    }
    
    getAlbumArt(track) {
        if (track.image && Array.isArray(track.image)) {
            // Try to get the largest available image
            const largeImage = track.image.find(img => img.size === 'large');
            const mediumImage = track.image.find(img => img.size === 'medium');
            const smallImage = track.image.find(img => img.size === 'small');
            
            const selectedImage = largeImage || mediumImage || smallImage;
            return selectedImage && selectedImage['#text'] ? selectedImage['#text'] : null;
        }
        return null;
    }
    
    hideWidget() {
        if (!this.widget) return;
        
        this.widget.classList.remove('visible');
        this.widget.querySelector('.spotify-track').textContent = 'No recent tracks';
        this.widget.querySelector('.spotify-artist').textContent = '';
        this.widget.querySelector('.spotify-album-art img').style.display = 'none';
        this.widget.style.cursor = 'default';
        this.widget.onclick = null;
        this.widget.title = '';
    }
    
    startPeriodicUpdate() {
        // Update every 60 seconds (Last.fm updates less frequently than Spotify)
        this.updateInterval = setInterval(() => {
            this.updateNowPlaying();
        }, 60000);
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
    // 🎵 Last.fm widget is compatible with GitHub Pages!
    // To enable: Replace credentials above and set this to true
    const enableLastFm = true; // Set to true after adding your Last.fm credentials

    if (enableLastFm) {
        window.musicWidget = new LastFmWidget();
    } else {
        console.log('🎵 Last.fm widget is disabled.');
        console.log('📖 To enable:');
        console.log('1. Create account at https://last.fm');
        console.log('2. Get API key from https://www.last.fm/api/account/create');
        console.log('3. Replace credentials in lastfm.js');
        console.log('4. Set enableLastFm = true');
    }
});
