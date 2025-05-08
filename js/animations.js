/**
 * Enhanced UI Animations
 * JavaScript to handle scroll animations, counters, and interactive UI elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Scroll animation for reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Staggered animation for list/grid items
    const staggerItems = document.querySelectorAll('.stagger-item');
    let delay = 0;
    
    function initStaggerItems() {
        staggerItems.forEach((item, index) => {
            item.style.transitionDelay = `${delay + (index * 0.1)}s`;
        });
    }
    
    function checkStaggerItems() {
        staggerItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemVisible = 150;
            
            if (itemTop < window.innerHeight - itemVisible) {
                item.classList.add('active');
            }
        });
    }
    
    // Counter animation for numbers
    const countElements = document.querySelectorAll('.animate-number');
    
    function animateCount(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const stepTime = 50; // update every 50ms
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            el.textContent = Math.floor(current);
            
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            }
        }, stepTime);
    }
    
    function checkCounters() {
        countElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible && !element.classList.contains('counted')) {
                element.classList.add('counted');
                animateCount(element);
            }
        });
    }
    
    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // Close all other answers
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Toggle current answer
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
    
    // Smooth scroll to section functionality
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // News category filter functionality
    const categoryNav = document.querySelector('.category-nav');
    const newsCards = document.querySelectorAll('.news-card');
    
    if (categoryNav) {
        const categoryLinks = categoryNav.querySelectorAll('a');
        
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update active class
                categoryLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Get category filter
                const category = this.getAttribute('data-category') || 'all';
                
                // Filter news cards
                newsCards.forEach(card => {
                    if (category === 'all' || card.classList.contains(category)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('show');
            this.classList.toggle('active');
        });
    }
    
    // Run initial checks and add scroll listener
    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            checkReveal();
            checkStaggerItems();
            checkCounters();
        });
    });
    
    // Initialize on load
    checkReveal();
    initStaggerItems();
    checkStaggerItems();
    checkCounters();
}); 