
// Fix mobile menu functionality
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Function to fix mobile menu
    function fixMobileMenu() {
      const menuToggle = document.querySelector('.menu-toggle');
      const nav = document.querySelector('nav');
      const menuBackdrop = document.querySelector('.menu-backdrop');
      
      if (!menuToggle || !nav) return;
      
      // Ensure mobile menu toggle works
      menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        // Toggle active classes
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        if (menuBackdrop) menuBackdrop.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Force display block for nav when active
        if (nav.classList.contains('active')) {
          nav.style.right = '0';
          
          // Make sure all menu items are visible
          const menuItems = nav.querySelectorAll('li');
          menuItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'none';
            item.style.display = 'block';
          });
        } else {
          nav.style.right = '-100%';
        }
      });
      
      // Fix dropdown functionality in mobile
      const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
      dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
          if (window.innerWidth <= 992) {
            e.preventDefault();
            e.stopPropagation();
            
            const parent = this.parentElement;
            const dropdown = parent.querySelector('.dropdown-menu');
            
            if (!dropdown) return;
            
            // Toggle active class
            parent.classList.toggle('active');
            dropdown.classList.toggle('active');
            
            // Ensure dropdown is visible when active
            if (dropdown.classList.contains('active')) {
              dropdown.style.display = 'block';
              dropdown.style.maxHeight = '1000px';
            } else {
              dropdown.style.maxHeight = '0';
              setTimeout(() => {
                if (!dropdown.classList.contains('active')) {
                  dropdown.style.display = 'none';
                }
              }, 300);
            }
          }
        });
      });
      
      // Close menu when clicking outside
      if (menuBackdrop) {
        menuBackdrop.addEventListener('click', function() {
          if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuBackdrop.classList.remove('active');
            document.body.classList.remove('menu-open');
            nav.style.right = '-100%';
          }
        });
      }
    }
    
    // Run the fix
    fixMobileMenu();
  });
})();