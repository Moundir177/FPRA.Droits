/**
 * Main Scripts
 * Core functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the translation system
    console.log('DOM fully loaded - initializing translations');
    
    // Initialize translations
    if (typeof initTranslation === 'function') {
        initTranslation();
        
        // Set up the language switcher
        document.querySelectorAll('.language-switch a').forEach(function(el) {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                console.log('Language selected:', lang);
                if (typeof switchLanguage === 'function') {
                    switchLanguage(lang);
                } else {
                    console.error('switchLanguage function not found');
                }
            });
        });
        
        // Check for saved language preference
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            console.log('Found saved language preference:', savedLang);
            if (typeof switchLanguage === 'function') {
                switchLanguage(savedLang);
            }
        }
    } else {
        console.error('initTranslation function not found - check if i18n.js is properly loaded');
    }
    
    // Scroll to top button functionality
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        // Set initial state (hidden)
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.pointerEvents = 'none';
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.pointerEvents = 'auto';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.pointerEvents = 'none';
            }
        });
        
        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Add accessibility attributes
            if (mainNav.classList.contains('active')) {
                this.setAttribute('aria-expanded', 'true');
            } else {
                this.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Handle dropdowns in navigation
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (dropdowns.length > 0) {
        // For mobile: make dropdown toggles work with click/tap
        if (window.innerWidth < 992) {
            dropdowns.forEach(dropdown => {
                const toggle = dropdown.querySelector('.dropdown-toggle');
                const menu = dropdown.querySelector('.dropdown-menu');
                
                if (toggle && menu) {
                    toggle.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Close all other dropdowns
                        dropdowns.forEach(d => {
                            if (d !== dropdown) {
                                d.classList.remove('show');
                                const m = d.querySelector('.dropdown-menu');
                                if (m) m.style.display = 'none';
                            }
                        });
                        
                        // Toggle current dropdown
                        dropdown.classList.toggle('show');
                        menu.style.display = dropdown.classList.contains('show') ? 'block' : 'none';
                    });
                }
            });
        }
    }
    
    // Newsletter subscription form
    const newsletterForms = document.querySelectorAll('.subscribe-mini-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                // Simple validation
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailPattern.test(emailInput.value)) {
                    // In a real application, you would send this to your server
                    console.log('Newsletter subscription:', emailInput.value);
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success';
                    successMessage.textContent = 'Merci pour votre inscription!';
                    successMessage.style.color = '#3cb496';
                    successMessage.style.marginTop = '10px';
                    successMessage.style.fontWeight = '600';
                    
                    // Replace form with success message
                    form.innerHTML = '';
                    form.appendChild(successMessage);
                } else {
                    // Show error message
                    alert('Veuillez entrer une adresse email valide.');
                }
            }
        });
    });
    
    // Handle header scroll state
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}); 