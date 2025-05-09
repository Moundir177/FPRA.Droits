// New menu functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("New menu script loaded");
    
    // Ensure dropdown menus work properly
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle dropdown visibility
            const parent = this.parentElement;
            const dropdown = parent.querySelector('.dropdown-menu');
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdown) {
                    menu.classList.remove('active');
                    menu.parentElement.classList.remove('show');
                }
            });
            
            // Toggle this dropdown
            dropdown.classList.toggle('active');
            parent.classList.toggle('show');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
                menu.parentElement.classList.remove('show');
            });
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.dynamic-menu-toggle');
    const navMenu = document.querySelector('.dynamic-nav-menu');
    const menuOverlay = document.querySelector('.dynamic-menu-overlay');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            if (menuOverlay) {
                menuOverlay.classList.toggle('active');
            }
            
            // Update ARIA attributes
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Close mobile menu when clicking overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuOverlay.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    }
    
    // Handle submenu accessibility in mobile view
    const mediaQuery = window.matchMedia('(max-width: 991px)');
    
    function setupMobileAccessibility(isMobile) {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (isMobile) {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-haspopup', 'true');
                
                toggle.addEventListener('click', function() {
                    const expanded = toggle.getAttribute('aria-expanded') === 'true';
                    toggle.setAttribute('aria-expanded', !expanded);
                });
            } else {
                toggle.removeAttribute('aria-expanded');
            }
        });
    }
    
    // Initial setup
    setupMobileAccessibility(mediaQuery.matches);
    
    // Listen for viewport changes
    mediaQuery.addEventListener('change', e => {
        setupMobileAccessibility(e.matches);
    });
}); 