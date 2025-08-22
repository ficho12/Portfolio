/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2025 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// Check if running in a Node.js environment
if (typeof window === 'undefined') {
    const createServer = require('./server');
    const compressionMiddleware = require('compression')({ brotli: true });
    const serve = require('serve-static')('Build', { index: ['index.html'] });

    createServer(compressionMiddleware, serve, 3000);
}
