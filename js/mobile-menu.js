document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const menuBackdrop = document.createElement('div');
    menuBackdrop.classList.add('menu-backdrop');
    document.body.appendChild(menuBackdrop);
    
    // Toggle menu
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuBackdrop.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Toggle aria-expanded attribute for accessibility
        const isExpanded = nav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when backdrop is clicked
    menuBackdrop.addEventListener('click', function() {
        nav.classList.remove('active');
        menuBackdrop.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
    
    // Make dropdown menus work on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        
        dropdownToggle.addEventListener('click', function(e) {
            // Only for mobile devices
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other open dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Close menu when clicking outside or on a link
    document.addEventListener('click', function(e) {
        const isClickInsideNav = nav.contains(e.target);
        const isClickOnToggle = menuToggle.contains(e.target);
        
        if (nav.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
            nav.classList.remove('active');
            menuBackdrop.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close dropdown when clicking a link inside it
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                menuBackdrop.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Fix for position fixed on mobile
    document.addEventListener('scroll', function() {
        if (window.innerWidth <= 768) {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop > 20) {
                document.querySelector('header').classList.add('scrolled');
            } else {
                document.querySelector('header').classList.remove('scrolled');
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            menuBackdrop.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Reset dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}); 