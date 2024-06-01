/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2024 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// Require necessary modules using CommonJS syntax
const http = require('http');
const compression = require('compression');
const serveStatic = require('serve-static');

const PORT = process.env.PORT || 8080;

// Enable Brotli compression
const compressionMiddleware = compression({
  brotli: true
});

const serve = serveStatic('Build', {
  index: ['index.html']
});

const server = http.createServer((req, res) => {
  compressionMiddleware(req, res, () => {
    serve(req, res, () => {});
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
