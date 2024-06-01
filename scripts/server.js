const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/proxy', createProxyMiddleware({
    target: 'https://html-classic.itch.zone',
    changeOrigin: true,
    selfHandleResponse: true,
    onProxyRes: (proxyRes, req, res) => {
        let body = Buffer.from('');

        proxyRes.on('data', (chunk) => {
            body = Buffer.concat([body, chunk]);
        });

        proxyRes.on('end', () => {
            let bodyString = body.toString();
            if (req.url.includes('/html/10196529/index.html')) {
                // Modify the response body to include the script
                const script = `
                    <script>
                    (function() {
                        function requestFullscreen(canvas) {
                            if (canvas.requestFullscreen) {
                                canvas.requestFullscreen();
                            } else if (canvas.mozRequestFullScreen) {
                                canvas.mozRequestFullScreen();
                            } else if (canvas.webkitRequestFullscreen) {
                                canvas.webkitRequestFullscreen();
                            } else if (canvas.msRequestFullscreen) {
                                canvas.msRequestFullscreen();
                            }
                        }

                        function onFullscreenChange() {
                            if (!document.fullscreenElement &&
                                !document.mozFullScreenElement &&
                                !document.webkitFullscreenElement &&
                                !document.msFullscreenElement) {
                                window.parent.postMessage({ command: 'fullscreenExited' }, '*');
                            }
                        }

                        window.addEventListener('message', function(event) {
                            if (event.data.command === 'requestFullscreen') {
                                var canvas = document.querySelector('canvas');
                                try {
                                    requestFullscreen(canvas);
                                    event.source.postMessage({ command: 'fullscreenSuccess' }, event.origin);
                                } catch (error) {
                                    event.source.postMessage({ command: 'fullscreenError', error: error.message }, event.origin);
                                }
                            }
                        });

                        document.addEventListener('fullscreenchange', onFullscreenChange);
                        document.addEventListener('webkitfullscreenchange', onFullscreenChange);
                        document.addEventListener('mozfullscreenchange', onFullscreenChange);
                        document.addEventListener('MSFullscreenChange', onFullscreenChange);
                    })();
                    </script>
                `;
                bodyString = bodyString.replace('</body>', `${script}</body>`);
            }
            res.end(bodyString);
        });
    },
}));

app.listen(3002, () => {
    console.log('Proxy server running on port 3002');
});
