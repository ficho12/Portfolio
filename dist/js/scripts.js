/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2025 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// Import i18n functionality
import { changeLanguage, getCurrentLanguage } from './i18n.js';

console.log('Scripts.js loaded');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing language switcher');
    
    // Find all language links
    const languageLinks = document.querySelectorAll('[data-lang]');
    console.log('Found language links:', languageLinks.length);
    
    // Add click event listeners to language links
    languageLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Language link clicked');
            
            const selectedLang = this.getAttribute('data-lang');
            console.log('Selected language:', selectedLang);
            
            // Change language
            changeLanguage(selectedLang).then(() => {
                console.log('Language changed successfully to:', selectedLang);
                updateActiveLanguage(selectedLang);
            }).catch(error => {
                console.error('Error changing language:', error);
            });
        });
    });
    
    // Set initial active language
    const currentLang = getCurrentLanguage();
    console.log('Current language:', currentLang);
    updateActiveLanguage(currentLang);
});

function updateActiveLanguage(lang) {
    console.log('Updating active language to:', lang);
    const languageLinks = document.querySelectorAll('[data-lang]');
    languageLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('data-lang') === lang) {
            link.classList.add('active');
        }
    });
}
