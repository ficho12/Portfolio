const concurrently = require('concurrently');
const upath = require('upath');
const browserSync = require('browser-sync').create();

const distPath = upath.resolve(upath.dirname(__filename), '../dist');

// Configure BrowserSync
browserSync.init({
    server: {
        baseDir: distPath
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