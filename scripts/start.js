const concurrently = require('concurrently');
const upath = require('upath');
const browserSync = require('browser-sync').create();

const distPath = upath.resolve(upath.dirname(__filename), '../dist');

// PORT/HOST are env-driven so multiple Orca worktrees can run side by side:
//   PORT=3001 npm start   (defaults: PORT=3000, HOST=localhost)
// The old hardcoded LAN IP (192.168.0.15) broke on any other machine/network.
const port = parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || undefined;

// Configure BrowserSync
browserSync.init({
    server: {
        baseDir: distPath
    },
    port,
    ...(host ? { host } : {}),
    ui: {
        port: port + 1
    },
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