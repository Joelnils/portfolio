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

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});

// Form submission handler
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Show success message
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Message Sent! ✓';
    submitButton.style.background = '#10b981';
    
    // Reset form
    this.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.background = '#009DE0';
    }, 3000);
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