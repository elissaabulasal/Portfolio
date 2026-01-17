// ===== Website Weaver - Main JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initCursorGlow();
    initNavigation();
    initScrollAnimations();
    initHeroAnimations();
    initParallaxEffects();
    initSmoothScroll();
    initModal();
});

// ===== Cursor Glow Effect =====
function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    
    if (!cursorGlow || window.matchMedia('(max-width: 768px)').matches) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        const ease = 0.1;
        currentX += (mouseX - currentX) * ease;
        currentY += (mouseY - currentY) * ease;
        
        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// ===== Navigation =====
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // Scroll behavior for nav
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
        
        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll(
        '.section-header, .about-card, .about-visual, .service-card, ' +
        '.project-card, .process-step, .pricing-card, .pricing-custom, ' +
        '.cta-content, .footer-content'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                const parent = entry.target.parentElement;
                if (parent && (parent.classList.contains('services-grid') || 
                    parent.classList.contains('projects-grid') ||
                    parent.classList.contains('pricing-grid') ||
                    parent.classList.contains('process-timeline'))) {
                    const siblings = Array.from(parent.children);
                    const itemIndex = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${itemIndex * 0.1}s`;
                }
                
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

// ===== Hero Animations =====
function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero .animate-in');
    
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 200 + (index * 150));
    });
    
    // Parallax effect on hero shapes based on mouse position
    const heroShapes = document.querySelector('.hero-shapes');
    const shapes = document.querySelectorAll('.shape');
    
    if (heroShapes && !window.matchMedia('(max-width: 768px)').matches) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 50;
            const y = (e.clientY - window.innerHeight / 2) / 50;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }
}

// ===== Parallax Effects =====
function initParallaxEffects() {
    // 3D tilt effect on cards
    const cards = document.querySelectorAll('.service-card, .project-card, .pricing-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(max-width: 768px)').matches) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Floating animation for visual elements
    const floatingElements = document.querySelectorAll('.stat');
    
    floatingElements.forEach((el, index) => {
        el.style.animation = `floatSoft 3s ease-in-out infinite`;
        el.style.animationDelay = `${index * 0.2}s`;
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Modal =====
function initModal() {
    const modal = document.getElementById('bookingModal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const bookingForm = document.getElementById('bookingForm');
    const formSuccess = document.getElementById('formSuccess');
    const modalHeader = modal.querySelector('.modal-header');
    const openButtons = document.querySelectorAll('.open-modal');
    
    // Open modal
    openButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });
    
    // Close modal on overlay click
    modalOverlay.addEventListener('click', closeModal);
    
    // Close modal on close button click
    modalClose.addEventListener('click', closeModal);
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Handle form submission
    bookingForm.addEventListener('submit', handleFormSubmit);
}

function openModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus first input
    setTimeout(() => {
        const firstInput = modal.querySelector('input');
        if (firstInput) firstInput.focus();
    }, 300);
}

function closeModal() {
    const modal = document.getElementById('bookingModal');
    const bookingForm = document.getElementById('bookingForm');
    const formSuccess = document.getElementById('formSuccess');
    const modalHeader = modal.querySelector('.modal-header');
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset form after animation
    setTimeout(() => {
        bookingForm.reset();
        bookingForm.classList.remove('hidden');
        modalHeader.classList.remove('hidden');
        formSuccess.classList.remove('show');
    }, 300);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const modal = document.getElementById('bookingModal');
    const formSuccess = document.getElementById('formSuccess');
    const modalHeader = modal.querySelector('.modal-header');
    const submitBtn = form.querySelector('.form-submit');
    
    // Get form data
    const formData = new FormData(form);
    
    // Show loading state
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    // Submit to Web3Forms
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Show success message
            form.classList.add('hidden');
            modalHeader.classList.add('hidden');
            formSuccess.classList.add('show');
        } else {
            alert('Something went wrong. Please try again or DM on Instagram.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again or DM on Instagram.');
    })
    .finally(() => {
        // Reset button
        submitBtn.innerHTML = `
            <span>Send Request</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 2L11 13"/>
                <path d="M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
        `;
        submitBtn.disabled = false;
    });
}

// Make closeModal available globally for the success button
window.closeModal = closeModal;

// ===== Additional Animations =====

// Add floating keyframes dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes floatSoft {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-8px);
        }
    }
`;
document.head.appendChild(styleSheet);

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Initialize counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.dataset.animated) {
                statNumber.dataset.animated = 'true';
                const text = statNumber.textContent;
                const number = parseInt(text);
                
                if (!isNaN(number)) {
                    const suffix = text.replace(number, '');
                    const counter = { value: 0 };
                    
                    const animate = () => {
                        counter.value += number / 60;
                        if (counter.value < number) {
                            statNumber.textContent = Math.floor(counter.value) + suffix;
                            requestAnimationFrame(animate);
                        } else {
                            statNumber.textContent = number + suffix;
                        }
                    };
                    
                    animate();
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Text scramble effect for hero title (subtle)
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    .dud {
        color: var(--accent-light);
    }
`;
document.head.appendChild(rippleStyle);

// Scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-light), var(--accent-slate));
    z-index: 9999;
    transition: width 0.1s ease;
    width: 0%;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Intersection Observer for section highlighting in nav
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' });

sections.forEach(section => sectionObserver.observe(section));

// Add active style for nav links
const navActiveStyle = document.createElement('style');
navActiveStyle.textContent = `
    .nav-links a.active:not(.nav-cta),
    .mobile-menu a.active:not(.nav-cta) {
        color: var(--accent-light);
    }
    .nav-links a.active:not(.nav-cta)::after {
        width: 100%;
    }
`;
document.head.appendChild(navActiveStyle);

// Lazy loading for better performance
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}

// Console Easter egg
console.log('%c Website Weaver ', 
    'background: linear-gradient(90deg, #e8ecf2, #64748b); color: #1a2332; font-size: 20px; padding: 10px 20px; border-radius: 5px; font-weight: bold;'
);
console.log('%c Crafting digital masterpieces, one thread at a time. ', 
    'color: #a0a0b0; font-size: 12px;'
);
