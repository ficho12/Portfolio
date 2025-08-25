// Import i18n functionality
import { changeLanguage, getCurrentLanguage, t } from './i18n.js';

console.log('Scripts.js loaded');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing components');
    console.log('=== STARTING COMPONENT INITIALIZATION ===');
    
    // Initialize language switcher
    initializeLanguageSwitcher();
    
    console.log('=== LANGUAGE SWITCHER INITIALIZED ===');
    
    // Initialize theme switcher
    initializeThemeSwitcher();
    
    console.log('=== THEME SWITCHER INITIALIZED ===');
    
    // Initialize project interactions
    initializeProjectInteractions();
    
    console.log('=== PROJECT INTERACTIONS INITIALIZED ===');
    
    // Test setTimeout first
    setTimeout(() => {
        console.log('TEST: setTimeout is working!');
    }, 50);
    
    // Initialize Pong game with a small delay to ensure DOM is ready
    setTimeout(() => {
        console.log('Attempting to initialize Pong game...');
        initializePongGame();
    }, 100);
    
    // Also try immediate initialization
    console.log('Attempting immediate Pong game initialization...');
    initializePongGame();
    
    console.log('=== END OF DOMCONTENTLOADED HANDLER ===');
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

function initializeThemeSwitcher() {
    console.log('Initializing theme switcher');
    
    // Get theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    
    if (!themeToggle) {
        console.warn('Theme toggle button not found');
        return;
    }
    
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    console.log('Loaded saved theme:', savedTheme);
    setTheme(savedTheme);
    
    // Add click event listener
    themeToggle.addEventListener('click', function() {
        console.log('Theme toggle clicked');
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        console.log('Switching from', currentTheme, 'to', newTheme);
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function setTheme(theme) {
    console.log('Setting theme to:', theme);
    
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.className = 'theme-icon bi bi-sun-fill';
        }
        if (themeText) {
            themeText.setAttribute('data-i18n', 'nav.lightMode');
            themeText.textContent = t('nav.lightMode');
        }
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeIcon) {
            themeIcon.className = 'theme-icon bi bi-moon-fill';
        }
        if (themeText) {
            themeText.setAttribute('data-i18n', 'nav.darkMode');
            themeText.textContent = t('nav.darkMode');
        }
    }
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
            case 'eyeflow':
                // Add video preview functionality for Eyeflow
                addVideoPreview(card);
                break;
            case 'noche':
                // Add video preview functionality
                addVideoPreview(card);
                break;
            case 'beeShowcase':
                // Add video preview functionality for Miel 79
                addVideoPreview(card);
                break;
            case 'renfeSimulator':
                // Add video preview functionality for railway simulator
                addVideoPreview(card);
                break;
            case 'vrsurvival':
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
    const videoId = card.getAttribute('data-video');
    const overlay = card.querySelector('.project-overlay');
    const videoContainer = card.querySelector('.video-container');
    const iframe = card.querySelector('.video-container iframe');
    const closeButton = card.querySelector('.video-close');
    
    if (overlay && videoId) {
        // Function to hide video
        const hideVideo = () => {
            iframe.src = '';
            card.classList.remove('video-playing');
            videoContainer.style.display = 'none';
        };
        
        // Show video on overlay click
        overlay.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Video preview clicked for:', card.getAttribute('data-project'));
            
            if (videoContainer && iframe) {
                // Set the YouTube embed URL
                const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`;
                iframe.src = embedUrl;
                
                // Show video and hide overlay
                card.classList.add('video-playing');
                videoContainer.style.display = 'block';
                
                // Hide video when clicking outside or on escape
                const handleOutsideClick = (event) => {
                    if (!card.contains(event.target)) {
                        hideVideo();
                        document.removeEventListener('click', handleOutsideClick);
                        document.removeEventListener('keydown', handleEscapeKey);
                    }
                };
                
                // Hide video on escape key
                const handleEscapeKey = (event) => {
                    if (event.key === 'Escape') {
                        hideVideo();
                        document.removeEventListener('click', handleOutsideClick);
                        document.removeEventListener('keydown', handleEscapeKey);
                    }
                };
                
                // Add event listeners after a short delay to prevent immediate hiding
                setTimeout(() => {
                    document.addEventListener('click', handleOutsideClick);
                    document.addEventListener('keydown', handleEscapeKey);
                }, 100);
            }
        });
        
        // Handle close button click
        if (closeButton) {
            closeButton.addEventListener('click', function(e) {
                e.stopPropagation();
                hideVideo();
            });
        }
        
        // Add hover effect for video projects
        if (card.classList.contains('video-project')) {
            card.addEventListener('mouseenter', function() {
                const overlayContent = overlay.querySelector('.overlay-content p');
                if (overlayContent && !card.classList.contains('video-playing')) {
                    overlayContent.textContent = 'Click to Watch';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const overlayContent = overlay.querySelector('.overlay-content p');
                if (overlayContent && !card.classList.contains('video-playing')) {
                    overlayContent.textContent = 'Click to Watch'; // Keep "Click to Watch" instead of reverting
                }
            });
        }
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

    // Ensure profile overlay shows on hover across browsers by toggling a class
    const profilePhotoEl = document.querySelector('#profileContainer .profile-photo');
    if (profilePhotoEl) {
        const overlayEl = profilePhotoEl.querySelector('.pong-overlay');
        const playTextEl = profilePhotoEl.querySelector('.pong-overlay .play-text');

    const showOverlay = () => {
            profilePhotoEl.classList.add('hovering');
            if (overlayEl) {
                overlayEl.style.setProperty('opacity', '1', 'important');
                overlayEl.style.setProperty('pointer-events', 'auto', 'important');
            }
            if (playTextEl) {
                playTextEl.style.setProperty('opacity', '1', 'important');
                playTextEl.style.setProperty('transform', 'translateY(0)', 'important');
            }
        };

        const hideOverlay = () => {
            profilePhotoEl.classList.remove('hovering');
            if (overlayEl) {
                overlayEl.style.setProperty('opacity', '0', 'important');
                overlayEl.style.setProperty('pointer-events', 'none', 'important');
            }
            if (playTextEl) {
                playTextEl.style.setProperty('opacity', '0', 'important');
                playTextEl.style.setProperty('transform', 'translateY(20px)', 'important');
            }
        };

        profilePhotoEl.addEventListener('mouseenter', showOverlay);
        profilePhotoEl.addEventListener('mouseleave', hideOverlay);

        // Touch support: first tap shows overlay, then auto-hide
        let touchVisibleTimeout;
        profilePhotoEl.addEventListener('touchstart', () => {
            showOverlay();
            clearTimeout(touchVisibleTimeout);
            touchVisibleTimeout = setTimeout(() => hideOverlay(), 2500);
        }, { passive: true });

        // Also support focus/blur for accessibility (keyboard)
        const imgEl = profilePhotoEl.querySelector('img');
        if (imgEl) {
            imgEl.setAttribute('tabindex', '0');
            imgEl.addEventListener('focus', showOverlay);
            imgEl.addEventListener('blur', hideOverlay);
        }
    }
});

// Sound system for Pong game - Global scope
const pongSounds = {
    // Create sound effects using Web Audio API
    context: null,
    
    init() {
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            console.log('🔊 Pong audio context initialized');
        } catch (e) {
            console.warn('🔇 Audio not supported:', e);
            this.context = null;
        }
    },
    
    playTone(frequency, duration, type = 'sine', volume = 0.1) {
        if (!this.context) return;
        
        try {
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.context.destination);
            
            oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
                oscillator.type = type;
                
                gainNode.gain.setValueAtTime(0, this.context.currentTime);
                gainNode.gain.linearRampToValueAtTime(volume, this.context.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);
                
                oscillator.start(this.context.currentTime);
                oscillator.stop(this.context.currentTime + duration);
            } catch (e) {
                console.warn('🔇 Sound playback failed:', e);
            }
        },
        
        paddleHit() {
            // Sharp, quick hit sound
            this.playTone(800, 0.1, 'square', 0.15);
        },
        
        wallBounce() {
            // Higher pitched bounce
            this.playTone(1200, 0.08, 'triangle', 0.1);
        },
        
        score() {
            // Pleasant scoring chime
            setTimeout(() => this.playTone(523, 0.2, 'sine', 0.2), 0);    // C5
            setTimeout(() => this.playTone(659, 0.2, 'sine', 0.2), 100);  // E5
            setTimeout(() => this.playTone(784, 0.3, 'sine', 0.2), 200);  // G5
        },
        
        gameStart() {
            // Rising startup sound
            setTimeout(() => this.playTone(262, 0.15, 'sine', 0.15), 0);   // C4
            setTimeout(() => this.playTone(330, 0.15, 'sine', 0.15), 150); // E4
            setTimeout(() => this.playTone(392, 0.2, 'sine', 0.15), 300);  // G4
        },
        
        gameOver() {
            // Descending game over sound
            setTimeout(() => this.playTone(523, 0.3, 'sine', 0.2), 0);     // C5
            setTimeout(() => this.playTone(494, 0.3, 'sine', 0.2), 250);   // B4
            setTimeout(() => this.playTone(440, 0.3, 'sine', 0.2), 500);   // A4
            setTimeout(() => this.playTone(392, 0.5, 'sine', 0.2), 750);   // G4
        }
    };
    
    // Initialize sound system
    pongSounds.init();

// Pong Game Implementation
function initializePongGame() {
    console.log('=== PONG GAME INITIALIZATION STARTING ===');
    
    // Wait a bit more for the DOM to be fully ready
    setTimeout(() => {
        console.log('Looking for elements...');
        
        const profileContainer = document.getElementById('profileContainer');
        const profilePhoto = document.querySelector('.profile-photo');
        const pongOverlay = document.querySelector('.pong-overlay');
        const pongGame = document.querySelector('.pong-game');
        const canvas = document.getElementById('pongCanvas');
        
        // Debug: Check if elements are found
        console.log('Profile container:', profileContainer ? 'FOUND' : 'NOT FOUND');
        console.log('Profile photo:', profilePhoto ? 'FOUND' : 'NOT FOUND');
        console.log('Pong overlay:', pongOverlay ? 'FOUND' : 'NOT FOUND');
        console.log('Pong game:', pongGame ? 'FOUND' : 'NOT FOUND');
        console.log('Canvas:', canvas ? 'FOUND' : 'NOT FOUND');
        
        if (!profileContainer || !profilePhoto || !pongOverlay || !pongGame || !canvas) {
            console.error('CRITICAL ERROR: Some required elements were not found!');
            console.log('Available elements with IDs:', 
                Array.from(document.querySelectorAll('[id]')).map(el => el.id));
            console.log('Available elements with class profile-photo:', 
                document.querySelectorAll('.profile-photo'));
            console.log('Available elements with class pong-overlay:', 
                document.querySelectorAll('.pong-overlay'));
            return;
        }
        
        console.log('All elements found successfully!');
        
        const ctx = canvas.getContext('2d');
        
        // Game state
        let gameActive = false;
        let gameStarted = false;
        let playerScore = 0;
        let cpuScore = 0;
        let maxScore = 5;
        let animationId = null;
    
    // Game objects
    let balls = [{
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 8,
        speedX: 4,
        speedY: 3,
        maxSpeed: 12,
        trail: [],
        glow: 0,
        glowDirection: 1
    }];
    
    // Game progression variables
    let gameStartTime = 0;
    let lastBallSpawn = 0;
    let speedMultiplier = 1;
    let particles = [];
    let powerUps = [];
    
    const playerPaddle = {
        x: 10,
        y: canvas.height / 2 - 40,
        width: 8,
        height: 80,
        speed: 6,
        glow: 0,
        glowDirection: 1,
        trail: []
    };
    
    const cpuPaddle = {
        x: canvas.width - 18,
        y: canvas.height / 2 - 40,
        width: 8,
        height: 80,
        speed: 4,
        glow: 0,
        glowDirection: 1,
        trail: []
    };
    
    // CPU player image (your photo)
    const cpuImage = new Image();
    cpuImage.src = 'assets/profile.png';
    let cpuImageLoaded = false;
    
    cpuImage.onload = function() {
        cpuImageLoaded = true;
    };
    
    // Input handling
    const keys = {};
    
    document.addEventListener('keydown', function(e) {
        keys[e.key.toLowerCase()] = true;
        keys[e.code] = true;
        
        // Global ESC handler for hero section game
        if (e.key === 'Escape' && window.heroSectionGameRunning) {
            console.log('Global ESC pressed - exiting hero section game');
            e.preventDefault();
            e.stopPropagation();
            exitHeroSectionGame();
        }
    });
    
    document.addEventListener('keyup', function(e) {
        keys[e.key.toLowerCase()] = false;
        keys[e.code] = false;
    });
    
    // Click to start Pong
    if (pongOverlay) {
        console.log('Adding click event listener to pong overlay');
        pongOverlay.addEventListener('click', function(e) {
            console.log('Pong overlay clicked!');
            e.preventDefault();
            e.stopPropagation();
            startPongGame();
        });
    } else {
        console.error('Pong overlay not found, cannot add click listener');
    }
    
        // Also add click event to the profile photo as fallback
        if (profilePhoto) {
            console.log('Adding click event listener to profile photo');
            profilePhoto.addEventListener('click', function(e) {
                console.log('Profile photo clicked!');
                e.preventDefault();
                e.stopPropagation();
                startPongGame();
            });
        }
        
        // Add click event to the profile image itself
        const profileImage = document.getElementById('profileImage');
        if (profileImage) {
            console.log('Adding click event listener to profile image');
            profileImage.addEventListener('click', function(e) {
                console.log('Profile image clicked!');
                e.preventDefault();
                e.stopPropagation();
                startPongGame();
            });
        }    // Canvas click to start game
    canvas.addEventListener('click', function() {
        if (!gameStarted && gameActive) {
            startGame();
        }
    });
    
    // Game control buttons
    const playAgainBtn = document.getElementById('playAgainBtn');
    const backToPhotoBtn = document.getElementById('backToPhotoBtn');
    
    console.log('Play again button:', playAgainBtn);
    console.log('Back to photo button:', backToPhotoBtn);
    
    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', function() {
            console.log('Play again clicked');
            resetGame();
            startGame();
        });
    }
    
    if (backToPhotoBtn) {
        backToPhotoBtn.addEventListener('click', function() {
            console.log('Back to photo clicked');
            exitPongGame();
        });
    }
    
    function startPongGame() {
        console.log('Starting hero section Pong game');
        
        // Check if game is already running
        if (window.heroSectionGameRunning) {
            console.log('Game already running, preventing duplicate start');
            return;
        }
        
        // Set game running flag
        window.heroSectionGameRunning = true;
        
        const heroSection = document.querySelector('.hero');
        const profileContainer = document.getElementById('profileContainer');
        const heroContent = document.querySelector('.hero-content');
        
        if (!heroSection) {
            console.error('Hero section not found');
            window.heroSectionGameRunning = false; // Reset flag on error
            return;
        }
        
        // Remove any existing game overlay
        const existingOverlay = document.getElementById('heroSectionPongGame');
        if (existingOverlay) {
            console.log('Removing existing game overlay');
            existingOverlay.remove();
        }
        
        // Fade out hero elements
        const elementsToFade = [heroContent];
        elementsToFade.forEach(element => {
            if (element) {
                element.style.transition = 'opacity 0.5s ease-in-out';
                element.style.opacity = '0.1'; // Keep slightly visible
            }
        });
        
        // Hide the profile container with fade
        if (profileContainer) {
            profileContainer.style.transition = 'opacity 0.3s ease-in-out';
            profileContainer.style.opacity = '0';
            setTimeout(() => {
                profileContainer.style.display = 'none';
            }, 300);
        }
        
        // Create game overlay that fills the hero section (transparent background)
        const gameOverlay = document.createElement('div');
        gameOverlay.id = 'heroSectionPongGame';
        gameOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            z-index: 5;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Inter', sans-serif;
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        `;
        
        // Ensure hero section is positioned relatively
        if (getComputedStyle(heroSection).position === 'static') {
            heroSection.style.position = 'relative';
        }
        
        // Get hero section dimensions
        const heroRect = heroSection.getBoundingClientRect();
        const heroWidth = heroSection.offsetWidth;
        const heroHeight = heroSection.offsetHeight;
        
        // Create game canvas that fills the entire hero section
        const canvas = document.createElement('canvas');
        canvas.id = 'heroSectionPongCanvas';
        canvas.width = heroWidth; // Full width
        canvas.height = heroHeight; // Full height
        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: none;
            background: transparent;
        `;
        
        // Create UI overlay
        const uiOverlay = document.createElement('div');
        uiOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            color: white;
            z-index: 6;
        `;
        
        // Score display
        const scoreBoard = document.createElement('div');
        scoreBoard.style.cssText = `
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 2.5rem;
            font-weight: bold;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        `;
        scoreBoard.innerHTML = `
            <span id="heroSectionPlayerScore">0</span>
            <span style="margin: 0 30px;">-</span>
            <span id="heroSectionCpuScore">0</span>
        `;
        
        // Game message
        const gameMessage = document.createElement('div');
        gameMessage.id = 'heroSectionGameMessage';
        gameMessage.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.8rem;
            font-weight: bold;
            text-align: center;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
            max-width: 80%;
        `;
        gameMessage.textContent = `${t('game.pong.moveKeys')} - ${t('game.pong.clickToStart')} - ${t('game.pong.escToExit')}`;
        
        // Controls hint
        const controlsHint = document.createElement('div');
        controlsHint.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 1rem;
            text-align: center;
            opacity: 0.9;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        `;
        controlsHint.innerHTML = `
            <div>${t('game.pong.playerLabel')}: ${t('game.pong.moveKeys')}</div>
            <div style="margin-top: 5px;">${t('game.pong.escToExit')} • ${t('game.pong.clickToStart')}</div>
        `;
        
        // Exit on click anywhere
        gameOverlay.addEventListener('click', function(e) {
            if (e.target === gameOverlay) {
                exitHeroSectionGame();
            }
        });
        
        // Assemble the UI
        uiOverlay.appendChild(scoreBoard);
        uiOverlay.appendChild(gameMessage);
        uiOverlay.appendChild(controlsHint);
        
        gameOverlay.appendChild(canvas);
        gameOverlay.appendChild(uiOverlay);
        heroSection.appendChild(gameOverlay);
        
        // Fade in the game overlay
        setTimeout(() => {
            gameOverlay.style.opacity = '1';
        }, 100);
        
        // Initialize hero section game
        initializeHeroSectionPongGame(canvas);
    }
    
    function exitPongGame() {
        console.log('Exiting Pong game');
        gameActive = false;
        gameStarted = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        pongGame.style.display = 'none';
        profilePhoto.style.display = 'block';
        document.querySelector('.game-over-screen').style.display = 'none';
    }
    
    function exitFullscreenGame() {
        console.log('Exiting fullscreen Pong game');
        
        // Stop the game
        if (window.fullscreenGameActive) {
            window.fullscreenGameActive = false;
        }
        if (window.fullscreenAnimationId) {
            cancelAnimationFrame(window.fullscreenAnimationId);
        }
        
        // Remove the fullscreen overlay
        const gameOverlay = document.getElementById('fullscreenPongGame');
        if (gameOverlay) {
            gameOverlay.remove();
        }
        
        // Show the profile container again
        const profileContainer = document.getElementById('profileContainer');
        if (profileContainer) {
            profileContainer.style.display = 'block';
        }
        
        // Remove event listeners
        document.removeEventListener('keydown', window.fullscreenKeyHandler);
        document.removeEventListener('keyup', window.fullscreenKeyUpHandler);
    }
    
    function exitHeroSectionGame() {
        console.log('Exiting hero section Pong game');
        
        // Reset game running flag
        window.heroSectionGameRunning = false;
        window.heroSectionGameStarted = false;
        
        // Stop the game
        if (window.heroSectionGameActive) {
            window.heroSectionGameActive = false;
        }
        if (window.heroSectionAnimationId) {
            cancelAnimationFrame(window.heroSectionAnimationId);
            window.heroSectionAnimationId = null;
        }
        
        // Fade out game overlay
        const gameOverlay = document.getElementById('heroSectionPongGame');
        if (gameOverlay) {
            gameOverlay.style.transition = 'opacity 0.3s ease-in-out';
            gameOverlay.style.opacity = '0';
            setTimeout(() => {
                if (gameOverlay.parentNode) {
                    gameOverlay.remove();
                }
                // Ensure no residual overlays are left
                const residualOverlays = document.querySelectorAll('[id*="heroSectionPongGame"]');
                residualOverlays.forEach(overlay => {
                    if (overlay.parentNode) {
                        overlay.remove();
                    }
                });
            }, 300);
        }
        
        // Fade in hero elements
        const heroContent = document.querySelector('.hero-content');
        const profileContainer = document.getElementById('profileContainer');
        
        if (heroContent) {
            setTimeout(() => {
                heroContent.style.transition = 'opacity 0.5s ease-in-out';
                heroContent.style.opacity = '1';
            }, 200);
        }
        
        if (profileContainer) {
            setTimeout(() => {
                profileContainer.style.display = 'block';
                profileContainer.style.opacity = '0';
                profileContainer.style.transition = 'opacity 0.5s ease-in-out';
                setTimeout(() => {
                    // Remove inline opacity to allow CSS hover effects
                    profileContainer.style.removeProperty('opacity');
                    profileContainer.style.removeProperty('transition');
                }, 50);
            }, 300);
        }
        
        // Remove event listeners
        if (window.heroSectionKeyHandler) {
            document.removeEventListener('keydown', window.heroSectionKeyHandler);
        }
        if (window.heroSectionKeyUpHandler) {
            document.removeEventListener('keyup', window.heroSectionKeyUpHandler);
        }
        
        console.log('Hero section game exited successfully');
    }
    
    function startGame() {
        gameStarted = true;
        gameStartTime = Date.now();
        lastBallSpawn = gameStartTime;
        speedMultiplier = 1;
        particles = [];
        powerUps = [];
        pongSounds.gameStart(); // 🔊 Game start sound
        resetBalls();
        updateGameMessage('');
        document.querySelector('.game-over-screen').style.display = 'none';
    }
    
    function resetGame() {
        playerScore = 0;
        cpuScore = 0;
        gameStartTime = 0;
        lastBallSpawn = 0;
        speedMultiplier = 1;
        particles = [];
        powerUps = [];
        balls = [{
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 8,
            speedX: 4,
            speedY: 3,
            maxSpeed: 12,
            trail: [],
            glow: 0,
            glowDirection: 1
        }];
        updateScore();
        resetBalls();
        gameStarted = false;
    }
    
    function resetBalls() {
        balls.forEach(ball => {
            ball.x = canvas.width / 2 + (Math.random() - 0.5) * 100;
            ball.y = canvas.height / 2 + (Math.random() - 0.5) * 100;
            ball.speedX = (Math.random() > 0.5 ? 1 : -1) * (4 + Math.random() * 2);
            ball.speedY = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 2);
            ball.trail = [];
        });
    }
    
    // Particle system for visual effects
    function createParticles(x, y, color = '#3498db', count = 5) {
        for (let i = 0; i < count; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1,
                decay: 0.02 + Math.random() * 0.02,
                size: 2 + Math.random() * 3,
                color: color
            });
        }
    }
    
    function updateParticles() {
        particles = particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            particle.life -= particle.decay;
            return particle.life > 0;
        });
    }
    
    function renderParticles() {
        particles.forEach(particle => {
            ctx.save();
            ctx.globalAlpha = particle.life;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }
    
    // Power-up system
    function spawnPowerUp() {
        if (Math.random() < 0.3) { // 30% chance
            powerUps.push({
                x: canvas.width * 0.2 + Math.random() * canvas.width * 0.6,
                y: canvas.height * 0.2 + Math.random() * canvas.height * 0.6,
                type: Math.random() > 0.5 ? 'speed' : 'multi',
                life: 1,
                pulse: 0,
                collected: false
            });
        }
    }
    
    function updatePowerUps() {
        powerUps = powerUps.filter(powerUp => {
            powerUp.pulse += 0.1;
            powerUp.life -= 0.005;
            
            // Check collision with balls
            balls.forEach(ball => {
                const distance = Math.sqrt(
                    Math.pow(ball.x - powerUp.x, 2) + 
                    Math.pow(ball.y - powerUp.y, 2)
                );
                
                if (distance < ball.radius + 15 && !powerUp.collected) {
                    powerUp.collected = true;
                    applyPowerUp(powerUp.type);
                    createParticles(powerUp.x, powerUp.y, '#f39c12', 10);
                    pongSounds.score(); // Use score sound for power-up collection
                }
            });
            
            return powerUp.life > 0 && !powerUp.collected;
        });
    }
    
    function applyPowerUp(type) {
        if (type === 'speed') {
            speedMultiplier += 0.3;
        } else if (type === 'multi') {
            spawnExtraBall();
        }
    }
    
    function spawnExtraBall() {
        if (balls.length < 4) { // Max 4 balls
            const newBall = {
                x: canvas.width / 2,
                y: canvas.height / 2,
                radius: 6 + Math.random() * 4,
                speedX: (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 3) * speedMultiplier,
                speedY: (Math.random() > 0.5 ? 1 : -1) * (4 + Math.random() * 3) * speedMultiplier,
                maxSpeed: 15,
                trail: [],
                glow: 0,
                glowDirection: 1
            };
            balls.push(newBall);
        }
    }
    
    function renderPowerUps() {
        powerUps.forEach(powerUp => {
            ctx.save();
            ctx.globalAlpha = powerUp.life;
            
            const pulseSize = 15 + Math.sin(powerUp.pulse) * 3;
            const color = powerUp.type === 'speed' ? '#e74c3c' : '#f39c12';
            
            // Outer glow
            ctx.shadowBlur = 20;
            ctx.shadowColor = color;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(powerUp.x, powerUp.y, pulseSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Inner circle
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(powerUp.x, powerUp.y, pulseSize * 0.6, 0, Math.PI * 2);
            ctx.fill();
            
            // Icon
            ctx.fillStyle = color;
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(powerUp.type === 'speed' ? '⚡' : '●●', powerUp.x, powerUp.y + 4);
            
            ctx.restore();
        });
    }
    
    function updateScore() {
        document.getElementById('playerScore').textContent = playerScore;
        document.getElementById('cpuScore').textContent = cpuScore;
    }
    
    function updateGameMessage(message) {
        document.getElementById('gameMessage').textContent = message;
    }
    
    function gameLoop() {
        if (!gameActive) return;
        
        update();
        render();
        
        animationId = requestAnimationFrame(gameLoop);
    }
    
    function update() {
        if (!gameStarted) return;
        
        // Calculate game progression
        const gameTime = Date.now() - gameStartTime;
        const timeInSeconds = gameTime / 1000;
        
        // Progressive speed increase every 10 seconds
        speedMultiplier = 1 + Math.floor(timeInSeconds / 10) * 0.2;
        
        // Spawn extra balls occasionally (every 15 seconds, max 3 balls)
        if (timeInSeconds > 15 && gameTime - lastBallSpawn > 15000 && balls.length < 3) {
            spawnExtraBall();
            lastBallSpawn = gameTime;
        }
        
        // Spawn power-ups occasionally
        if (Math.random() < 0.001) { // Very rare
            spawnPowerUp();
        }
        
        // Update paddle glow effects
        playerPaddle.glow += playerPaddle.glowDirection * 0.05;
        if (playerPaddle.glow >= 1 || playerPaddle.glow <= 0) {
            playerPaddle.glowDirection *= -1;
        }
        
        cpuPaddle.glow += cpuPaddle.glowDirection * 0.03;
        if (cpuPaddle.glow >= 1 || cpuPaddle.glow <= 0) {
            cpuPaddle.glowDirection *= -1;
        }
        
        // Player input with improved responsiveness
        const paddleSpeed = playerPaddle.speed * (1 + speedMultiplier * 0.1);
        if ((keys['w'] || keys['ArrowUp']) && playerPaddle.y > 0) {
            playerPaddle.y -= paddleSpeed;
            // Add trail effect
            playerPaddle.trail.push({
                x: playerPaddle.x + playerPaddle.width / 2,
                y: playerPaddle.y + playerPaddle.height / 2,
                life: 1
            });
        }
        if ((keys['s'] || keys['ArrowDown']) && playerPaddle.y < canvas.height - playerPaddle.height) {
            playerPaddle.y += paddleSpeed;
            // Add trail effect
            playerPaddle.trail.push({
                x: playerPaddle.x + playerPaddle.width / 2,
                y: playerPaddle.y + playerPaddle.height / 2,
                life: 1
            });
        }
        
        // Update paddle trails
        playerPaddle.trail = playerPaddle.trail.filter(point => {
            point.life -= 0.05;
            return point.life > 0;
        });
        
        cpuPaddle.trail = cpuPaddle.trail.filter(point => {
            point.life -= 0.05;
            return point.life > 0;
        });
        
        // Enhanced CPU AI that tracks closest ball
        let closestBall = balls[0];
        let closestDistance = Infinity;
        
        balls.forEach(ball => {
            const distance = Math.abs(ball.x - cpuPaddle.x);
            if (distance < closestDistance && ball.speedX > 0) {
                closestDistance = distance;
                closestBall = ball;
            }
        });
        
        if (closestBall) {
            const cpuCenter = cpuPaddle.y + cpuPaddle.height / 2;
            const ballCenter = closestBall.y;
            const cpuSpeed = cpuPaddle.speed * (1 + speedMultiplier * 0.08);
            
            if (cpuCenter < ballCenter - 15) {
                cpuPaddle.y += cpuSpeed;
                cpuPaddle.trail.push({
                    x: cpuPaddle.x + cpuPaddle.width / 2,
                    y: cpuPaddle.y + cpuPaddle.height / 2,
                    life: 1
                });
            } else if (cpuCenter > ballCenter + 15) {
                cpuPaddle.y -= cpuSpeed;
                cpuPaddle.trail.push({
                    x: cpuPaddle.x + cpuPaddle.width / 2,
                    y: cpuPaddle.y + cpuPaddle.height / 2,
                    life: 1
                });
            }
        }
        
        // Keep CPU paddle in bounds
        cpuPaddle.y = Math.max(0, Math.min(canvas.height - cpuPaddle.height, cpuPaddle.y));
        
        // Update all balls
        balls.forEach((ball, ballIndex) => {
            // Update ball glow effect
            ball.glow += ball.glowDirection * 0.1;
            if (ball.glow >= 1 || ball.glow <= 0) {
                ball.glowDirection *= -1;
            }
            
            // Apply speed multiplier
            const currentSpeedX = ball.speedX * speedMultiplier;
            const currentSpeedY = ball.speedY * speedMultiplier;
            
            // Ball movement
            ball.x += currentSpeedX;
            ball.y += currentSpeedY;
            
            // Add trail effect
            ball.trail.push({
                x: ball.x,
                y: ball.y,
                life: 1
            });
            
            // Limit trail length
            if (ball.trail.length > 10) {
                ball.trail.shift();
            }
            
            // Update trail
            ball.trail = ball.trail.filter(point => {
                point.life -= 0.1;
                return point.life > 0;
            });
            
            // Ball collision with top/bottom walls
            if (ball.y <= ball.radius || ball.y >= canvas.height - ball.radius) {
                ball.speedY = -ball.speedY;
                createParticles(ball.x, ball.y, '#3498db', 3);
                pongSounds.wallBounce(); // 🔊 Wall bounce sound
            }
            
            // Ball collision with player paddle
            if (ball.x - ball.radius <= playerPaddle.x + playerPaddle.width &&
                ball.y >= playerPaddle.y &&
                ball.y <= playerPaddle.y + playerPaddle.height &&
                ball.speedX < 0) {
                
                ball.speedX = -ball.speedX;
                ball.speedY += (ball.y - (playerPaddle.y + playerPaddle.height / 2)) * 0.15;
                ball.speedX = Math.min(ball.maxSpeed, Math.abs(ball.speedX)) * Math.sign(ball.speedX);
                createParticles(ball.x, ball.y, '#3498db', 5);
                pongSounds.paddleHit(); // 🔊 Player paddle hit sound
            }
            
            // Ball collision with CPU paddle
            if (ball.x + ball.radius >= cpuPaddle.x &&
                ball.y >= cpuPaddle.y &&
                ball.y <= cpuPaddle.y + cpuPaddle.height &&
                ball.speedX > 0) {
                
                ball.speedX = -ball.speedX;
                ball.speedY += (ball.y - (cpuPaddle.y + cpuPaddle.height / 2)) * 0.15;
                ball.speedX = -Math.min(ball.maxSpeed, Math.abs(ball.speedX));
                createParticles(ball.x, ball.y, '#e74c3c', 5);
                pongSounds.paddleHit(); // 🔊 CPU paddle hit sound
            }
            
            // Ball out of bounds (scoring)
            if (ball.x < -ball.radius) {
                cpuScore++;
                createParticles(0, ball.y, '#e74c3c', 8);
                pongSounds.score(); // 🔊 Score sound
                updateScore();
                
                // Remove this ball if multiple balls exist
                if (balls.length > 1) {
                    balls.splice(ballIndex, 1);
                } else {
                    checkGameEnd();
                    if (gameStarted) resetBalls();
                }
            } else if (ball.x > canvas.width + ball.radius) {
                playerScore++;
                createParticles(canvas.width, ball.y, '#3498db', 8);
                pongSounds.score(); // 🔊 Score sound
                updateScore();
                
                // Remove this ball if multiple balls exist
                if (balls.length > 1) {
                    balls.splice(ballIndex, 1);
                } else {
                    checkGameEnd();
                    if (gameStarted) resetBalls();
                }
            }
        });
        
        // Update particles and power-ups
        updateParticles();
        updatePowerUps();
    }
    
    function checkGameEnd() {
        if (playerScore >= maxScore || cpuScore >= maxScore) {
            gameStarted = false;
            pongSounds.gameOver(); // 🔊 Game over sound
            showGameOver();
        }
    }
    
    function showGameOver() {
        const gameOverScreen = document.querySelector('.game-over-screen');
        const gameResult = document.getElementById('gameResult');
        const finalPlayerScore = document.getElementById('finalPlayerScore');
        const finalCpuScore = document.getElementById('finalCpuScore');
        
        if (playerScore >= maxScore) {
            gameResult.textContent = `🎉 ${t('game.pong.youWon')}`;
            gameResult.style.color = '#28a745';
        } else {
            gameResult.textContent = `💻 ${t('game.pong.fizWon')}`;
            gameResult.style.color = '#dc3545';
        }
        
        finalPlayerScore.textContent = playerScore;
        finalCpuScore.textContent = cpuScore;
        
        gameOverScreen.style.display = 'flex';
    }
    
    function render() {
        // Clear canvas with complete transparency
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw animated center line
        const lineOffset = Math.sin(Date.now() * 0.002) * 2;
        ctx.save();
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#3498db';
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + lineOffset, 0);
        ctx.lineTo(canvas.width / 2 + lineOffset, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
        
        // Draw paddle trails
        function drawTrail(trail, color) {
            trail.forEach((point, index) => {
                ctx.save();
                ctx.globalAlpha = point.life * 0.3;
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(point.x, point.y, 2 * point.life, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        }
        
        drawTrail(playerPaddle.trail, '#3498db');
        drawTrail(cpuPaddle.trail, '#e74c3c');
        
        // Draw enhanced player paddle
        ctx.save();
        const playerGlow = 10 + playerPaddle.glow * 5;
        ctx.shadowBlur = playerGlow;
        ctx.shadowColor = '#3498db';
        
        // Create gradient for paddle
        const playerGradient = ctx.createLinearGradient(
            playerPaddle.x, 
            playerPaddle.y, 
            playerPaddle.x + playerPaddle.width, 
            playerPaddle.y + playerPaddle.height
        );
        playerGradient.addColorStop(0, '#5dade2');
        playerGradient.addColorStop(0.5, '#3498db');
        playerGradient.addColorStop(1, '#2980b9');
        
        ctx.fillStyle = playerGradient;
        ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
        
        // Add border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
        ctx.restore();
        
        // Draw enhanced CPU paddle with your photo
        ctx.save();
        const cpuGlow = 10 + cpuPaddle.glow * 5;
        ctx.shadowBlur = cpuGlow;
        ctx.shadowColor = '#e74c3c';
        
        if (cpuImageLoaded) {
            ctx.beginPath();
            ctx.roundRect(cpuPaddle.x, cpuPaddle.y, cpuPaddle.width, cpuPaddle.height, 4);
            ctx.clip();
            
            // Draw the image scaled to fit the paddle
            const aspectRatio = cpuImage.width / cpuImage.height;
            const paddleAspectRatio = cpuPaddle.width / cpuPaddle.height;
            
            let drawWidth, drawHeight, drawX, drawY;
            
            if (aspectRatio > paddleAspectRatio) {
                drawHeight = cpuPaddle.height;
                drawWidth = drawHeight * aspectRatio;
                drawX = cpuPaddle.x - (drawWidth - cpuPaddle.width) / 2;
                drawY = cpuPaddle.y;
            } else {
                drawWidth = cpuPaddle.width;
                drawHeight = drawWidth / aspectRatio;
                drawX = cpuPaddle.x;
                drawY = cpuPaddle.y - (drawHeight - cpuPaddle.height) / 2;
            }
            
            ctx.drawImage(cpuImage, drawX, drawY, drawWidth, drawHeight);
            ctx.restore();
            
            // Add animated border
            ctx.save();
            ctx.strokeStyle = '#e74c3c';
            ctx.lineWidth = 2 + Math.sin(Date.now() * 0.005) * 1;
            ctx.shadowBlur = cpuGlow;
            ctx.shadowColor = '#e74c3c';
            ctx.strokeRect(cpuPaddle.x, cpuPaddle.y, cpuPaddle.width, cpuPaddle.height);
            ctx.restore();
        } else {
            // Fallback gradient
            const cpuGradient = ctx.createLinearGradient(
                cpuPaddle.x, 
                cpuPaddle.y, 
                cpuPaddle.x + cpuPaddle.width, 
                cpuPaddle.y + cpuPaddle.height
            );
            cpuGradient.addColorStop(0, '#ec7063');
            cpuGradient.addColorStop(0.5, '#e74c3c');
            cpuGradient.addColorStop(1, '#c0392b');
            
            ctx.fillStyle = cpuGradient;
            ctx.fillRect(cpuPaddle.x, cpuPaddle.y, cpuPaddle.width, cpuPaddle.height);
            
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.strokeRect(cpuPaddle.x, cpuPaddle.y, cpuPaddle.width, cpuPaddle.height);
        }
        ctx.restore();
        
        // Draw all balls with enhanced effects
        balls.forEach(ball => {
            // Draw ball trail
            ball.trail.forEach((point, index) => {
                ctx.save();
                ctx.globalAlpha = point.life * 0.4;
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(point.x, point.y, ball.radius * point.life * 0.8, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            
            // Draw main ball with pulsing glow
            ctx.save();
            const ballGlow = 15 + ball.glow * 10;
            ctx.shadowBlur = ballGlow;
            ctx.shadowColor = '#fff';
            
            // Outer glow
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius + 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Inner ball with gradient
            const ballGradient = ctx.createRadialGradient(
                ball.x - ball.radius * 0.3, 
                ball.y - ball.radius * 0.3, 
                0,
                ball.x, 
                ball.y, 
                ball.radius
            );
            ballGradient.addColorStop(0, '#fff');
            ballGradient.addColorStop(0.7, '#f8f9fa');
            ballGradient.addColorStop(1, '#e9ecef');
            
            ctx.fillStyle = ballGradient;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Add highlight
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(ball.x - ball.radius * 0.3, ball.y - ball.radius * 0.3, ball.radius * 0.3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        });
        
        // Render particles and power-ups
        renderParticles();
        renderPowerUps();
        
        // Display game info with enhanced styling
        if (gameStarted) {
            const gameTime = Math.floor((Date.now() - gameStartTime) / 1000);
            const speed = speedMultiplier.toFixed(1);
            
            ctx.save();
            ctx.textAlign = 'center';
            ctx.shadowBlur = 3;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            
            // Main game stats
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 14px Arial';
            ctx.fillText(`Time: ${gameTime}s | Speed: ${speed}x | Balls: ${balls.length}`, canvas.width / 2, 25);
            
            // Special effects indicators with proper spacing
            let yOffset = 45;
            
            if (speedMultiplier > 1.5) {
                ctx.fillStyle = '#f39c12';
                ctx.font = 'bold 12px Arial';
                ctx.fillText('⚡ SPEED MODE ⚡', canvas.width / 2, yOffset);
                yOffset += 20;
            }
            
            if (balls.length > 1) {
                ctx.fillStyle = '#e74c3c';
                ctx.font = 'bold 12px Arial';
                ctx.fillText('🔥 MULTI-BALL 🔥', canvas.width / 2, yOffset);
            }
            
            ctx.restore();
        }
    }
    
    }, 500); // Close the setTimeout from initializePongGame
}

// ============================================
// HERO SECTION PONG GAME IMPLEMENTATION
// ============================================

function initializeHeroSectionPongGame(canvas) {
    console.log('Initializing hero section Pong game');
    
    const ctx = canvas.getContext('2d');
    
    // Game variables
    window.heroSectionGameActive = true;
    window.heroSectionGameStarted = false;
    
    // Game objects scaled to canvas size
    const game = {
        balls: [{
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: 6,
            vy: 3,
            radius: 12,
            maxSpeed: 15,
            trail: [],
            glow: 0,
            glowDirection: 1
        }],
        player: {
            x: 20, // Left edge
            y: canvas.height / 2 - 60,
            width: 15,
            height: 120,
            speed: 7,
            score: 0,
            glow: 0,
            glowDirection: 1,
            trail: []
        },
        cpu: {
            x: canvas.width - 35, // Right edge
            y: canvas.height / 2 - 60,
            width: 15,
            height: 120,
            speed: 5,
            score: 0,
            glow: 0,
            glowDirection: 1,
            trail: []
        },
        keys: {
            up: false,
            down: false
        },
        startTime: 0,
        lastBallSpawn: 0,
        speedMultiplier: 1,
        particles: [],
        powerUps: []
    };
    
    // Load CPU image (user's profile photo)
    const cpuImage = new Image();
    cpuImage.src = 'assets/profile.png';
    
    // Key handlers
    window.heroSectionKeyHandler = function(e) {
        // Only handle keys when the hero section game is active
        if (!window.heroSectionGameRunning) {
            return;
        }
        
        console.log('Hero Section Key pressed:', e.key);
        
        switch(e.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                e.preventDefault();
                e.stopPropagation();
                game.keys.up = true;
                break;
            case 's':
            case 'arrowdown':
                e.preventDefault();
                e.stopPropagation();
                game.keys.down = true;
                break;
            case 'escape':
                console.log('ESC key pressed - exiting game');
                e.preventDefault();
                e.stopPropagation();
                exitHeroSectionGame();
                break;
        }
    };
    
    window.heroSectionKeyUpHandler = function(e) {
        // Only handle keys when the hero section game is active
        if (!window.heroSectionGameRunning) {
            return;
        }
        
        switch(e.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                e.preventDefault();
                e.stopPropagation();
                game.keys.up = false;
                break;
            case 's':
            case 'arrowdown':
                e.preventDefault();
                e.stopPropagation();
                game.keys.down = false;
                break;
        }
    };
    
    // Add event listeners
    document.addEventListener('keydown', window.heroSectionKeyHandler);
    document.addEventListener('keyup', window.heroSectionKeyUpHandler);
    
    // Click to start or restart
    canvas.addEventListener('click', function() {
        if (!window.heroSectionGameStarted) {
            // First time starting the game
            window.heroSectionGameStarted = true;
            game.startTime = Date.now();
            game.lastBallSpawn = game.startTime;
            game.speedMultiplier = 1;
            game.particles = [];
            game.powerUps = [];
            pongSounds.gameStart(); // 🔊 Game start sound
            updateHeroSectionMessage(t('game.pong.gameStarted'));
            setTimeout(() => updateHeroSectionMessage(''), 1000);
        } else if (window.heroSectionGameStarted && !window.heroSectionGameActive) {
            // Game has ended, restart it
            console.log('Restarting hero section game');
            pongSounds.gameStart(); // 🔊 Game restart sound
            game.player.score = 0;
            game.cpu.score = 0;
            game.startTime = Date.now();
            game.lastBallSpawn = game.startTime;
            game.speedMultiplier = 1;
            game.particles = [];
            game.powerUps = [];
            updateHeroSectionScore();
            resetHeroSectionBall();
            window.heroSectionGameActive = true;
            updateHeroSectionMessage(t('game.pong.gameStarted'));
            setTimeout(() => updateHeroSectionMessage(''), 1000);
            // Restart the game loop
            heroSectionGameLoop();
        }
    });
    
    // Game functions
    function updateHeroSectionMessage(message) {
        const messageEl = document.getElementById('heroSectionGameMessage');
        if (messageEl) {
            messageEl.textContent = message;
        }
    }
    
    function updateHeroSectionScore() {
        const playerScoreEl = document.getElementById('heroSectionPlayerScore');
        const cpuScoreEl = document.getElementById('heroSectionCpuScore');
        if (playerScoreEl) playerScoreEl.textContent = game.player.score;
        if (cpuScoreEl) cpuScoreEl.textContent = game.cpu.score;
    }
    
    function resetHeroSectionBall() {
        // Reset to single ball
        game.balls = [{
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() > 0.5 ? 1 : -1) * 6,
            vy: (Math.random() - 0.5) * 6,
            radius: 12,
            maxSpeed: 15,
            trail: [],
            glow: 0,
            glowDirection: 1
        }];
    }
    
    function checkHeroSectionGameEnd() {
        if (game.player.score >= 5) {
            pongSounds.gameOver(); // 🔊 Game over sound
            updateHeroSectionMessage(t('game.pong.youWin'));
            window.heroSectionGameActive = false;
            return true;
        } else if (game.cpu.score >= 5) {
            pongSounds.gameOver(); // 🔊 Game over sound
            updateHeroSectionMessage(t('game.pong.fizWins'));
            window.heroSectionGameActive = false;
            return true;
        }
        return false;
    }
    
    function updateHeroSection() {
        if (!window.heroSectionGameActive || !window.heroSectionGameStarted) return;
        
        // Calculate game progression
        const gameTime = Date.now() - game.startTime;
        const timeInSeconds = gameTime / 1000;
        
        // Progressive speed increase
        game.speedMultiplier = 1 + Math.floor(timeInSeconds / 8) * 0.25;
        
        // Spawn extra balls occasionally
        if (timeInSeconds > 12 && gameTime - game.lastBallSpawn > 12000 && game.balls.length < 3) {
            const newBall = {
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 3),
                vy: (Math.random() > 0.5 ? 1 : -1) * (4 + Math.random() * 3),
                radius: 8 + Math.random() * 6,
                maxSpeed: 18,
                trail: [],
                glow: 0,
                glowDirection: 1
            };
            game.balls.push(newBall);
            game.lastBallSpawn = gameTime;
        }
        
        // Update glow effects
        game.player.glow += game.player.glowDirection * 0.04;
        if (game.player.glow >= 1 || game.player.glow <= 0) {
            game.player.glowDirection *= -1;
        }
        
        game.cpu.glow += game.cpu.glowDirection * 0.03;
        if (game.cpu.glow >= 1 || game.cpu.glow <= 0) {
            game.cpu.glowDirection *= -1;
        }
        
        // Player movement with trails
        const playerSpeed = game.player.speed * (1 + game.speedMultiplier * 0.1);
        if (game.keys.up && game.player.y > 0) {
            game.player.y -= playerSpeed;
            game.player.trail.push({
                x: game.player.x + game.player.width / 2,
                y: game.player.y + game.player.height / 2,
                life: 1
            });
        }
        if (game.keys.down && game.player.y < canvas.height - game.player.height) {
            game.player.y += playerSpeed;
            game.player.trail.push({
                x: game.player.x + game.player.width / 2,
                y: game.player.y + game.player.height / 2,
                life: 1
            });
        }
        
        // Update trails
        game.player.trail = game.player.trail.filter(point => {
            point.life -= 0.08;
            return point.life > 0;
        });
        
        game.cpu.trail = game.cpu.trail.filter(point => {
            point.life -= 0.08;
            return point.life > 0;
        });
        
        // Enhanced CPU AI that tracks closest ball
        let closestBall = game.balls[0];
        let closestDistance = Infinity;
        
        game.balls.forEach(ball => {
            const distance = Math.abs(ball.x - game.cpu.x);
            if (distance < closestDistance && ball.vx > 0) {
                closestDistance = distance;
                closestBall = ball;
            }
        });
        
        if (closestBall) {
            const cpuCenter = game.cpu.y + game.cpu.height / 2;
            const ballCenter = closestBall.y;
            const diff = ballCenter - cpuCenter;
            const cpuSpeed = game.cpu.speed * (1 + game.speedMultiplier * 0.08);
            
            if (Math.abs(diff) > 12) {
                if (diff > 0 && game.cpu.y < canvas.height - game.cpu.height) {
                    game.cpu.y += cpuSpeed;
                    game.cpu.trail.push({
                        x: game.cpu.x + game.cpu.width / 2,
                        y: game.cpu.y + game.cpu.height / 2,
                        life: 1
                    });
                } else if (diff < 0 && game.cpu.y > 0) {
                    game.cpu.y -= cpuSpeed;
                    game.cpu.trail.push({
                        x: game.cpu.x + game.cpu.width / 2,
                        y: game.cpu.y + game.cpu.height / 2,
                        life: 1
                    });
                }
            }
        }
        
        // Update all balls
        game.balls.forEach((ball, ballIndex) => {
            // Update ball glow
            ball.glow += ball.glowDirection * 0.12;
            if (ball.glow >= 1 || ball.glow <= 0) {
                ball.glowDirection *= -1;
            }
            
            // Apply speed multiplier
            const currentVX = ball.vx * game.speedMultiplier;
            const currentVY = ball.vy * game.speedMultiplier;
            
            // Ball movement
            ball.x += currentVX;
            ball.y += currentVY;
            
            // Add trail
            ball.trail.push({
                x: ball.x,
                y: ball.y,
                life: 1
            });
            
            // Limit trail length
            if (ball.trail.length > 12) {
                ball.trail.shift();
            }
            
            // Update trail
            ball.trail = ball.trail.filter(point => {
                point.life -= 0.12;
                return point.life > 0;
            });
            
            // Ball collision with top/bottom walls
            if (ball.y <= ball.radius || ball.y >= canvas.height - ball.radius) {
                ball.vy = -ball.vy;
                // Create particles
                for (let i = 0; i < 3; i++) {
                    game.particles.push({
                        x: ball.x,
                        y: ball.y,
                        vx: (Math.random() - 0.5) * 8,
                        vy: (Math.random() - 0.5) * 8,
                        life: 1,
                        decay: 0.03,
                        size: 2 + Math.random() * 2,
                        color: '#3498db'
                    });
                }
                pongSounds.wallBounce(); // 🔊 Wall bounce sound
            }
            
            // Ball collision with player paddle
            if (ball.x - ball.radius <= game.player.x + game.player.width &&
                ball.x + ball.radius >= game.player.x &&
                ball.y >= game.player.y &&
                ball.y <= game.player.y + game.player.height) {
                
                ball.vx = Math.abs(ball.vx);
                const hitPos = (ball.y - game.player.y) / game.player.height;
                ball.vy = (hitPos - 0.5) * 10;
                
                // Create particles
                for (let i = 0; i < 5; i++) {
                    game.particles.push({
                        x: ball.x,
                        y: ball.y,
                        vx: (Math.random() - 0.5) * 10,
                        vy: (Math.random() - 0.5) * 10,
                        life: 1,
                        decay: 0.03,
                        size: 2 + Math.random() * 3,
                        color: '#3498db'
                    });
                }
                pongSounds.paddleHit(); // 🔊 Player paddle hit sound
            }
            
            // Ball collision with CPU paddle
            if (ball.x + ball.radius >= game.cpu.x &&
                ball.x - ball.radius <= game.cpu.x + game.cpu.width &&
                ball.y >= game.cpu.y &&
                ball.y <= game.cpu.y + game.cpu.height) {
                
                ball.vx = -Math.abs(ball.vx);
                const hitPos = (ball.y - game.cpu.y) / game.cpu.height;
                ball.vy = (hitPos - 0.5) * 10;
                
                // Create particles
                for (let i = 0; i < 5; i++) {
                    game.particles.push({
                        x: ball.x,
                        y: ball.y,
                        vx: (Math.random() - 0.5) * 10,
                        vy: (Math.random() - 0.5) * 10,
                        life: 1,
                        decay: 0.03,
                        size: 2 + Math.random() * 3,
                        color: '#e74c3c'
                    });
                }
                pongSounds.paddleHit(); // 🔊 CPU paddle hit sound
            }
            
            // Scoring
            if (ball.x < -ball.radius) {
                game.cpu.score++;
                
                // Create scoring particles
                for (let i = 0; i < 8; i++) {
                    game.particles.push({
                        x: 0,
                        y: ball.y,
                        vx: Math.random() * 5,
                        vy: (Math.random() - 0.5) * 10,
                        life: 1,
                        decay: 0.02,
                        size: 3 + Math.random() * 4,
                        color: '#e74c3c'
                    });
                }
                
                pongSounds.score(); // 🔊 Score sound
                updateHeroSectionScore();
                
                if (game.balls.length > 1) {
                    game.balls.splice(ballIndex, 1);
                } else {
                    resetHeroSectionBall();
                    if (!checkHeroSectionGameEnd()) {
                        updateHeroSectionMessage(t('game.pong.fizScores'));
                        setTimeout(() => updateHeroSectionMessage(''), 1500);
                    }
                }
            } else if (ball.x > canvas.width + ball.radius) {
                game.player.score++;
                
                // Create scoring particles
                for (let i = 0; i < 8; i++) {
                    game.particles.push({
                        x: canvas.width,
                        y: ball.y,
                        vx: -Math.random() * 5,
                        vy: (Math.random() - 0.5) * 10,
                        life: 1,
                        decay: 0.02,
                        size: 3 + Math.random() * 4,
                        color: '#3498db'
                    });
                }
                
                pongSounds.score(); // 🔊 Score sound
                updateHeroSectionScore();
                
                if (game.balls.length > 1) {
                    game.balls.splice(ballIndex, 1);
                } else {
                    resetHeroSectionBall();
                    if (!checkHeroSectionGameEnd()) {
                        updateHeroSectionMessage(t('game.pong.youScore'));
                        setTimeout(() => updateHeroSectionMessage(''), 1500);
                    }
                }
            }
            
            // Speed limit
            ball.vx = Math.max(-ball.maxSpeed, Math.min(ball.maxSpeed, ball.vx));
            ball.vy = Math.max(-ball.maxSpeed, Math.min(ball.maxSpeed, ball.vy));
        });
        
        // Update particles
        game.particles = game.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            particle.life -= particle.decay;
            return particle.life > 0;
        });
    }
    
    function renderHeroSection() {
        // Clear canvas completely transparent
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw animated center line
        const lineOffset = Math.sin(Date.now() * 0.003) * 2;
        ctx.setLineDash([15, 10]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 4;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + lineOffset, 0);
        ctx.lineTo(canvas.width / 2 + lineOffset, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.shadowBlur = 0;
        
        // Draw paddle trails
        function drawHeroTrail(trail, color) {
            trail.forEach((point) => {
                ctx.save();
                ctx.globalAlpha = point.life * 0.4;
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(point.x, point.y, 3 * point.life, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        }
        
        drawHeroTrail(game.player.trail, '#3498db');
        drawHeroTrail(game.cpu.trail, '#e74c3c');
        
        // Draw enhanced player paddle
        ctx.save();
        const playerGlow = 12 + game.player.glow * 8;
        ctx.shadowBlur = playerGlow;
        ctx.shadowColor = '#3498db';
        
        const playerGradient = ctx.createLinearGradient(
            game.player.x, game.player.y, 
            game.player.x + game.player.width, game.player.y + game.player.height
        );
        playerGradient.addColorStop(0, '#5dade2');
        playerGradient.addColorStop(0.5, '#3498db');
        playerGradient.addColorStop(1, '#2980b9');
        
        ctx.fillStyle = playerGradient;
        ctx.fillRect(game.player.x, game.player.y, game.player.width, game.player.height);
        
        // Player border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.strokeRect(game.player.x, game.player.y, game.player.width, game.player.height);
        ctx.restore();
        
        // Draw player label with glow
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#3498db';
        ctx.fillText(t('game.pong.playerLabel'), game.player.x + game.player.width / 2, game.player.y - 12);
        ctx.restore();
        
        // Draw enhanced CPU paddle
        ctx.save();
        const cpuGlow = 12 + game.cpu.glow * 8;
        ctx.shadowBlur = cpuGlow;
        ctx.shadowColor = '#e74c3c';
        
        if (cpuImage.complete) {
            // Create rounded rectangle clipping path
            ctx.beginPath();
            ctx.roundRect(game.cpu.x, game.cpu.y, game.cpu.width, game.cpu.height, 6);
            ctx.clip();
            
            // Draw the image scaled to fit
            const aspectRatio = cpuImage.width / cpuImage.height;
            const paddleAspectRatio = game.cpu.width / game.cpu.height;
            
            let drawWidth, drawHeight, drawX, drawY;
            
            if (aspectRatio > paddleAspectRatio) {
                drawHeight = game.cpu.height;
                drawWidth = drawHeight * aspectRatio;
                drawX = game.cpu.x - (drawWidth - game.cpu.width) / 2;
                drawY = game.cpu.y;
            } else {
                drawWidth = game.cpu.width;
                drawHeight = drawWidth / aspectRatio;
                drawX = game.cpu.x;
                drawY = game.cpu.y - (drawHeight - game.cpu.height) / 2;
            }
            
            ctx.drawImage(cpuImage, drawX, drawY, drawWidth, drawHeight);
            ctx.restore();
            
            // Draw animated border
            ctx.save();
            ctx.strokeStyle = '#e74c3c';
            ctx.lineWidth = 3 + Math.sin(Date.now() * 0.008) * 1;
            ctx.shadowBlur = cpuGlow;
            ctx.shadowColor = '#e74c3c';
            ctx.strokeRect(game.cpu.x, game.cpu.y, game.cpu.width, game.cpu.height);
            ctx.restore();
        } else {
            // Fallback gradient
            const cpuGradient = ctx.createLinearGradient(
                game.cpu.x, game.cpu.y, 
                game.cpu.x + game.cpu.width, game.cpu.y + game.cpu.height
            );
            cpuGradient.addColorStop(0, '#ec7063');
            cpuGradient.addColorStop(0.5, '#e74c3c');
            cpuGradient.addColorStop(1, '#c0392b');
            
            ctx.fillStyle = cpuGradient;
            ctx.fillRect(game.cpu.x, game.cpu.y, game.cpu.width, game.cpu.height);
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 2;
            ctx.strokeRect(game.cpu.x, game.cpu.y, game.cpu.width, game.cpu.height);
        }
        ctx.restore();
        
        // Draw CPU label with glow
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#e74c3c';
        ctx.fillText(t('game.pong.fizLabel'), game.cpu.x + game.cpu.width / 2, game.cpu.y - 12);
        ctx.restore();
        
        // Draw all balls with enhanced effects
        game.balls.forEach(ball => {
            // Draw ball trail
            ball.trail.forEach((point) => {
                ctx.save();
                ctx.globalAlpha = point.life * 0.6;
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(point.x, point.y, ball.radius * point.life * 0.9, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            
            // Draw main ball with dynamic glow
            ctx.save();
            const ballGlow = 20 + ball.glow * 15;
            ctx.shadowBlur = ballGlow;
            ctx.shadowColor = 'white';
            
            // Outer glow ring
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius + 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Main ball with radial gradient
            const ballGradient = ctx.createRadialGradient(
                ball.x - ball.radius * 0.4, ball.y - ball.radius * 0.4, 0,
                ball.x, ball.y, ball.radius
            );
            ballGradient.addColorStop(0, '#ffffff');
            ballGradient.addColorStop(0.6, '#f8f9fa');
            ballGradient.addColorStop(1, '#dee2e6');
            
            ctx.fillStyle = ballGradient;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Highlight spot
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(ball.x - ball.radius * 0.4, ball.y - ball.radius * 0.4, ball.radius * 0.4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        });
        
        // Render particles
        game.particles.forEach(particle => {
            ctx.save();
            ctx.globalAlpha = particle.life;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
        
        // Display enhanced game info with better positioning
        if (window.heroSectionGameStarted) {
            const gameTime = Math.floor((Date.now() - game.startTime) / 1000);
            const speed = game.speedMultiplier.toFixed(1);
            
            ctx.save();
            ctx.textAlign = 'center';
            ctx.shadowBlur = 3;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            
            // Main game stats - positioned at top center
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.font = 'bold 14px Inter';
            ctx.fillText(`⏱️ ${gameTime}s | ⚡ ${speed}x | 🏐 ${game.balls.length}`, canvas.width / 2, 25);
            
            // Special effects indicators - positioned below stats with proper spacing
            let yOffset = 50; // Start below the main stats
            
            if (game.speedMultiplier > 1.5) {
                ctx.fillStyle = '#f39c12';
                ctx.font = 'bold 12px Inter';
                ctx.fillText('🔥 SPEED MODE ACTIVATED 🔥', canvas.width / 2, yOffset);
                yOffset += 20; // Add spacing for next element
            }
            
            if (game.balls.length > 1) {
                ctx.fillStyle = '#e74c3c';
                ctx.font = 'bold 12px Inter';
                ctx.fillText('⚡ MULTI-BALL CHAOS ⚡', canvas.width / 2, yOffset);
            }
            
            ctx.restore();
        }
    }
    
    function heroSectionGameLoop() {
        if (!window.heroSectionGameActive) return;
        
        updateHeroSection();
        renderHeroSection();
        
        window.heroSectionAnimationId = requestAnimationFrame(heroSectionGameLoop);
    }
    
    // Start the game loop
    heroSectionGameLoop();
}
