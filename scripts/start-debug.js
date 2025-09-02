const concurrently = require('concurrently');
const upath = require('upath');
const express = require('express');
const path = require('path');

// Create Express server for Unity WebGL files
const app = express();
const distPath = upath.resolve(upath.dirname(__filename), '../dist');

// Middleware to serve Unity WebGL compressed files with proper headers
app.use(express.static(distPath, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.br')) {
            // Set proper headers for Brotli compressed files
            res.set('Content-Encoding', 'br');
            
            if (filePath.includes('.data.br')) {
                res.set('Content-Type', 'application/octet-stream');
            } else if (filePath.includes('.framework.js.br')) {
                res.set('Content-Type', 'application/javascript');
            } else if (filePath.includes('.wasm.br')) {
                res.set('Content-Type', 'application/wasm');
            }
            
            // Ensure no caching issues
            res.set('Cache-Control', 'no-cache');
        } else if (filePath.endsWith('.wasm')) {
            res.set('Content-Type', 'application/wasm');
        } else if (filePath.endsWith('.data')) {
            res.set('Content-Type', 'application/octet-stream');
        }
    }
}));

// Start Express server
app.listen(3002, () => {
    console.log('Unity WebGL debug server running on port 3002');
});

const browserSyncPath = upath.resolve(upath.dirname(__filename), '../node_modules/.bin/browser-sync');

concurrently([
    { command: 'node --inspect scripts/sb-watch.js', name: 'SB_WATCH', prefixColor: 'bgBlue.bold' },
    { 
        command: `${browserSyncPath} dist -w --no-online --proxy localhost:3002`,
        name: 'SB_BROWSER_SYNC', 
        prefixColor: 'bgBlue.bold',
    }
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