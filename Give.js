// Give Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const modal = document.getElementById('momoModal');
    const giveNowButton = document.getElementById('giveNowButton');
    const closeModalButton = document.getElementById('closeModal');
    const doneButton = document.getElementById('doneButton');
    const modalBackdrop = modal.querySelector('.modal-backdrop');
    
    // Copy button elements
    const copyButton = document.getElementById('copyButton');
    const copyIcon = document.getElementById('copyIcon');
    const checkIcon = document.getElementById('checkIcon');
    const copyText = document.getElementById('copyText');
    const momoCode = '*182*8*1*032088#';

    // Open modal
    function openModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Event listeners for opening modal
    if (giveNowButton) {
        giveNowButton.addEventListener('click', openModal);
    }

    // Event listeners for closing modal
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    if (doneButton) {
        doneButton.addEventListener('click', closeModal);
    }

    // Close modal when clicking on backdrop
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }

    // Prevent modal content click from closing modal
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // Copy to clipboard functionality
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            // Copy text to clipboard
            navigator.clipboard.writeText(momoCode).then(function() {
                // Show success state
                copyIcon.style.display = 'none';
                checkIcon.style.display = 'block';
                copyText.textContent = 'Copied!';
                checkIcon.style.color = '#10b981';
                
                // Reset after 2 seconds
                setTimeout(function() {
                    copyIcon.style.display = 'block';
                    checkIcon.style.display = 'none';
                    copyText.textContent = 'Copy Code';
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy:', err);
                alert('Failed to copy code. Please copy manually: ' + momoCode);
            });
        });
    }

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button, .impact-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform || 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            // Let CSS handle the transform reset
        });
    });

    // Animate impact numbers on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const impactObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                const targetNumber = parseInt(numberElement.textContent);
                animateNumber(numberElement, targetNumber);
                impactObserver.unobserve(numberElement);
            }
        });
    }, observerOptions);

    // Observe impact numbers
    const impactNumbers = document.querySelectorAll('.impact-number');
    impactNumbers.forEach(number => {
        impactObserver.observe(number);
    });

    // Animate number counting
    function animateNumber(element, target) {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const suffix = element.textContent.replace(/[0-9]/g, '');
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, duration / steps);
    }

    // Add fade-in animation to sections
    const fadeElements = document.querySelectorAll('.payment-card, .impact-section');
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(function() {
                    entry.target.style.transition = 'all 0.6s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Form validation for future use
    function validateForm(formData) {
        const errors = [];
        
        if (!formData.name || formData.name.trim() === '') {
            errors.push('Name is required');
        }
        
        if (!formData.email || !isValidEmail(formData.email)) {
            errors.push('Valid email is required');
        }
        
        return errors;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Track button clicks for analytics (placeholder)
    function trackEvent(eventName, eventData) {
        console.log('Event tracked:', eventName, eventData);
        // Add your analytics code here (Google Analytics, etc.)
    }

    // Track give now button click
    if (giveNowButton) {
        giveNowButton.addEventListener('click', function() {
            trackEvent('give_now_clicked', { method: 'mobile_money' });
        });
    }

    // Track copy button click
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            trackEvent('momo_code_copied', { code: momoCode });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Add loading state to async buttons
    function setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.dataset.originalText = button.textContent;
            button.textContent = 'Processing...';
            button.style.opacity = '0.7';
        } else {
            button.disabled = false;
            button.textContent = button.dataset.originalText;
            button.style.opacity = '1';
        }
    }

    // Handle network errors gracefully
    window.addEventListener('online', function() {
        console.log('Connection restored');
    });

    window.addEventListener('offline', function() {
        console.log('Connection lost');
        alert('Your internet connection was lost. Please check your connection and try again.');
    });

    // Log initialization
    console.log('Give page initialized successfully');
    console.log('Mobile Money feature ready');
});