'use strict';
// One-command setup for fresh clones / Orca worktrees.
// Idempotent: safe to re-run. Usage: `npm run setup`
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const envPath = path.join(root, '.env');
const envExamplePath = path.join(root, '.env.example');

function checkNode() {
    const major = parseInt(process.versions.node.split('.')[0], 10);
    if (major < 18) {
        console.error(`Node >=18 required, found ${process.version}. Install Node 18+ (see .nvmrc) and retry.`);
        process.exit(1);
    }
    console.log(`Node ${process.version} OK`);
}

function ensureEnv() {
    if (fs.existsSync(envPath)) {
        console.log('.env already exists, leaving it alone.');
        return;
    }
    if (!fs.existsSync(envExamplePath)) {
        console.warn('.env.example not found, skipping .env creation.');
        return;
    }
    fs.copyFileSync(envExamplePath, envPath);
    console.log('Created .env from .env.example — fill in real values (Spotify/Last.fm) as needed.');
    console.log('The site builds and runs without real keys; music widgets just stay empty.');
}

function ensureInstall() {
    if (fs.existsSync(path.join(root, 'node_modules'))) {
        console.log('node_modules already present, skipping npm install (run it manually to update).');
        return;
    }
    console.log('Installing dependencies (npm install)...');
    execSync('npm install', { cwd: root, stdio: 'inherit' });
}

checkNode();
ensureEnv();
ensureInstall();
console.log('\nSetup complete. Next steps:');
console.log('  npm run build   # one-off production build into dist/');
console.log('  npm start       # build + live-reload server (PORT=3000 by default)');
console.log('  PORT=3001 npm start   # run a second worktree side by side');
