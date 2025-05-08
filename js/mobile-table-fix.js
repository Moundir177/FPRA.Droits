// Script to enhance table responsiveness on mobile devices
document.addEventListener('DOMContentLoaded', function() {
    // Find all tables in the document
    const tables = document.querySelectorAll('table');
    
    // Process each table
    tables.forEach(function(table) {
        // If not already wrapped in a responsive container
        if (!table.parentElement || !table.parentElement.classList.contains('table-responsive')) {
            // Create wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'table-responsive';
            
            // Insert wrapper in DOM
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
            
            // Add swipe indicator
            const indicator = document.createElement('div');
            indicator.className = 'swipe-indicator';
            indicator.innerHTML = '<i class="fas fa-arrows-left-right"></i><span>Faites défiler horizontalement</span>';
            indicator.style.cssText = 'display: none; text-align: center; padding: 5px; color: #666; font-size: 0.85rem; margin-bottom: 5px;';
            
            // RTL support
            if (document.body.classList.contains('rtl')) {
                indicator.innerHTML = '<i class="fas fa-arrows-left-right"></i><span>مرر أفقيًا</span>';
            }
            
            wrapper.parentNode.insertBefore(indicator, wrapper);
        }
    });
    
    // Check table overflow
    function checkOverflow() {
        const isMobile = window.innerWidth < 768;
        document.querySelectorAll('.swipe-indicator').forEach(function(indicator) {
            const container = indicator.nextElementSibling;
            if (container && container.classList.contains('table-responsive')) {
                const table = container.querySelector('table');
                if (table) {
                    const isOverflowing = table.offsetWidth > container.offsetWidth;
                    indicator.style.display = (isMobile && isOverflowing) ? 'block' : 'none';
                }
            }
        });
    }
    
    // Initial check and on resize
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
}); 