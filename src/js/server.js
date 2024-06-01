// server.js
const http = import('http'); // Use require instead of import
const compression = import('compression'); // Use require instead of import
const serveStatic = import('serve-static'); // Use require instead of import

const createServer = (compressionMiddleware, serve, PORT) => {
    const server = http.createServer((req, res) => {
        compressionMiddleware(req, res, () => {
            serve(req, res, () => {});
        });
    });

    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

module.exports = createServer;
