// Check if running in a Node.js environment
if (typeof window === 'undefined') {
    const createServer = require('./server');
    const compressionMiddleware = require('compression')({ brotli: true });
    const serve = require('serve-static')('Build', { index: ['index.html'] });

    createServer(compressionMiddleware, serve, 3000);
}
