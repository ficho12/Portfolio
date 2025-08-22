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
} else {
    // Browser environment - initialize i18n and UI functionality
    import('./i18n.js').then(({ changeLanguage, getCurrentLanguage }) => {
        // Language switcher functionality
        document.addEventListener('DOMContentLoaded', () => {
            // Add language change event listeners
            const languageLinks = document.querySelectorAll('[data-lang]');
            languageLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = e.target.closest('[data-lang]').getAttribute('data-lang');
                    changeLanguage(lang);
                    
                    // Update active language in dropdown
                    updateActiveLanguage(lang);
                });
            });

            // Set initial active language
            updateActiveLanguage(getCurrentLanguage());
        });

        function updateActiveLanguage(lang) {
            const languageLinks = document.querySelectorAll('[data-lang]');
            languageLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-lang') === lang) {
                    link.classList.add('active');
                }
            });
        }
    });
}
