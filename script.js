// Navigation
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Set active nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// Mobile menu toggle
mobileMenuBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container') && navLinks?.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Home Page Countdown Timer
if (document.querySelector('.countdown-container')) {
    const weddingDate = new Date('September 5, 2026 16:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            document.querySelector('.countdown-container').innerHTML = 
                '<div class="countdown-complete">We\'re Married!</div>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Realistic Church Bell Interaction
function initializeChurchBell() {
    const bellAssembly = document.querySelector('.bell-assembly');
    const clapper = document.querySelector('.clapper');
    const bellScene = document.querySelector('.bell-scene');
    const bellBody = document.querySelector('.bell-body');
    
    if (!bellAssembly) return;
    
    // Store original animations
    const originalBellAnim = bellAssembly.style.animation;
    const originalClapperAnim = clapper.style.animation;
    
    // Create sound pool for realistic audio
    const bellSounds = [
        'https://assets.mixkit.co/sfx/preview/mixkit-big-church-bell-announcement-746.mp3',
        'https://assets.mixkit.co/sfx/preview/mixkit-church-bell-toll-599.mp3',
        'https://assets.mixkit.co/sfx/preview/mixkit-church-bell-ding-570.mp3'
    ];
    
    let currentSoundIndex = 0;
    
    // Preload audio
    const audioElements = bellSounds.map(src => {
        const audio = new Audio(src);
        audio.preload = 'auto';
        return audio;
    });
    
    // Click to ring the bell
    bellAssembly.addEventListener('click', function(e) {
        e.stopPropagation();
        ringBell();
    });
    
    // Also allow clicking on bell body
    bellBody.addEventListener('click', function(e) {
        e.stopPropagation();
        ringBell();
    });
    
    function ringBell() {
        // Stop current animations
        bellAssembly.style.animation = 'none';
        clapper.style.animation = 'none';
        
        // Force reflow
        void bellAssembly.offsetWidth;
        void clapper.offsetWidth;
        
        // Add intensive ringing effects
        bellAssembly.classList.add('ringing', 'vibrating');
        clapper.classList.add('hitting');
        bellScene.classList.add('active');
        
        // Create multiple sound waves
        createSoundWaves();
        
        // Add visual impact effect
        createVisualImpact();
        
        // Play realistic church bell sound
        playChurchBellSound();
        
        // Gradually fade out effects
        setTimeout(() => {
            clapper.classList.remove('hitting');
            bellScene.classList.remove('active');
        }, 300);
        
        setTimeout(() => {
            bellAssembly.classList.remove('vibrating');
        }, 1500);
        
        setTimeout(() => {
            bellAssembly.classList.remove('ringing');
            
            // Restore gentle swinging animation
            setTimeout(() => {
                bellAssembly.style.animation = originalBellAnim;
                clapper.style.animation = originalClapperAnim;
            }, 100);
        }, 2000);
    }
    
    function createSoundWaves() {
        const waveCount = 5;
        const waveDelay = 150;
        
        for (let i = 0; i < waveCount; i++) {
            setTimeout(() => {
                const wave = document.createElement('div');
                wave.className = 'sound-wave';
                wave.style.animationDelay = `${i * 0.2}s`;
                bellScene.appendChild(wave);
                
                // Remove after animation
                setTimeout(() => {
                    if (wave.parentNode) {
                        wave.parentNode.removeChild(wave);
                    }
                }, 2000);
            }, i * waveDelay);
        }
    }
    
    function createVisualImpact() {
        // Add a flash of light on the bell
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 2;
            animation: flashEffect 0.3s ease-out;
        `;
        
        // Add flash animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes flashEffect {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }
            }
        `;
        document.head.appendChild(style);
        
        bellScene.appendChild(flash);
        
        // Remove flash element
        setTimeout(() => {
            if (flash.parentNode) {
                flash.parentNode.removeChild(flash);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 300);
    }
    
    function playChurchBellSound() {
        // Cycle through different bell sounds
        const audio = audioElements[currentSoundIndex];
        
        // Reset audio if it's still playing
        audio.currentTime = 0;
        
        // Play with realistic volume
        audio.volume = 0.8;
        
        // Add slight random pitch variation for realism
        audio.playbackRate = 0.9 + Math.random() * 0.2;
        
        audio.play().catch(e => {
            console.log('Audio play failed:', e);
            // Fallback to simpler sound if needed
            const fallbackAudio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-bell-notification-933.mp3');
            fallbackAudio.volume = 0.7;
            fallbackAudio.play();
        });
        
        // Move to next sound for next ring
        currentSoundIndex = (currentSoundIndex + 1) % audioElements.length;
    }
    
    // Hover effects for realism
    bellAssembly.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(-50%) scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
        
        // Enhance shine on hover
        const shine = document.querySelector('.bell-shine');
        const highlight = document.querySelector('.bell-highlight');
        
        if (shine) shine.style.opacity = '0.4';
        if (highlight) highlight.style.opacity = '0.3';
    });
    
    bellAssembly.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(-50%) scale(1)';
        
        // Reset shine
        const shine = document.querySelector('.bell-shine');
        const highlight = document.querySelector('.bell-highlight');
        
        if (shine) shine.style.opacity = '0.3';
        if (highlight) highlight.style.opacity = '0.2';
    });
    
    // Add subtle mouse move parallax effect
    bellScene.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
        
        bellAssembly.style.transform = `translateX(-50%) rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    
    bellScene.addEventListener('mouseleave', function() {
        bellAssembly.style.transform = 'translateX(-50%)';
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeChurchBell();
    
    // Add some initial sound waves for visual interest
    setTimeout(() => {
        const bellScene = document.querySelector('.bell-scene');
        if (bellScene) {
            for (let i = 0; i < 3; i++) {
                const wave = document.createElement('div');
                wave.className = 'sound-wave';
                wave.style.animationDelay = `${i * 0.5}s`;
                bellScene.appendChild(wave);
                
                setTimeout(() => {
                    if (wave.parentNode) {
                        wave.parentNode.removeChild(wave);
                    }
                }, 2000);
            }
        }
    }, 1000);
});
// RSVP Form Submission
const rsvpForm = document.getElementById('rsvpForm');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // For Google Apps Script backend
        const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL'; // Replace with your script URL
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Send to Google Sheets via Apps Script
        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            // Success message
            alert('Thank you for your RSVP! We look forward to celebrating with you.');
            rsvpForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your RSVP. Please try again.');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Message Submission
const messageForm = document.getElementById('messageForm');
if (messageForm) {
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const message = formData.get('message');
        
        // Create message element
        const messagesGrid = document.querySelector('.messages-grid');
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';
        messageCard.innerHTML = `
            <div class="message-author">${name}</div>
            <div class="message-date">Just now</div>
            <p>${message}</p>
        `;
        
        // Add to beginning of grid
        messagesGrid.prepend(messageCard);
        
        // Reset form
        this.reset();
        
        // Show success message
        alert('Thank you for your message!');
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
