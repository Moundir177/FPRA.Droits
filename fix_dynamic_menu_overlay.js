const fs = require('fs');
const path = require('path');

// Process all HTML files
function fixMenuOverlay() {
    try {
        // Get all HTML files
        const directory = './';
        const htmlFiles = fs.readdirSync(directory).filter(file => file.endsWith('.html'));
        console.log(`Found ${htmlFiles.length} HTML files to fix menu overlay...`);
        
        htmlFiles.forEach(file => {
            const filePath = path.join(directory, file);
            console.log(`Fixing menu overlay in ${file}...`);
            
            try {
                // Read file content
                let content = fs.readFileSync(filePath, 'utf8');
                let modified = false;
                
                // Make sure we have exactly one dynamic-menu-overlay and it's correctly placed
                const overlayCount = (content.match(/<div class="dynamic-menu-overlay"><\/div>/g) || []).length;
                
                if (overlayCount === 0) {
                    // If no overlay is found, add it after the dynamic header
                    if (content.includes('<header class="dynamic-header">')) {
                        const headerPattern = /<header class="dynamic-header">[\s\S]*?<\/header>/;
                        content = content.replace(
                            headerPattern,
                            '$&\n    <!-- Menu Overlay for Mobile -->\n    <div class="dynamic-menu-overlay"></div>'
                        );
                        console.log(`Added missing dynamic-menu-overlay to ${file}`);
                        modified = true;
                    }
                } else if (overlayCount > 1) {
                    // If multiple overlays are found, remove all and add a single one
                    content = content.replace(/<div class="dynamic-menu-overlay"><\/div>/g, '');
                    
                    if (content.includes('<header class="dynamic-header">')) {
                        const headerPattern = /<header class="dynamic-header">[\s\S]*?<\/header>/;
                        content = content.replace(
                            headerPattern,
                            '$&\n    <!-- Menu Overlay for Mobile -->\n    <div class="dynamic-menu-overlay"></div>'
                        );
                        console.log(`Fixed duplicate dynamic-menu-overlay in ${file}`);
                        modified = true;
                    }
                }
                
                // Make sure we have proper RTL support for the menu
                if (!content.includes("html[dir='rtl']") && content.includes('dynamic-header')) {
                    // Add RTL styles for the dynamic menu
                    const rtlStyles = `
    <!-- RTL Support for Dynamic Menu -->
    <style>
        html[dir='rtl'] .dynamic-nav-menu > li > a::after {
            left: auto;
            right: 50%;
            transform: translateX(50%);
        }
        
        html[dir='rtl'] .dropdown-menu {
            left: auto;
            right: 0;
        }
        
        html[dir='rtl'] .dropdown-toggle::after {
            margin-left: 0;
            margin-right: 5px;
        }
        
        html[dir='rtl'] .dynamic-lang-switch {
            margin-left: 0;
            margin-right: 20px;
        }
        
        @media (max-width: 991px) {
            html[dir='rtl'] .dynamic-nav-menu {
                right: auto;
                left: -280px;
            }
            
            html[dir='rtl'] .dynamic-nav-menu.active {
                right: auto;
                left: 0;
            }
            
            html[dir='rtl'] .dropdown-menu a {
                padding: 12px 35px 12px 25px;
            }
            
            html[dir='rtl'] .dropdown-toggle::after {
                right: auto;
                left: 25px;
            }
        }
    </style>`;
                    
                    // Add the RTL styles before the closing head tag
                    content = content.replace('</head>', `${rtlStyles}\n</head>`);
                    console.log(`Added RTL support for dynamic menu in ${file}`);
                    modified = true;
                }
                
                // Write modified content back to file if changes were made
                if (modified) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`✅ Successfully fixed ${file}`);
                } else {
                    console.log(`No overlay fixes needed for ${file}`);
                }
                
            } catch (err) {
                console.error(`❌ Error processing ${file}: ${err.message}`);
            }
        });
        
        console.log('Finished fixing menu overlay in all HTML files.');
        
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}

// Run the overlay fixer
fixMenuOverlay(); 