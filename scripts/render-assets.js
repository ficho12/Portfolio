'use strict';
const fs = require('fs');
const upath = require('upath');
const sh = require('shelljs');

module.exports = function renderAssets() {
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/assets');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/.');
    
    sh.cp('-R', sourcePath, destPath);
    
    // Copy locales for i18n
    const localesSourcePath = upath.resolve(upath.dirname(__filename), '../src/locales');
    const localesDestPath = upath.resolve(upath.dirname(__filename), '../dist/locales');
    
    if (fs.existsSync(localesSourcePath)) {
        sh.cp('-R', localesSourcePath, destPath);
    }
};