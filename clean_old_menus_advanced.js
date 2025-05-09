const fs = require('fs');
const path = require('path');

// Process all HTML files
function deepCleanMenus() {
    try {
        // Get all HTML files
        const directory = './';
        const htmlFiles = fs.readdirSync(directory).filter(file => file.endsWith('.html'));
        console.log(`Found ${htmlFiles.length} HTML files to deep clean...`);
        
        htmlFiles.forEach(file => {
            const filePath = path.join(directory, file);
            console.log(`Deep cleaning ${file}...`);
            
            try {
                // Read file content
                let content = fs.readFileSync(filePath, 'utf8');
                let modified = false;
                
                // 1. Keep only dynamic-header, remove all other headers
                // This will handle cases where there are remnants of old headers
                if (content.includes('<header class="dynamic-header">')) {
                    // Extract the dynamic header content
                    const dynamicHeaderMatch = content.match(/<header class="dynamic-header">[\s\S]*?<\/header>/);
                    const dynamicHeader = dynamicHeaderMatch ? dynamicHeaderMatch[0] : null;
                    
                    if (dynamicHeader) {
                        // Remove all header tags
                        content = content.replace(/<header[\s\S]*?<\/header>/g, '');
                        
                        // Re-insert the dynamic header after the skip-link
                        if (content.includes('<a href="#content" class="skip-link"')) {
                            content = content.replace(
                                /<a href="#content" class="skip-link".*?<\/a>/s,
                                '$&\n' + dynamicHeader
                            );
                            console.log(`Re-applied dynamic header to ${file}`);
                            modified = true;
                        }
                    }
                }
                
                // 2. Remove old menu-backdrop div (enhanced)
                if (content.includes('menu-backdrop')) {
                    content = content.replace(/<div[^>]*class="[^"]*menu-backdrop[^"]*"[^>]*><\/div>/g, '');
                    console.log(`Removed all menu-backdrop divs from ${file}`);
                    modified = true;
                }
                
                // 3. Remove old menu-toggle elements
                if (content.includes('menu-toggle') && !content.includes('dynamic-menu-toggle')) {
                    content = content.replace(/<div[^>]*class="[^"]*menu-toggle[^"]*"[^>]*>[\s\S]*?<\/div>/g, '');
                    console.log(`Removed old menu-toggle elements from ${file}`);
                    modified = true;
                }
                
                // 4. Remove old language-switch elements that aren't part of dynamic menu
                if (content.includes('language-switch') && !content.includes('dynamic-lang-switch')) {
                    content = content.replace(/<div[^>]*class="[^"]*language-switch[^"]*"[^>]*>[\s\S]*?<\/div>/g, '');
                    console.log(`Removed old language-switch elements from ${file}`);
                    modified = true;
                }
                
                // 5. Remove any reference to mobile-menu.js or related scripts
                if (content.includes('mobile-menu.js')) {
                    content = content.replace(/<script[^>]*src="[^"]*mobile-menu[^"]*"[^>]*><\/script>/g, '');
                    console.log(`Removed all mobile-menu script references from ${file}`);
                    modified = true;
                }
                
                // 6. Check for duplicate dynamic-header elements
                const dynamicHeaderCount = (content.match(/<header class="dynamic-header">/g) || []).length;
                if (dynamicHeaderCount > 1) {
                    console.log(`Found ${dynamicHeaderCount} dynamic headers in ${file}, fixing...`);
                    
                    // Extract the first dynamic header
                    const dynamicHeaderMatch = content.match(/<header class="dynamic-header">[\s\S]*?<\/header>/);
                    const firstDynamicHeader = dynamicHeaderMatch ? dynamicHeaderMatch[0] : null;
                    
                    if (firstDynamicHeader) {
                        // Remove all dynamic headers
                        content = content.replace(/<header class="dynamic-header">[\s\S]*?<\/header>/g, '');
                        
                        // Re-insert the first dynamic header after the skip-link
                        if (content.includes('<a href="#content" class="skip-link"')) {
                            content = content.replace(
                                /<a href="#content" class="skip-link".*?<\/a>/s,
                                '$&\n' + firstDynamicHeader
                            );
                            console.log(`Fixed duplicate dynamic headers in ${file}`);
                            modified = true;
                        }
                    }
                }
                
                // 7. Make sure dynamic-menu.js is present
                if (!content.includes('dynamic-menu.js')) {
                    content = content.replace('</body>', '    <script src="js/dynamic-menu.js"></script>\n</body>');
                    console.log(`Added dynamic-menu.js reference to ${file}`);
                    modified = true;
                }
                
                // 8. Make sure dynamic-menu.css is linked
                if (!content.includes('dynamic-menu.css')) {
                    content = content.replace('</head>', '    <link rel="stylesheet" href="css/dynamic-menu.css">\n</head>');
                    console.log(`Added dynamic-menu.css reference to ${file}`);
                    modified = true;
                }
                
                // Write modified content back to file if changes were made
                if (modified) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`✅ Successfully deep cleaned ${file}`);
                } else {
                    console.log(`No deep cleanup needed for ${file}`);
                }
                
            } catch (err) {
                console.error(`❌ Error processing ${file}: ${err.message}`);
            }
        });
        
        console.log('Finished deep cleaning menu elements from all HTML files.');
        
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}

// Run the deep cleaner
deepCleanMenus(); 