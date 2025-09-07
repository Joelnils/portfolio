// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in animation observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Google Analytics Event Tracking
function trackEvent(eventName, category, label = null) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: category,
            event_label: label
        });
    }
}

// Observe all fade-in elements and setup mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // Track project demo clicks
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a');
        if (!target) return;
        
        // Track project demos
        if (target.href.includes('projects/storybook')) {
            trackEvent('project_demo_click', 'engagement', 'AI Berättargenerator');
        } else if (target.href.includes('projects/slot-machine')) {
            trackEvent('project_demo_click', 'engagement', 'React Slotspel');
        } else if (target.href.includes('projects/gav-calculator')) {
            trackEvent('project_demo_click', 'engagement', 'GAV-miniräknare');
        } else if (target.href.includes('projects/matladereknaren')) {
            trackEvent('project_demo_click', 'engagement', 'Matlåderäknaren');
        }
        
        // Track CV download
        if (target.href.includes('resume.pdf')) {
            trackEvent('cv_download', 'engagement', 'Resume PDF');
        }
        
        // Track contact form interaction
        if (target.href.includes('#contact')) {
            trackEvent('contact_section_click', 'engagement', 'Contact CTA');
        }
    });
    
    // Track form submission
    const contactForm = document.querySelector('form[name="contact"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            trackEvent('contact_form_submit', 'conversion', 'Contact Form');
        });
    }
    
    // Sunglasses toggle for profile photo
    const profilePhoto = document.querySelector('.hero-profile-photo');
    if (profilePhoto) {
        profilePhoto.style.cursor = 'pointer';
        
        // Create custom glasses element
        const sunglasses = document.createElement('div');
        sunglasses.className = 'custom-glasses';
        sunglasses.innerHTML = `
            <div class="lens left-lens"></div>
            <div class="bridge"></div>
            <div class="lens right-lens"></div>
        `;
        sunglasses.style.cssText = `
            position: absolute;
            top: 13%;
            left: 49%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 10;
            display: none !important;
            width: 65px;
            height: 40px;
        `;
        
        // Add responsive positioning class
        sunglasses.classList.add('responsive-glasses');
        
        // Add sunglasses to the hero-image container
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.appendChild(sunglasses);
        }
        
        let glassesVisible = false;
        
        const photoClick = function() {
            if (!glassesVisible) {
                sunglasses.style.setProperty('display', 'flex', 'important');
                glassesVisible = true;
            } else {
                sunglasses.style.setProperty('display', 'none', 'important');
                glassesVisible = false;
            }
        };
        
        const toggleGlasses = function() {
            sunglasses.style.setProperty('display', 'none', 'important');
            glassesVisible = false;
        };
        
        // Make photo clickable - first click shows, then toggles
        profilePhoto.addEventListener('click', photoClick);
        
        // Make glasses themselves clickable to remove
        sunglasses.addEventListener('click', toggleGlasses);
        sunglasses.style.cursor = 'pointer';
    }
    
    // Mobile menu setup
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        // Use both click and touchstart for better mobile support
        const toggleMenu = function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        };
        
        mobileMenuBtn.addEventListener('click', toggleMenu);
        mobileMenuBtn.addEventListener('touchstart', toggleMenu, { passive: false });
        
        // Close mobile menu when clicking on a nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});

// Form submission handler for Netlify
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Show loading state
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Submit to Netlify
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    })
    .then(() => {
        // Show success message
        submitButton.textContent = 'Message Sent! ✓';
        submitButton.style.background = '#10b981';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '#009DE0';
            submitButton.disabled = false;
        }, 3000);
    })
    .catch((error) => {
        // Show error message
        submitButton.textContent = 'Error - Try Again';
        submitButton.style.background = '#ef4444';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '#009DE0';
            submitButton.disabled = false;
        }, 3000);
        
        console.error('Form submission error:', error);
    });
});

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Add loading animation for project demo links
document.querySelectorAll('a[href*="projects/"]').forEach(link => {
    link.addEventListener('click', function(e) {
        if (!this.href.includes('http')) {
            e.preventDefault();
            const originalText = this.innerHTML;
            this.innerHTML = '🔄 Loading Demo...';
            
            // Simulate loading
            setTimeout(() => {
                this.innerHTML = '⚠️ Demo Coming Soon';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }, 1000);
        }
    });
});

