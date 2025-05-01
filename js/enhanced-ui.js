/**
 * Enhanced UI JavaScript for Fondation pour la promotion des droits website
 * This script adds various enhancements and fixes to improve the website usability
 */

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for revealing elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Target all staggered animation elements
    document.querySelectorAll('.stagger-animation > *').forEach((item, index) => {
        observer.observe(item);
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Enhanced header scroll effect
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    let scrollDirection = 'up';
    
    window.addEventListener('scroll', function() {
        // Determine scroll direction
        scrollDirection = window.scrollY > lastScrollY ? 'down' : 'up';
        
        if (window.scrollY > 100) {
            header.classList.add('header-sticky');
            
            // Only hide header when scrolling down and not at the top
            if (scrollDirection === 'down' && window.scrollY > 300) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('header-sticky');
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = window.scrollY;
    });

    // Create menu backdrop for mobile
    const menuBackdrop = document.createElement('div');
    menuBackdrop.className = 'menu-backdrop';
    document.body.appendChild(menuBackdrop);

    // Enhanced mobile menu toggle with animation
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuBackdrop.classList.toggle('active');
            
            // Prevent body scrolling when menu is open
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
            
            // Animate menu items when opening
            if (nav.classList.contains('active')) {
                const menuItems = nav.querySelectorAll('ul > li');
                menuItems.forEach((item, index) => {
                    item.style.animation = `slideInRight 0.3s forwards ${0.1 + index * 0.05}s`;
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100 + index * 50);
                });
            }
        });
        
        menuBackdrop.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Function to check if we're in mobile view
    function isMobileView() {
        return window.innerWidth <= 768;
    }
    
    // Enhanced mobile dropdown toggles
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (isMobileView()) {
                e.preventDefault();
                const parent = this.parentElement;
                const dropdownMenu = parent.querySelector('.dropdown-menu');
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                    if (menu !== dropdownMenu) {
                        const menuParent = menu.parentElement;
                        menu.classList.remove('active');
                        if (menuParent.querySelector('.dropdown-toggle')) {
                            menuParent.querySelector('.dropdown-toggle').classList.remove('active');
                        }
                    }
                });
                
                // Toggle current dropdown
                dropdownMenu.classList.toggle('active');
                this.classList.toggle('active');
                
                // If opening, scroll the dropdown into view
                if (dropdownMenu.classList.contains('active')) {
                    setTimeout(() => {
                        const rect = dropdownMenu.getBoundingClientRect();
                        const isOutOfView = rect.bottom > window.innerHeight;
                        if (isOutOfView) {
                            parent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 300);
                }
            }
        });
    });

    // Add hover state to parent menu items when hovering over dropdown items
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    
    dropdownMenus.forEach(menu => {
        menu.addEventListener('mouseenter', function() {
            if (!isMobileView()) {
                const parent = this.parentElement;
                if (parent.querySelector('.dropdown-toggle')) {
                    parent.querySelector('.dropdown-toggle').classList.add('hover');
                }
            }
        });
        
        menu.addEventListener('mouseleave', function() {
            if (!isMobileView()) {
                const parent = this.parentElement;
                if (parent.querySelector('.dropdown-toggle')) {
                    parent.querySelector('.dropdown-toggle').classList.remove('hover');
                }
            }
        });
    });
    
    // Handle window resize for dropdown menus
    window.addEventListener('resize', function() {
        if (!isMobileView()) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
            });
            
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.classList.remove('active');
            });
            
            // Reset body overflow
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuBackdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Add active class to current page link for better visual indication
    const currentPagePath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPagePath) {
            link.classList.add('active');
            
            // If it's a dropdown item, also highlight the parent
            const dropdownParent = link.closest('.dropdown');
            if (dropdownParent && dropdownParent.querySelector('.dropdown-toggle')) {
                dropdownParent.querySelector('.dropdown-toggle').classList.add('active');
            }
        }
    });

    // Add ID attributes to sections that are missing them
    const pageIds = [
        { page: 'about.html', sections: ['mission', 'vision', 'team', 'history'] },
        { page: 'news.html', sections: ['latest', 'projects', 'press', 'events'] },
        { page: 'revue.html', sections: ['current', 'archives', 'contribute', 'editorial'] },
        { page: 'formations.html', sections: ['programs', 'workshops', 'calendar', 'registration'] },
        { page: 'resources.html', sections: ['publications', 'reports', 'guides', 'multimedia'] },
        { page: 'testimonials.html', sections: ['beneficiaries', 'partners', 'experts', 'share'] },
        { page: 'civil-society.html', sections: ['network', 'partners', 'collaborations', 'join'] },
        { page: 'contact.html', sections: ['general', 'media', 'support', 'careers'] }
    ];
    
    // Check current page and add missing section IDs
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage) {
        const pageSections = pageIds.find(page => page.page === currentPage);
        
        if (pageSections) {
            // Find main sections of the page
            const mainSections = document.querySelectorAll('main > section, body > section:not(.hero)');
            
            // Add IDs to main sections that don't have them
            pageSections.sections.forEach((sectionId, index) => {
                if (mainSections[index] && !mainSections[index].id) {
                    mainSections[index].id = sectionId;
                }
            });
        }
    }

    // Card hover effects
    const cards = document.querySelectorAll('.news-card, .program-card, .gallery-item, .testimonial');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Button hover effect
    const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-outline');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    if (testimonials.length > 1) {
        // Create navigation dots
        const testimonialSlider = document.querySelector('.testimonial-slider');
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonial-nav';
        
        testimonials.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', `Testimonial ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
            
            dotsContainer.appendChild(dot);
        });
        
        testimonialSlider.appendChild(dotsContainer);
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateX(50px)';
            testimonial.style.pointerEvents = 'none';
            
            setTimeout(() => {
                testimonial.style.display = i === index ? 'block' : 'none';
                
                if (i === index) {
                    setTimeout(() => {
                        testimonial.style.opacity = '1';
                        testimonial.style.transform = 'translateX(0)';
                        testimonial.style.pointerEvents = 'auto';
                    }, 50);
                }
            }, 300);
        });
        
        // Update nav dots
        const dots = document.querySelectorAll('.testimonial-nav button');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentTestimonial = index;
    }

    // Add CSS class for JavaScript enabled browsers
    document.body.classList.add('js-enabled');
    
    // Animate numbers with countUp effect
    const animateNumbers = document.querySelectorAll('.animate-number');
    
    animateNumbers.forEach(numberElement => {
        const target = parseInt(numberElement.getAttribute('data-target'), 10);
        let current = 0;
        const increment = target / 50; // Divide animation into 50 steps
        
        function updateNumber() {
            current += increment;
            if (current < target) {
                numberElement.textContent = Math.ceil(current);
                requestAnimationFrame(updateNumber);
            } else {
                numberElement.textContent = target;
            }
        }
        
        // Start animation when element is in view
        const numberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(updateNumber);
                    numberObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        numberObserver.observe(numberElement);
    });

    // Add section IDs based on headings for better navigation and linking
    function addMissingSectionIds() {
        const path = window.location.pathname;
        const page = path.split('/').pop().toLowerCase();
        
        // Define expected section IDs for each page
        const sectionMappings = {
            'about.html': ['mission', 'vision', 'team', 'history'],
            'news.html': ['latest', 'projects', 'press', 'events'],
            'revue.html': ['current', 'archives', 'contribute', 'editorial'],
            'formations.html': ['programs', 'workshops', 'calendar', 'registration'],
            'resources.html': ['publications', 'reports', 'guides', 'multimedia'],
            'testimonials.html': ['beneficiaries', 'partners', 'experts', 'share'],
            'civil-society.html': ['network', 'partners', 'collaborations', 'join'],
            'contact.html': ['general', 'media', 'support', 'careers']
        };
        
        // Default to home page if no filename or index.html
        const currentPage = page === '' || page === 'index.html' ? 'about.html' : page;
        
        // Get section IDs for the current page
        const requiredIds = sectionMappings[currentPage] || [];
        
        if (requiredIds.length > 0) {
            const sections = document.querySelectorAll('section');
            
            requiredIds.forEach(id => {
                if (!document.getElementById(id)) {
                    sections.forEach(section => {
                        const heading = section.querySelector('h2, h3');
                        if (heading && heading.textContent.toLowerCase().includes(id)) {
                            section.id = id;
                        }
                    });
                }
            });
        }
    }
    
    // Improve mobile menu functionality
    function enhanceMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        
        if (menuToggle && nav) {
            // Create menu backdrop for mobile
            const backdrop = document.createElement('div');
            backdrop.className = 'menu-backdrop';
            document.body.appendChild(backdrop);
            
            menuToggle.addEventListener('click', function() {
                nav.classList.toggle('active');
                backdrop.classList.toggle('active');
                menuToggle.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
            
            // Close menu when clicking on backdrop
            backdrop.addEventListener('click', function() {
                nav.classList.remove('active');
                backdrop.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
            
            // Handle dropdown menu in mobile view
            const dropdowns = document.querySelectorAll('.dropdown');
            
            if (window.innerWidth <= 992) {
                dropdowns.forEach(dropdown => {
                    const toggle = dropdown.querySelector('.dropdown-toggle');
                    const menu = dropdown.querySelector('.dropdown-menu');
                    
                    if (toggle && menu) {
                        toggle.addEventListener('click', function(e) {
                            // Only in mobile view
                            if (window.innerWidth <= 992) {
                                e.preventDefault();
                                menu.classList.toggle('active');
                                
                                // Close other dropdowns
                                dropdowns.forEach(other => {
                                    if (other !== dropdown) {
                                        const otherMenu = other.querySelector('.dropdown-menu');
                                        if (otherMenu) otherMenu.classList.remove('active');
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    }
    
    // Fix missing alt attributes on images
    function addMissingAltText() {
        const images = document.querySelectorAll('img:not([alt])');
        
        images.forEach(img => {
            // Try to extract meaningful alt text from parent elements or set a default
            const parentHeading = img.closest('div, section').querySelector('h2, h3, h4');
            
            if (parentHeading) {
                img.alt = parentHeading.textContent.trim();
            } else {
                // Extract filename as fallback
                const src = img.src;
                const filename = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'));
                const cleanName = filename.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                
                img.alt = cleanName;
            }
        });
    }
    
    // Add proper aria labels to social media links
    function improveSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-links a, footer a[href="#"]');
        
        socialLinks.forEach(link => {
            const icon = link.querySelector('i');
            
            if (icon) {
                // Extract social network name from icon class
                const classes = icon.className.split(' ');
                const brandClass = classes.find(cls => cls.startsWith('fa-'));
                
                if (brandClass) {
                    const networkName = brandClass.replace('fa-', '');
                    
                    // Add visually hidden text for screen readers
                    const span = document.createElement('span');
                    span.className = 'visually-hidden';
                    span.textContent = networkName.charAt(0).toUpperCase() + networkName.slice(1);
                    
                    link.appendChild(span);
                    
                    // Add aria-label
                    link.setAttribute('aria-label', networkName);
                }
                
                // Update empty href with meaningful value
                if (link.getAttribute('href') === '#') {
                    link.setAttribute('href', 'javascript:void(0)');
                    link.setAttribute('role', 'button');
                }
            }
        });
    }
    
    // Improve form accessibility
    function enhanceForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Skip if input already has a label
                if (input.id && document.querySelector(`label[for="${input.id}"]`)) {
                    return;
                }
                
                // Create an ID if missing
                if (!input.id) {
                    const inputType = input.type || 'text';
                    const fieldName = input.name || inputType + Math.floor(Math.random() * 1000);
                    input.id = fieldName + '-' + Math.floor(Math.random() * 1000);
                }
                
                // Create label if missing
                if (input.placeholder && !document.querySelector(`label[for="${input.id}"]`)) {
                    const label = document.createElement('label');
                    label.htmlFor = input.id;
                    label.className = 'visually-hidden';
                    label.textContent = input.placeholder;
                    
                    input.parentNode.insertBefore(label, input);
                }
                
                // Add aria-required for required fields
                if (input.required) {
                    input.setAttribute('aria-required', 'true');
                }
            });
            
            // Add form validation
            form.addEventListener('submit', function(e) {
                let isValid = true;
                const requiredInputs = form.querySelectorAll('[required]');
                
                requiredInputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.classList.add('error');
                        
                        // Add error message if not exists
                        let errorMsg = input.parentNode.querySelector('.error-message');
                        
                        if (!errorMsg) {
                            errorMsg = document.createElement('div');
                            errorMsg.className = 'error-message';
                            input.parentNode.appendChild(errorMsg);
                        }
                        
                        errorMsg.textContent = 'Ce champ est requis.';
                    } else {
                        input.classList.remove('error');
                        const errorMsg = input.parentNode.querySelector('.error-message');
                        if (errorMsg) {
                            errorMsg.textContent = '';
                        }
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                }
            });
        });
    }
    
    // Add skip to content link for keyboard users
    function addSkipLink() {
        const main = document.querySelector('main') || document.querySelector('section');
        
        if (main && !document.querySelector('.skip-link')) {
            // Create skip link
            const skipLink = document.createElement('a');
            skipLink.href = '#content';
            skipLink.className = 'skip-link';
            skipLink.textContent = 'Passer au contenu';
            
            // Add ID to main content
            main.id = 'content';
            
            // Insert at the beginning of body
            document.body.insertBefore(skipLink, document.body.firstChild);
        }
    }
    
    // Fix empty links with href="#"
    function fixEmptyHashLinks() {
        const emptyLinks = document.querySelectorAll('a[href="#"]');
        
        emptyLinks.forEach(link => {
            // Check if it's a button-like element
            const hasButtonClass = 
                link.classList.contains('btn') || 
                link.classList.contains('btn-primary') || 
                link.classList.contains('btn-secondary') || 
                link.classList.contains('btn-outline') ||
                link.classList.contains('btn-small');
            
            const isLanguageSwitch = link.closest('.language-switch');
            const isSocialLink = link.closest('.social-links');
            
            if (hasButtonClass) {
                // Replace with button element for button-like links
                const button = document.createElement('button');
                button.type = 'button';
                button.className = link.className;
                button.innerHTML = link.innerHTML;
                
                // Copy attributes except href
                Array.from(link.attributes).forEach(attr => {
                    if (attr.name !== 'href') {
                        button.setAttribute(attr.name, attr.value);
                    }
                });
                
                link.parentNode.replaceChild(button, link);
            } else if (isLanguageSwitch) {
                // Keep language switcher as is, but add proper role
                link.setAttribute('role', 'button');
                link.setAttribute('aria-current', 'page');
            } else if (isSocialLink) {
                // Add placeholder URL for social links
                const icon = link.querySelector('i');
                if (icon) {
                    const classes = icon.className.split(' ');
                    const brandClass = classes.find(cls => cls.startsWith('fa-'));
                    
                    if (brandClass) {
                        const networkName = brandClass.replace('fa-', '');
                        link.setAttribute('href', `https://www.${networkName}.com/`);
                        link.setAttribute('target', '_blank');
                        link.setAttribute('rel', 'noopener noreferrer');
                    }
                }
            } else {
                // Default: convert to javascript:void(0)
                link.setAttribute('href', 'javascript:void(0)');
                link.setAttribute('role', 'button');
            }
        });
    }
    
    // Run all enhancements
    addMissingSectionIds();
    enhanceMobileMenu();
    addMissingAltText();
    improveSocialLinks();
    enhanceForms();
    addSkipLink();
    fixEmptyHashLinks();
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 100) {
            header.classList.add('header-sticky');
        } else {
            header.classList.remove('header-sticky');
        }
    });

    // Active menu highlighting based on current page
    highlightCurrentPage();
    
    // Handle dropdowns on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    if (window.innerWidth < 992) {
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                toggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    menu.classList.toggle('active');
                });
            }
        });
    }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if it's a dropdown toggle in mobile view or if it's just #
        if (window.innerWidth <= 768 && this.classList.contains('dropdown-toggle') || targetId === '#') {
            return;
        }
        
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20; // Added 20px extra padding
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Add temporary highlight effect to the target section
            targetElement.classList.add('section-highlight');
            setTimeout(() => {
                targetElement.classList.remove('section-highlight');
            }, 1500);
            
            // Close mobile menu if open
            const nav = document.querySelector('nav');
            const menuToggle = document.querySelector('.menu-toggle');
            const menuBackdrop = document.querySelector('.menu-backdrop');
            
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
                if (menuBackdrop) menuBackdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Add keydown support for menu navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const nav = document.querySelector('nav');
        const menuToggle = document.querySelector('.menu-toggle');
        const menuBackdrop = document.querySelector('.menu-backdrop');
        
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
            if (menuBackdrop) menuBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Add visible class to the first batch of elements on page load
window.addEventListener('load', function() {
    document.querySelectorAll('.animate-fadeIn, .animate-slideInLeft, .animate-slideInRight').forEach(item => {
        item.classList.add('visible');
    });

    // Add appearance animations to staggered elements initially visible in viewport
    const initialItems = document.querySelectorAll('.stagger-animation > *');
    initialItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100);
        }
    });
});

// Add CSS animation for menu slide in
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes slideInRight {
    from {
        transform: translateX(30px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.section-highlight {
    animation: sectionHighlight 1.5s ease-out;
}

@keyframes sectionHighlight {
    0%, 100% {
        background-color: transparent;
    }
    20% {
        background-color: rgba(185, 28, 28, 0.1);
    }
}
</style>
`); 

// Function to highlight the current page in the navigation
function highlightCurrentPage() {
    // Get the current page URL
    const currentLocation = window.location.pathname;
    const fileName = currentLocation.split('/').pop();
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Remove any existing 'active' classes
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Highlight the correct link
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // For homepage
        if (fileName === '' || fileName === 'index.html') {
            if (linkHref === 'index.html' || linkHref === './') {
                link.classList.add('active');
            }
        } 
        // For other pages
        else if (linkHref === fileName) {
            link.classList.add('active');
        }
        // For dropdown parent links
        else if (linkHref && fileName.includes(linkHref) && linkHref !== 'index.html') {
            const parentLi = link.closest('li.dropdown');
            if (parentLi) {
                const dropdownToggle = parentLi.querySelector('.dropdown-toggle');
                if (dropdownToggle) {
                    dropdownToggle.classList.add('active');
                }
            }
        }
    });
} 