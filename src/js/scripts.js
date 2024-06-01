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
