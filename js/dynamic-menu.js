// Dynamic Menu Bar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile menu
    const menuToggle = document.querySelector('.dynamic-menu-toggle');
    const navMenu = document.querySelector('.dynamic-nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Language switcher functionality
    const languageSwitchers = document.querySelectorAll('.dynamic-lang-switch a');
    
    languageSwitchers.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            
            // Remove active class from all language links
            languageSwitchers.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked language
            this.classList.add('active');
            
            // Change document direction for RTL languages
            document.documentElement.lang = lang;
            document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
            
            // Add RTL class to body if needed
            if (lang === 'ar') {
                document.body.classList.add('rtl');
            } else {
                document.body.classList.remove('rtl');
            }
            
            // If you have a translations system, call it here
            if (typeof switchLanguage === 'function') {
                switchLanguage(lang);
            }
            
            // Save preference
            localStorage.setItem('preferredLanguage', lang);
        });
    });
    
    // Check for saved language preference on load
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        // Set the correct language as active
        languageSwitchers.forEach(link => {
            if (link.getAttribute('data-lang') === savedLang) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Set RTL if needed
        if (savedLang === 'ar') {
            document.documentElement.dir = 'rtl';
            document.body.classList.add('rtl');
        }
    }
    
    // Handle dropdown menus
    const dropdownToggle = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggle.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // On mobile, prevent the default behavior which would navigate to the href
            if (window.innerWidth < 992) {
                e.preventDefault();
                this.parentElement.classList.toggle('dropdown-open');
            }
        });
    });
    
    // Handle scroll effect on menu
    let lastScrollTop = 0;
    const dynamicHeader = document.querySelector('.dynamic-header');
    
    if (dynamicHeader) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add shadow and background when scrolled
            if (scrollTop > 50) {
                dynamicHeader.classList.add('scrolled');
                // Update for RTL if needed
                if (document.documentElement.dir === 'rtl') {
                    // Ensure RTL specific adjustments are applied when scrolled
                    dynamicHeader.classList.add('rtl-scrolled');
                }
            } else {
                dynamicHeader.classList.remove('scrolled');
                dynamicHeader.classList.remove('rtl-scrolled');
            }
            
            // Hide on scroll down, show on scroll up
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                dynamicHeader.classList.add('hidden');
            } else {
                dynamicHeader.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Enhanced scroll behavior
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!e.target.closest('.dynamic-header')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
    
    // Close dropdowns when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            document.querySelectorAll('.dropdown-open').forEach(item => {
                item.classList.remove('dropdown-open');
            });
            
            if (navMenu && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
    
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.dynamic-nav-menu a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
            
            // If it's in a dropdown, also add a class to parent
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                parentDropdown.classList.add('active-parent');
            }
        }
    });
}); 