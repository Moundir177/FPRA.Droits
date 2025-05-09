const fs = require('fs');
const path = require('path');

// Function to remove header section from HTML content
function removeHeaderSection(content) {
    try {
        // Check if the file has a header section
        if (!content.includes('<header>') || !content.includes('</header>')) {
            return { success: false, error: 'No header section found', content };
        }

        const parts = content.split('<header>');
        if (parts.length !== 2) {
            return { success: false, error: 'Multiple or malformed header tags', content };
        }

        const beforeHeader = parts[0];
        const afterHeaderParts = parts[1].split('</header>');
        
        if (afterHeaderParts.length < 2) {
            return { success: false, error: 'Missing closing header tag', content };
        }

        let newContent = beforeHeader + afterHeaderParts[1];

        // Remove the menu backdrop div if it exists
        if (newContent.includes('<div class="menu-backdrop"></div>')) {
            newContent = newContent.replace('<div class="menu-backdrop"></div>', '');
        }

        // Remove the mobile-menu.js script reference
        if (newContent.includes('<script src="js/mobile-menu.js"></script>')) {
            newContent = newContent.replace('<script src="js/mobile-menu.js"></script>', '');
        }

        return { success: true, content: newContent };
    } catch (error) {
        return { success: false, error: error.message, content };
    }
}

// Main function to process all HTML files
function processAllHtmlFiles() {
    try {
        // Get all HTML files in the directory
        const directory = './';
        const files = fs.readdirSync(directory);
        const htmlFiles = files.filter(file => file.endsWith('.html'));

        console.log(`Found ${htmlFiles.length} HTML files to process...`);

        // Process each HTML file
        htmlFiles.forEach(file => {
            const filePath = path.join(directory, file);
            
            console.log(`Processing ${file}...`);
            
            try {
                // Read file content
                const content = fs.readFileSync(filePath, 'utf8');
                
                // Remove header section
                const result = removeHeaderSection(content);
                
                if (result.success) {
                    // Write modified content back to file
                    fs.writeFileSync(filePath, result.content, 'utf8');
                    console.log(`✅ Successfully removed navigation from ${file}`);
                } else {
                    console.log(`❌ Failed to process ${file}: ${result.error}`);
                }
            } catch (error) {
                console.error(`❌ Error processing ${file}: ${error.message}`);
            }
        });

        console.log('Finished processing all HTML files.');
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// Run the main function
processAllHtmlFiles(); 