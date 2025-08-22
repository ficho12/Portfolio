// Import i18n functionality
import { changeLanguage, getCurrentLanguage } from './i18n.js';

console.log('Scripts.js loaded');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing components');
    
    // Initialize language switcher
    initializeLanguageSwitcher();
    
    // Initialize project interactions
    initializeProjectInteractions();
});

function initializeLanguageSwitcher() {
    console.log('Initializing language switcher');
    
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
}

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

function initializeProjectInteractions() {
    console.log('Initializing project interactions');
    
    // Add special interactions for different project types
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(function(card) {
        const projectType = card.getAttribute('data-project');
        
        // Add hover sound effects (optional)
        card.addEventListener('mouseenter', function() {
            this.classList.add('project-hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('project-hovered');
        });
        
        // Special handling for specific projects
        switch(projectType) {
            case 'yabs':
                // Already has modal functionality
                break;
            case 'vrsurvival':
            case 'noche':
                // Could add video preview functionality here
                addVideoPreview(card);
                break;
            case 'customEditor':
            case 'endlessRunner':
                // Could add image gallery functionality here
                addImageGallery(card);
                break;
            default:
                // Default hover effects
                break;
        }
    });
}

function addVideoPreview(card) {
    // Placeholder for video preview functionality
    // This could load a video on hover or click
    const overlay = card.querySelector('.project-overlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Video preview would open here for:', card.getAttribute('data-project'));
            // Future implementation: open video modal or inline player
        });
    }
}

function addImageGallery(card) {
    // Placeholder for image gallery functionality
    // This could cycle through multiple project images
    const overlay = card.querySelector('.project-overlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Image gallery would open here for:', card.getAttribute('data-project'));
            // Future implementation: open image gallery modal
        });
    }
}

// Smooth scrolling for navigation links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add scroll-triggered animations for project cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const projectObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('project-visible');
        }
    });
}, observerOptions);

// Observe project cards when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function(card) {
        projectObserver.observe(card);
    });
});
