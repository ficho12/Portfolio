const concurrently = require('concurrently');
const upath = require('upath');
const browserSync = require('browser-sync').create();

const distPath = upath.resolve(upath.dirname(__filename), '../dist');

// Configure BrowserSync with Unity WebGL middleware
browserSync.init({
    server: {
        baseDir: distPath,
        middleware: [
            {
                route: '',
                handle: function (req, res, next) {
                    // Handle Unity WebGL compressed files
                    if (req.url.endsWith('.br')) {
                        res.setHeader('Content-Encoding', 'br');
                        
                        if (req.url.includes('.data.br')) {
                            res.setHeader('Content-Type', 'application/octet-stream');
                        } else if (req.url.includes('.framework.js.br')) {
                            res.setHeader('Content-Type', 'application/javascript');
                        } else if (req.url.includes('.wasm.br')) {
                            res.setHeader('Content-Type', 'application/wasm');
                        }
                        
                        // Add CORS headers for Unity WebGL
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                        res.setHeader('Cache-Control', 'public, max-age=31536000');
                    } else if (req.url.endsWith('.wasm')) {
                        res.setHeader('Content-Type', 'application/wasm');
                        res.setHeader('Access-Control-Allow-Origin', '*');
                    } else if (req.url.endsWith('.data')) {
                        res.setHeader('Content-Type', 'application/octet-stream');
                        res.setHeader('Access-Control-Allow-Origin', '*');
                    } else if (req.url.endsWith('.js')) {
                        res.setHeader('Content-Type', 'application/javascript');
                        res.setHeader('Access-Control-Allow-Origin', '*');
                    }
                    
                    // Handle OPTIONS requests for CORS
                    if (req.method === 'OPTIONS') {
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                        res.statusCode = 200;
                        res.end();
                        return;
                    }
                    
                    next();
                }
            }
        ]
    },
    port: 3000,
    host: '192.168.0.15',
    files: ['dist/**/*'],
    reloadDelay: 2000,
    reloadDebounce: 2000,
    open: false
});

concurrently([
    { command: 'node scripts/sb-watch.js', name: 'SB_WATCH', prefixColor: 'bgBlue.bold' }
], {
    prefix: 'name',
    killOthers: ['failure', 'success'],
}).then(success, failure);

function success() {
    console.log('Success');    
}

function failure() {
    console.log('Failure');
}