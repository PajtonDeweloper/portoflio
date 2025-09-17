// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollIndicator = document.querySelector('.scroll-indicator');
const skillBars = document.querySelectorAll('.skill-progress');
const statNumbers = document.querySelectorAll('.stat-number');
// Contact form removed

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll indicators functionality - wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.scroll-indicator').forEach(indicator => {
        indicator.addEventListener('click', function() {
            const currentSection = this.closest('section');
            const nextSection = currentSection.nextElementSibling;
            
            if (nextSection && nextSection.tagName === 'SECTION') {
                const offsetTop = nextSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger skill bar animations
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
            
            // Trigger counter animations
            if (entry.target.classList.contains('about')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Skill bars animation
function animateSkillBars() {
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }, index * 200);
    });
}

// Counter animation
function animateCounters() {
    statNumbers.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
});

// Subtle fade-in animation for hero elements
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero-title > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
    
    // Tech icons orbit behind profile - no hover effects needed for realistic orbit
    const techIcons = document.querySelectorAll('.tech-icon');
    // Icons will orbit naturally behind the profile image
});

// Portfolio item hover effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact form removed - no longer needed

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Smooth reveal animations for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.skill-category, .portfolio-item, .contact-card, .text-block');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('reveal');
        }
    });
}

// Add floating shapes to skills and process sections
function addFloatingShapesToSection(sectionClass, backgroundClass) {
    const section = document.querySelector(`.${sectionClass}`);
    if (!section) return;
    
    const background = section.querySelector(`.${backgroundClass}`);
    if (!background) return;
    
    const shapesContainer = background.querySelector('.floating-shapes');
    if (!shapesContainer) return;
    
    // The shapes are already in HTML, just ensure they have proper styling
    const shapes = shapesContainer.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.5}s`;
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add reveal styles
const revealStyles = document.createElement('style');
revealStyles.textContent = `
    .skill-category,
    .portfolio-item,
    .contact-card,
    .text-block {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .skill-category.reveal,
    .portfolio-item.reveal,
    .contact-card.reveal,
    .text-block.reveal {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(revealStyles);

// Particle effect for hero section
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    const hero = document.querySelector('.hero');
    hero.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.5);
            border-radius: 50%;
            animation: float-particle ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
}

// Add particle animation styles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Initialize particles and floating shapes
window.addEventListener('load', () => {
    createParticles();
    addFloatingShapesToSection('skills', 'skills-background');
    addFloatingShapesToSection('process', 'process-background');
});

// Cursor trail effect removed per user request

// Prevent auto-scroll on page load/refresh
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Force scroll to top on page load
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Initialize all animations on page load
window.addEventListener('load', () => {
    // Force scroll to top immediately
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
    
    // Trigger initial reveal check
    revealOnScroll();
    
    // Add loading complete class to body
    document.body.classList.add('loaded');
    
    // Initialize active nav link
    updateActiveNavLink();
    
    // Re-initialize scroll indicators after page load
    document.querySelectorAll('.scroll-indicator').forEach(indicator => {
        indicator.addEventListener('click', function() {
            const currentSection = this.closest('section');
            const nextSection = currentSection.nextElementSibling;
            
            if (nextSection && nextSection.tagName === 'SECTION') {
                const offsetTop = nextSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Also handle DOMContentLoaded to catch early scroll issues
document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
});

// Additional scroll prevention on page show (handles back/forward navigation)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        window.scrollTo(0, 0);
    }
});

// Immediate scroll reset
window.scrollTo(0, 0);

// Resize handler
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    updateActiveNavLink();
    revealOnScroll();
}, 16)); // ~60fps

// Typewriter Animation for Code Block
function initTypewriterAnimation() {
    const codeContainer = document.getElementById('typewriter-code');
    const cursor = codeContainer.querySelector('.typing-cursor');
    
    // Code content with syntax highlighting structure
    const codeLines = [
        {
            content: "const developer = {",
            tokens: [
                { text: "const", class: "keyword" },
                { text: " ", class: "" },
                { text: "developer", class: "variable" },
                { text: " = {", class: "" }
            ]
        },
        {
            content: "  name: 'Marsel Cylkowski',",
            tokens: [
                { text: "  ", class: "" },
                { text: "name", class: "property" },
                { text: ": ", class: "" },
                { text: "'Marsel Cylkowski'", class: "string" },
                { text: ",", class: "" }
            ]
        },
        {
            content: "  specialty: 'One-Page Websites',",
            tokens: [
                { text: "  ", class: "" },
                { text: "specialty", class: "property" },
                { text: ": ", class: "" },
                { text: "'One-Page Websites'", class: "string" },
                { text: ",", class: "" }
            ]
        },
        {
            content: "  aiPowered: true",
            tokens: [
                { text: "  ", class: "" },
                { text: "aiPowered", class: "property" },
                { text: ": ", class: "" },
                { text: "true", class: "boolean" }
            ]
        },
        {
            content: "};",
            tokens: [
                { text: "};", class: "" }
            ]
        }
    ];
    
    // Clear existing content and set up for typing
    codeContainer.innerHTML = '';
    
    let lineIndex = 0;
    let tokenIndex = 0;
    let charIndex = 0;
    let currentLineElement = null;
    let currentTokenElement = null;
    
    function typeCharacter() {
        if (lineIndex < codeLines.length) {
            const currentLine = codeLines[lineIndex];
            
            // Create new line element if needed
            if (tokenIndex === 0 && charIndex === 0) {
                currentLineElement = document.createElement('div');
                currentLineElement.className = 'code-line';
                currentLineElement.innerHTML = `
                    <span class="line-number">${lineIndex + 1}</span>
                    <span class="code-text"></span>
                `;
                codeContainer.appendChild(currentLineElement);
            }
            
            if (tokenIndex < currentLine.tokens.length) {
                const currentToken = currentLine.tokens[tokenIndex];
                const codeTextSpan = currentLineElement.querySelector('.code-text');
                
                // Create token element if needed
                if (charIndex === 0) {
                    currentTokenElement = document.createElement('span');
                    if (currentToken.class) {
                        currentTokenElement.className = currentToken.class;
                    }
                    codeTextSpan.appendChild(currentTokenElement);
                }
                
                if (charIndex < currentToken.text.length) {
                    // Add next character to current token
                    const char = currentToken.text[charIndex];
                    currentTokenElement.textContent += char;
                    charIndex++;
                    
                    // Continue typing with random delay for realistic effect
                    setTimeout(typeCharacter, Math.random() * 80 + 30);
                } else {
                    // Move to next token
                    tokenIndex++;
                    charIndex = 0;
                    setTimeout(typeCharacter, 50);
                }
            } else {
                // Move to next line
                lineIndex++;
                tokenIndex = 0;
                charIndex = 0;
                
                // Add line break delay
                setTimeout(typeCharacter, 400);
            }
        } else {
            // Animation completed
            console.log('Typewriter animation completed');
        }
    }
    
    // Start animation when about section comes into view
    const aboutSection = document.getElementById('about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeCharacter, 800); // Start typing with delay
                observer.unobserve(entry.target); // Run only once
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of about section is visible
    
    observer.observe(aboutSection);
}

// Initialize typewriter animation when DOM is loaded
document.addEventListener('DOMContentLoaded', initTypewriterAnimation);
