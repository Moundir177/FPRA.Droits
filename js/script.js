// JavaScript for Fondation pour la promotion des droits

document.addEventListener('DOMContentLoaded', function() {
    // Create menu backdrop
    const menuBackdrop = document.createElement('div');
    menuBackdrop.className = 'menu-backdrop';
    document.body.appendChild(menuBackdrop);
    
    // Create hamburger icon for the menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        // Check if we're not already using the hamburger icon
        if (!menuToggle.querySelector('.hamburger-icon')) {
            // Remove default icon if it exists
            const defaultIcon = menuToggle.querySelector('i');
            if (defaultIcon) {
                defaultIcon.remove();
            }
            
            // Create and add hamburger icon
            const hamburger = document.createElement('div');
            hamburger.className = 'hamburger-icon';
            
            for (let i = 1; i <= 4; i++) {
                const span = document.createElement('span');
                hamburger.appendChild(span);
            }
            
            menuToggle.appendChild(hamburger);
        }
        
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    // Function to toggle menu state
    function toggleMenu() {
        const nav = document.querySelector('nav');
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuBackdrop.classList.toggle('active');
        
        // Toggle hamburger icon animation
        const hamburgerIcon = menuToggle.querySelector('.hamburger-icon');
        if (hamburgerIcon) {
            hamburgerIcon.classList.toggle('open');
        }
        
        // Toggle body scroll
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }
    
    // Close menu on backdrop click
    menuBackdrop.addEventListener('click', function() {
        const nav = document.querySelector('nav');
        if (nav.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Close menu when clicking outside of it
    document.addEventListener('click', function(event) {
        const nav = document.querySelector('nav');
        if (nav && nav.classList.contains('active')) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnMenuToggle = menuToggle && menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnMenuToggle) {
                toggleMenu();
            }
        }
    });
    
    // Mobile dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                
                // Find the dropdown menu
                const parent = this.parentElement;
                const dropdown = parent.querySelector('.dropdown-menu');
                
                // Check if already open
                const isOpen = dropdown.classList.contains('active');
                
                // Close all dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('active');
                });
                
                // Toggle the clicked dropdown
                if (!isOpen) {
                    dropdown.classList.add('active');
                }
            }
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    
    function stickyHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Check on page load
    stickyHeader();
    
    // Check on scroll
    window.addEventListener('scroll', stickyHeader);
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            // Reset mobile menu on larger screens
            const nav = document.querySelector('nav');
            if (nav) {
                nav.classList.remove('active');
            }
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
            menuBackdrop.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset mobile dropdown functionality
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
            });
            
            // Reset hamburger icon
            const hamburgerIcon = menuToggle.querySelector('.hamburger-icon');
            if (hamburgerIcon) {
                hamburgerIcon.classList.remove('open');
            }
        }
    });
    
    // Testimonial tabs functionality
    const testimonialTabs = document.querySelectorAll('.categories-tabs .tab');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialTabs.length > 0 && testimonialCards.length > 0) {
        let isFiltering = false;
        
        // Add hover effects for tabs
        testimonialTabs.forEach(tab => {
            tab.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.color = 'var(--secondary-color)';
                    this.style.backgroundColor = 'rgba(0,0,0,0.03)';
                    this.style.transform = 'translateY(-2px)';
                }
            });
            
            tab.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.color = '#555';
                    this.style.backgroundColor = 'transparent';
                    this.style.transform = 'translateY(0)';
                }
            });
            
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Prevent rapid tab clicks during animation
                if (isFiltering) return;
                isFiltering = true;
                
                // Remove active class from all tabs
                testimonialTabs.forEach(t => {
                    t.classList.remove('active');
                    t.style.color = '#555';
                    t.style.backgroundColor = 'transparent';
                    t.style.boxShadow = 'none';
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                this.style.color = 'white';
                this.style.backgroundColor = 'var(--primary-color)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                
                // Get the category from the href attribute
                const category = this.getAttribute('href').substring(1);
                
                // Calculate grid layout for responsive design
                const gridContainer = document.querySelector('.testimonials-grid');
                const containerWidth = gridContainer.offsetWidth;
                const cardWidth = 350; // Minimum card width as defined in the CSS
                const gap = 30; // Gap between cards as defined in the CSS
                
                // Determine how many columns we can fit
                const columnsCount = Math.floor((containerWidth + gap) / (cardWidth + gap));
                
                // Show all testimonials if "all" category is selected
                if (category === 'all') {
                    fadeOutAndShowCards(testimonialCards, null, () => {
                        // Recalculate grid layout
                        if (gridContainer && window.innerWidth >= 768) {
                            adjustGridLayout(gridContainer, columnsCount);
                        }
                        isFiltering = false;
                    });
                } else {
                    // Filter testimonials based on category
                    fadeOutAndShowCards(testimonialCards, category, () => {
                        // Recalculate grid layout
                        if (gridContainer && window.innerWidth >= 768) {
                            adjustGridLayout(gridContainer, columnsCount);
                        }
                        isFiltering = false;
                    });
                }
            });
        });
        
        // Fade out all cards, then show filtered cards and fade them in
        function fadeOutAndShowCards(cards, category, callback) {
            // First fade out all cards
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            });
            
            // After fade out is complete, show or hide cards based on category
            setTimeout(() => {
                cards.forEach(card => {
                    if (!category) {
                        // Show all cards
                        card.style.display = 'block';
                    } else {
                        // Filter by category
                        const cardCategory = card.querySelector('.testimonial-meta .fas.fa-tag').parentElement.textContent.trim().toLowerCase();
                        if (categoryMatches(cardCategory, category)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
                
                // After display property is set, fade in visible cards with staggered delay
                setTimeout(() => {
                    const visibleCards = Array.from(cards).filter(card => card.style.display !== 'none');
                    
                    visibleCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100); // Stagger the animations
                    });
                    
                    // Wait for all cards to be visible before executing callback
                    setTimeout(() => {
                        if (callback) callback();
                    }, visibleCards.length * 100 + 100);
                }, 50);
            }, 300);
        }
        
        // Add hover effect to testimonial cards
        testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)';
            });
        });
        
        // Add hover effects for video cards
        const videoCards = document.querySelectorAll('.video-card');
        videoCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                
                // Make play button larger on hover
                const playButton = this.querySelector('.play-button');
                if (playButton) {
                    playButton.style.transform = 'scale(1.1)';
                    playButton.style.boxShadow = '0 15px 25px rgba(0,0,0,0.4)';
                }
                
                // Darken overlay for better contrast
                const overlay = this.querySelector('.video-thumbnail > div:first-child');
                if (overlay) {
                    overlay.style.backgroundColor = 'rgba(0,0,0,0.4)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)';
                
                // Restore play button size
                const playButton = this.querySelector('.play-button');
                if (playButton) {
                    playButton.style.transform = 'scale(1)';
                    playButton.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
                }
                
                // Restore overlay
                const overlay = this.querySelector('.video-thumbnail > div:first-child');
                if (overlay) {
                    overlay.style.backgroundColor = 'rgba(0,0,0,0.2)';
                }
            });
        });
        
        // Add hover effects for pagination
        const paginationLinks = document.querySelectorAll('.pagination a');
        paginationLinks.forEach(link => {
            if (!link.classList.contains('active')) {
                link.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px)';
                    this.style.boxShadow = '0 6px 15px rgba(0,0,0,0.15)';
                    this.style.color = 'var(--primary-color)';
                });
                
                link.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                    this.style.color = '#333';
                });
            }
        });
        
        // Enhance the 'See all videos' button
        const seeAllButton = document.querySelector('.btn-outline');
        if (seeAllButton) {
            seeAllButton.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
                
                // Move arrow icon right
                const arrowIcon = this.querySelector('span:last-of-type');
                if (arrowIcon) {
                    arrowIcon.style.right = '15px';
                }
                
                // Show reverse gradient
                const gradient = this.querySelector('div');
                if (gradient) {
                    gradient.style.opacity = '1';
                }
            });
            
            seeAllButton.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
                
                // Move arrow icon back
                const arrowIcon = this.querySelector('span:last-of-type');
                if (arrowIcon) {
                    arrowIcon.style.right = '20px';
                }
                
                // Hide reverse gradient
                const gradient = this.querySelector('div');
                if (gradient) {
                    gradient.style.opacity = '0';
                }
            });
        }
        
        // Adjust grid layout based on visible cards
        function adjustGridLayout(gridContainer, columnsCount) {
            // Make sure we have at least 1 column
            const columns = Math.max(1, columnsCount);
            
            // Update grid template columns
            gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        }
        
        // Helper function to match category names
        function categoryMatches(cardCategory, tabCategory) {
            const categoryMap = {
                'défenseur des droits': 'rights-defenders',
                'défenseurs des droits': 'rights-defenders',
                'femmes': 'women',
                'jeunes': 'youth',
                'communautés': 'communities'
            };
            
            const normalizedCardCategory = cardCategory.toLowerCase().replace(':', '').trim();
            
            // Handle special cases or get from map
            for (const [key, value] of Object.entries(categoryMap)) {
                if (normalizedCardCategory.includes(key)) {
                    return value === tabCategory;
                }
            }
            
            return false;
        }
        
        // Initialize opacity for all cards
        testimonialCards.forEach(card => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
        });
        
        // Add resize event listener to adjust grid layout on window resize
        window.addEventListener('resize', function() {
            if (isFiltering) return;
            
            const gridContainer = document.querySelector('.testimonials-grid');
            if (gridContainer) {
                const containerWidth = gridContainer.offsetWidth;
                const cardWidth = 350;
                const gap = 30;
                const columnsCount = Math.floor((containerWidth + gap) / (cardWidth + gap));
                
                if (window.innerWidth >= 768) {
                    adjustGridLayout(gridContainer, columnsCount);
                } else {
                    // Reset for mobile
                    gridContainer.style.gridTemplateColumns = '';
                }
            }
        });
    }
    
    // Enhanced Smooth scroll for anchor links with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // Get header height for offset
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - headerHeight - 20, // Additional 20px for spacing
                        behavior: 'smooth'
                    });
                    
                    // If mobile menu is open, close it after clicking a link
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        const icon = menuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            // Very basic validation
            if (emailInput.value.trim() === '') {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Here you would typically send this to a server
            // For demo purposes, we'll just show a success message
            alert('Merci pour votre inscription à notre newsletter!');
            emailInput.value = '';
        });
    }
    
    // Toggle active class on navigation based on current page
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation.substring(currentLocation.lastIndexOf('/') + 1)) {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // Enhanced testimonial slider functionality with fade effect
    const testimonials = [
        {
            text: "La formation sur les droits juridiques a changé ma vision et m'a donné les outils pour mieux défendre ma communauté.",
            name: "Amina B.",
            role: "Activiste"
        },
        {
            text: "Grâce au soutien de la Fondation, notre association a pu mener à bien un projet crucial pour la défense des droits des femmes.",
            name: "Karim M.",
            role: "Président d'association"
        },
        {
            text: "Les ressources documentaires mises à disposition sont d'une grande qualité et ont été essentielles pour mon travail de recherche.",
            name: "Sarah L.",
            role: "Chercheuse"
        },
        {
            text: "Les ateliers de formation m'ont permis de développer mes compétences juridiques et de mieux comprendre les enjeux actuels.",
            name: "Youssef R.",
            role: "Étudiant en droit"
        },
        {
            text: "Le soutien de la Fondation a été déterminant pour notre communauté face aux défis que nous rencontrons au quotidien.",
            name: "Fatima M.",
            role: "Représentante communautaire"
        }
    ];
    
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentTestimonialIndex = 0;
        
        function showTestimonial(index) {
            const testimonial = testimonials[index];
            
            // Create new testimonial element
            const newTestimonial = document.createElement('div');
            newTestimonial.className = 'testimonial';
            newTestimonial.innerHTML = `
                <p>"${testimonial.text}"</p>
                <div class="testimonial-author">
                    <span class="name">${testimonial.name}</span>
                    <span class="role">${testimonial.role}</span>
                </div>
            `;
            
            // Apply fade out effect to current testimonial
            const currentTestimonial = testimonialSlider.querySelector('.testimonial');
            if (currentTestimonial) {
                currentTestimonial.style.opacity = '0';
                
                setTimeout(() => {
                    // Remove current testimonial and add new one
                    testimonialSlider.innerHTML = '';
                    testimonialSlider.appendChild(newTestimonial);
                    
                    // Apply fade in effect
                    setTimeout(() => {
                        newTestimonial.style.opacity = '1';
                    }, 50);
                }, 500);
            } else {
                // First load, no fade necessary
                testimonialSlider.appendChild(newTestimonial);
                newTestimonial.style.opacity = '1';
            }
        }
        
        // Initialize with first testimonial
        showTestimonial(0);
        
        // Change testimonial every 6 seconds
        setInterval(() => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
            showTestimonial(currentTestimonialIndex);
        }, 6000);
    }
    
    // Language switch functionality
    const languageSwitch = document.querySelectorAll('.language-switch a');
    if (languageSwitch) {
        languageSwitch.forEach(lang => {
            lang.addEventListener('click', function(e) {
                if (!this.classList.contains('active')) {
                    // In a real site, this would redirect to the translated version
                    // For now, we'll just toggle the active class for demo purposes
                    languageSwitch.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    }
    
    // Add animation classes when elements come into view
    function animateOnScroll() {
        const elements = document.querySelectorAll('.news-card, .mission-content, .mission-image, .program-card, .civil-box, .network-item, .support-card, .assistance-item, .contact-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Add different animation classes based on element type
            if (elementPosition.top < windowHeight - 50) {
                if (element.classList.contains('news-card') || element.classList.contains('program-card') || element.classList.contains('civil-box')) {
                    element.classList.add('animate-fadeIn');
                } else if (element.classList.contains('mission-content')) {
                    element.classList.add('animate-slideInLeft');
                } else if (element.classList.contains('mission-image')) {
                    element.classList.add('animate-slideInRight');
                } else if (element.classList.contains('network-item') || element.classList.contains('support-card')) {
                    element.classList.add('animate-fadeIn');
                } else if (element.classList.contains('assistance-item') || element.classList.contains('contact-card')) {
                    element.classList.add('animate-fadeIn');
                }
            }
        });
    }
    
    // Run animation check on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Enable staggered animations for grid elements
    const staggerContainers = document.querySelectorAll('.stagger-animation');
    staggerContainers.forEach(container => {
        container.querySelectorAll('*').forEach((element, index) => {
            element.style.animationDelay = `${0.1 * index}s`;
        });
    });
});

// Enhanced Back to top button with smooth appearance
window.addEventListener('scroll', function() {
    // Create or get the back to top button
    let backToTopBtn = document.getElementById('backToTopBtn');
    
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'backToTopBtn';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.style.position = 'fixed';
        backToTopBtn.style.bottom = '20px';
        backToTopBtn.style.right = '20px';
        backToTopBtn.style.zIndex = '99';
        backToTopBtn.style.border = 'none';
        backToTopBtn.style.outline = 'none';
        backToTopBtn.style.backgroundColor = 'var(--secondary-color)';
        backToTopBtn.style.color = 'white';
        backToTopBtn.style.cursor = 'pointer';
        backToTopBtn.style.padding = '15px';
        backToTopBtn.style.borderRadius = '50%';
        backToTopBtn.style.fontSize = '16px';
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
        backToTopBtn.style.transition = 'opacity 0.3s, visibility 0.3s, transform 0.3s';
        backToTopBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add hover effect
        backToTopBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#ff7d2e'; // Lighter shade of secondary color
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 15px rgba(0,0,0,0.2)';
        });
        
        backToTopBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--secondary-color)';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
        });
        
        document.body.appendChild(backToTopBtn);
    }
    
    // Show or hide the button based on scroll position with smoother transition
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
        backToTopBtn.style.transform = 'translateY(0)';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
        backToTopBtn.style.transform = 'translateY(10px)';
    }
}); 