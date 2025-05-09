const fs = require('fs');
const path = require('path');

// Process all HTML files to add the transparent text fix CSS
const htmlFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));
console.log(`Found ${htmlFiles.length} HTML files to update...`);

// Process HTML files first
let htmlProcessed = 0;
htmlFiles.forEach(file => {
    try {
        console.log(`Processing ${file}...`);
        
        // Read the file
        let content = fs.readFileSync(file, 'utf8');
        
        // Add transparent-text-fix.css if not already present
        if (!content.includes('transparent-text-fix.css')) {
            content = content.replace('</head>', '    <link rel="stylesheet" href="css/transparent-text-fix.css">\n</head>');
            console.log(`✅ Added transparent-text-fix.css to ${file}`);
            
            // Write the modified content back to the file
            fs.writeFileSync(file, content, 'utf8');
            htmlProcessed++;
        } else {
            console.log(`transparent-text-fix.css already present in ${file}`);
        }
    } catch (error) {
        console.error(`Error processing ${file}:`, error);
    }
});

console.log(`HTML processing complete. Added CSS to ${htmlProcessed} files.`);
console.log('Finished updating all HTML files with text color adaptation.');

// Update the scroll handler in dynamic-menu.js to ensure logo color is also properly managed
console.log('\nNow enhancing dynamic-menu.js...');
try {
    const menuJsPath = 'js/dynamic-menu.js';
    if (fs.existsSync(menuJsPath)) {
        console.log('Enhancing dynamic-menu.js with better scroll handling...');
        let menuJsContent = fs.readFileSync(menuJsPath, 'utf8');
        
        // Check if we need to update the scroll handler logic
        if (!menuJsContent.includes('// Enhanced scroll behavior')) {
            // Find the scroll event listener section
            const scrollHandlerRegex = /window\.addEventListener\('scroll', function\(\) \{[\s\S]*?let scrollTop[\s\S]*?lastScrollTop = scrollTop;[\s\S]*?\}\);/;
            
            // Enhanced scroll handler with better state management
            const enhancedScrollHandler = `window.addEventListener('scroll', function() {
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
        
        // Enhanced scroll behavior`;
            
            // Replace the scroll handler with enhanced version
            if (menuJsContent.match(scrollHandlerRegex)) {
                menuJsContent = menuJsContent.replace(scrollHandlerRegex, enhancedScrollHandler);
                fs.writeFileSync(menuJsPath, menuJsContent, 'utf8');
                console.log('✅ Enhanced scroll behavior in dynamic-menu.js');
            } else {
                console.log('⚠️ Could not locate scroll handler in dynamic-menu.js');
            }
        } else {
            console.log('Enhanced scroll behavior already present in dynamic-menu.js');
        }
    } else {
        console.log('⚠️ dynamic-menu.js not found');
    }
} catch (error) {
    console.error('Error updating dynamic-menu.js:', error);
} 