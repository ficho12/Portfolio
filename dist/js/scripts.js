/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2024 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const https = require('https');
// const expressStaticGzip = require('express-static-gzip');

// const app = express();
// const port = process.env.PORT || 3000;

// // SSL Certificate
// const privateKey = fs.readFileSync('assets/server.key', 'utf8');
// const certificate = fs.readFileSync('assets/server.cert', 'utf8');
// const credentials = { key: privateKey, cert: certificate };

// // Serve Brotli and Gzip compressed files
// app.use('/', expressStaticGzip(path.join(__dirname, 'Build'), {
//     enableBrotli: true,
//     orderPreference: ['br', 'gz'],
//     setHeaders: (res, path) => {
//         if (path.endsWith('.br')) {
//             res.setHeader('Content-Encoding', 'br');
//         } else if (path.endsWith('.gz')) {
//             res.setHeader('Content-Encoding', 'gzip');
//         }
//     }
// }));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Build', 'assets/yabs/index.html'));
// });

// // Create HTTPS server
// const httpsServer = https.createServer(credentials, app);

// // Start the server
// httpsServer.listen(port, () => {
//     console.log(`HTTPS Server is running on https://localhost:${port}`);
// });
