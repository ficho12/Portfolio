// Serverless function for Spotify API (Vercel/Netlify compatible)
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        // Get environment variables
        const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
        const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
        const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
        
        if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
            return res.status(500).json({ error: 'Missing Spotify credentials' });
        }
        
        // Get access token
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
            },
            body: 'grant_type=refresh_token&refresh_token=' + REFRESH_TOKEN
        });
        
        const tokenData = await tokenResponse.json();
        
        if (!tokenData.access_token) {
            return res.status(401).json({ error: 'Failed to get access token' });
        }
        
        // Get currently playing track
        const spotifyResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': 'Bearer ' + tokenData.access_token
            }
        });
        
        if (spotifyResponse.status === 204 || spotifyResponse.status === 202) {
            return res.status(200).json({ isPlaying: false });
        }
        
        if (spotifyResponse.status !== 200) {
            return res.status(spotifyResponse.status).json({ error: 'Spotify API error' });
        }
        
        const data = await spotifyResponse.json();
        
        // Return formatted data
        const result = {
            isPlaying: data.is_playing,
            track: data.item ? {
                name: data.item.name,
                artist: data.item.artists.map(artist => artist.name).join(', '),
                album: data.item.album.name,
                albumArt: data.item.album.images[0]?.url,
                spotifyUrl: data.item.external_urls.spotify,
                previewUrl: data.item.preview_url,
                duration: data.item.duration_ms,
                progress: data.progress_ms
            } : null
        };
        
        return res.status(200).json(result);
        
    } catch (error) {
        console.error('Spotify API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
