/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2025 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
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
    const ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 8,
        speedX: 4,
        speedY: 3,
        maxSpeed: 8
    };
    
    const playerPaddle = {
        x: 10,
        y: canvas.height / 2 - 40,
        width: 8,
        height: 80,
        speed: 6
    };
    
    const cpuPaddle = {
        x: canvas.width - 18,
        y: canvas.height / 2 - 40,
        width: 8,
        height: 80,
        speed: 4
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
            z-index: 10;
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
            z-index: 11;
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
        resetBall();
        updateGameMessage('');
        document.querySelector('.game-over-screen').style.display = 'none';
    }
    
    function resetGame() {
        playerScore = 0;
        cpuScore = 0;
        updateScore();
        resetBall();
        gameStarted = false;
    }
    
    function resetBall() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speedX = (Math.random() > 0.5 ? 1 : -1) * 4;
        ball.speedY = (Math.random() > 0.5 ? 1 : -1) * 3;
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
        
        // Player input
        if ((keys['w'] || keys['ArrowUp']) && playerPaddle.y > 0) {
            playerPaddle.y -= playerPaddle.speed;
        }
        if ((keys['s'] || keys['ArrowDown']) && playerPaddle.y < canvas.height - playerPaddle.height) {
            playerPaddle.y += playerPaddle.speed;
        }
        
        // CPU AI (follows ball with some delay)
        const cpuCenter = cpuPaddle.y + cpuPaddle.height / 2;
        const ballCenter = ball.y;
        
        if (cpuCenter < ballCenter - 10) {
            cpuPaddle.y += cpuPaddle.speed;
        } else if (cpuCenter > ballCenter + 10) {
            cpuPaddle.y -= cpuPaddle.speed;
        }
        
        // Keep CPU paddle in bounds
        cpuPaddle.y = Math.max(0, Math.min(canvas.height - cpuPaddle.height, cpuPaddle.y));
        
        // Ball movement
        ball.x += ball.speedX;
        ball.y += ball.speedY;
        
        // Ball collision with top/bottom walls
        if (ball.y <= ball.radius || ball.y >= canvas.height - ball.radius) {
            ball.speedY = -ball.speedY;
        }
        
        // Ball collision with paddles
        if (ball.x - ball.radius <= playerPaddle.x + playerPaddle.width &&
            ball.y >= playerPaddle.y &&
            ball.y <= playerPaddle.y + playerPaddle.height &&
            ball.speedX < 0) {
            
            ball.speedX = -ball.speedX;
            ball.speedY += (ball.y - (playerPaddle.y + playerPaddle.height / 2)) * 0.1;
            ball.speedX = Math.min(ball.maxSpeed, Math.abs(ball.speedX)) * Math.sign(ball.speedX);
        }
        
        if (ball.x + ball.radius >= cpuPaddle.x &&
            ball.y >= cpuPaddle.y &&
            ball.y <= cpuPaddle.y + cpuPaddle.height &&
            ball.speedX > 0) {
            
            ball.speedX = -ball.speedX;
            ball.speedY += (ball.y - (cpuPaddle.y + cpuPaddle.height / 2)) * 0.1;
            ball.speedX = -Math.min(ball.maxSpeed, Math.abs(ball.speedX));
        }
        
        // Ball out of bounds (scoring)
        if (ball.x < 0) {
            cpuScore++;
            updateScore();
            checkGameEnd();
            if (gameStarted) resetBall();
        } else if (ball.x > canvas.width) {
            playerScore++;
            updateScore();
            checkGameEnd();
            if (gameStarted) resetBall();
        }
    }
    
    function checkGameEnd() {
        if (playerScore >= maxScore || cpuScore >= maxScore) {
            gameStarted = false;
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
        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw center line
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw player paddle
        ctx.fillStyle = '#3498db';
        ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
        
        // Draw CPU paddle with your photo
        if (cpuImageLoaded) {
            ctx.save();
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
            
            // Add a border
            ctx.strokeStyle = '#e74c3c';
            ctx.lineWidth = 2;
            ctx.strokeRect(cpuPaddle.x, cpuPaddle.y, cpuPaddle.width, cpuPaddle.height);
        } else {
            // Fallback if image isn't loaded
            ctx.fillStyle = '#e74c3c';
            ctx.fillRect(cpuPaddle.x, cpuPaddle.y, cpuPaddle.width, cpuPaddle.height);
        }
        
        // Draw ball
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add ball glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#fff';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
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
        ball: {
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: 6,
            vy: 3,
            radius: 12,
            maxSpeed: 10
        },
        player: {
            x: 20, // Left edge
            y: canvas.height / 2 - 60,
            width: 15,
            height: 120,
            speed: 7,
            score: 0
        },
        cpu: {
            x: canvas.width - 35, // Right edge
            y: canvas.height / 2 - 60,
            width: 15,
            height: 120,
            speed: 5,
            score: 0
        },
        keys: {
            up: false,
            down: false
        }
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
            updateHeroSectionMessage(t('game.pong.gameStarted'));
            setTimeout(() => updateHeroSectionMessage(''), 1000);
        } else if (window.heroSectionGameStarted && !window.heroSectionGameActive) {
            // Game has ended, restart it
            console.log('Restarting hero section game');
            game.player.score = 0;
            game.cpu.score = 0;
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
        game.ball.x = canvas.width / 2;
        game.ball.y = canvas.height / 2;
        game.ball.vx = (Math.random() > 0.5 ? 1 : -1) * 6;
        game.ball.vy = (Math.random() - 0.5) * 6;
    }
    
    function checkHeroSectionGameEnd() {
        if (game.player.score >= 5) {
            updateHeroSectionMessage(t('game.pong.youWin'));
            window.heroSectionGameActive = false;
            return true;
        } else if (game.cpu.score >= 5) {
            updateHeroSectionMessage(t('game.pong.fizWins'));
            window.heroSectionGameActive = false;
            return true;
        }
        return false;
    }
    
    function updateHeroSection() {
        if (!window.heroSectionGameActive || !window.heroSectionGameStarted) return;
        
        // Player movement
        if (game.keys.up && game.player.y > 0) {
            game.player.y -= game.player.speed;
        }
        if (game.keys.down && game.player.y < canvas.height - game.player.height) {
            game.player.y += game.player.speed;
        }
        
        // CPU AI - follows ball but with some lag
        const cpuCenter = game.cpu.y + game.cpu.height / 2;
        const ballCenter = game.ball.y;
        const diff = ballCenter - cpuCenter;
        
        if (Math.abs(diff) > 8) {
            if (diff > 0 && game.cpu.y < canvas.height - game.cpu.height) {
                game.cpu.y += game.cpu.speed;
            } else if (diff < 0 && game.cpu.y > 0) {
                game.cpu.y -= game.cpu.speed;
            }
        }
        
        // Ball movement
        game.ball.x += game.ball.vx;
        game.ball.y += game.ball.vy;
        
        // Ball collision with top/bottom walls
        if (game.ball.y <= game.ball.radius || game.ball.y >= canvas.height - game.ball.radius) {
            game.ball.vy = -game.ball.vy;
        }
        
        // Ball collision with player paddle
        if (game.ball.x - game.ball.radius <= game.player.x + game.player.width &&
            game.ball.x + game.ball.radius >= game.player.x &&
            game.ball.y >= game.player.y &&
            game.ball.y <= game.player.y + game.player.height) {
            
            game.ball.vx = Math.abs(game.ball.vx);
            const hitPos = (game.ball.y - game.player.y) / game.player.height;
            game.ball.vy = (hitPos - 0.5) * 8;
        }
        
        // Ball collision with CPU paddle
        if (game.ball.x + game.ball.radius >= game.cpu.x &&
            game.ball.x - game.ball.radius <= game.cpu.x + game.cpu.width &&
            game.ball.y >= game.cpu.y &&
            game.ball.y <= game.cpu.y + game.cpu.height) {
            
            game.ball.vx = -Math.abs(game.ball.vx);
            const hitPos = (game.ball.y - game.cpu.y) / game.cpu.height;
            game.ball.vy = (hitPos - 0.5) * 8;
        }
        
        // Scoring
        if (game.ball.x < 0) {
            game.cpu.score++;
            updateHeroSectionScore();
            resetHeroSectionBall();
            if (!checkHeroSectionGameEnd()) {
                updateHeroSectionMessage(t('game.pong.fizScores'));
                setTimeout(() => updateHeroSectionMessage(''), 1500);
            }
        } else if (game.ball.x > canvas.width) {
            game.player.score++;
            updateHeroSectionScore();
            resetHeroSectionBall();
            if (!checkHeroSectionGameEnd()) {
                updateHeroSectionMessage(t('game.pong.youScore'));
                setTimeout(() => updateHeroSectionMessage(''), 1500);
            }
        }
        
        // Speed limit
        game.ball.vx = Math.max(-game.ball.maxSpeed, Math.min(game.ball.maxSpeed, game.ball.vx));
        game.ball.vy = Math.max(-game.ball.maxSpeed, Math.min(game.ball.maxSpeed, game.ball.vy));
    }
    
    function renderHeroSection() {
        // Clear canvas (fully transparent)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw center line
        ctx.setLineDash([15, 10]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw player paddle
        ctx.fillStyle = '#3498db';
        ctx.fillRect(game.player.x, game.player.y, game.player.width, game.player.height);
        
        // Draw player label
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(t('game.pong.playerLabel'), game.player.x + game.player.width / 2, game.player.y - 8);
        
        // Draw CPU paddle with user's image
        if (cpuImage.complete) {
            // Create circular clipping path
            ctx.save();
            ctx.beginPath();
            ctx.arc(game.cpu.x + game.cpu.width / 2, game.cpu.y + game.cpu.height / 2, 
                   Math.min(game.cpu.width, game.cpu.height) / 2, 0, Math.PI * 2);
            ctx.clip();
            
            // Draw the image
            ctx.drawImage(cpuImage, 
                         game.cpu.x, game.cpu.y, 
                         game.cpu.width, game.cpu.height);
            ctx.restore();
            
            // Draw border around CPU paddle
            ctx.strokeStyle = '#e74c3c';
            ctx.lineWidth = 2;
            ctx.strokeRect(game.cpu.x, game.cpu.y, game.cpu.width, game.cpu.height);
        } else {
            // Fallback if image not loaded
            ctx.fillStyle = '#e74c3c';
            ctx.fillRect(game.cpu.x, game.cpu.y, game.cpu.width, game.cpu.height);
        }
        
        // Draw CPU label
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(t('game.pong.fizLabel'), game.cpu.x + game.cpu.width / 2, game.cpu.y - 8);
        
        // Draw ball
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(game.ball.x, game.ball.y, game.ball.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add ball trail effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(game.ball.x - game.ball.vx * 1.5, game.ball.y - game.ball.vy * 1.5, game.ball.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
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
