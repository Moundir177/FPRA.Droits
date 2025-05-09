const fs = require('fs');
const path = require('path');

// Process all HTML files
function cleanOldMenus() {
    try {
        // Get all HTML files
        const directory = './';
        const htmlFiles = fs.readdirSync(directory).filter(file => file.endsWith('.html'));
        console.log(`Found ${htmlFiles.length} HTML files to clean...`);
        
        htmlFiles.forEach(file => {
            const filePath = path.join(directory, file);
            console.log(`Processing ${file}...`);
            
            try {
                // Read file content
                let content = fs.readFileSync(filePath, 'utf8');
                let modified = false;
                
                // 1. Remove old menu-backdrop div
                if (content.includes('<div class="menu-backdrop"></div>')) {
                    content = content.replace('<div class="menu-backdrop"></div>', '');
                    console.log(`Removed menu-backdrop from ${file}`);
                    modified = true;
                }
                
                // 2. Remove the old mobile-menu.js script reference
                if (content.includes('<script src="js/mobile-menu.js"></script>')) {
                    content = content.replace('<script src="js/mobile-menu.js"></script>', '');
                    console.log(`Removed mobile-menu.js reference from ${file}`);
                    modified = true;
                }

                // 3. Make sure we don't have multiple headers
                // First count how many headers we have in the file
                const headerCount = (content.match(/<header/g) || []).length;
                
                if (headerCount > 1) {
                    console.log(`Found ${headerCount} headers in ${file}, cleaning...`);
                    
                    // Keep only the dynamic header
                    if (content.includes('<header class="dynamic-header">')) {
                        // Find and remove other headers (those not containing dynamic-header)
                        const regex = /<header(?!.*dynamic-header).*?<\/header>/gs;
                        content = content.replace(regex, '');
                        console.log(`Removed non-dynamic headers from ${file}`);
                        modified = true;
                    }
                }
                
                // Write modified content back to file if changes were made
                if (modified) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`✅ Successfully cleaned ${file}`);
                } else {
                    console.log(`No cleanup needed for ${file}`);
                }
                
            } catch (err) {
                console.error(`❌ Error processing ${file}: ${err.message}`);
            }
        });
        
        console.log('Finished cleaning old menu elements from all HTML files.');
        
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}

// Run the cleaner
cleanOldMenus(); 