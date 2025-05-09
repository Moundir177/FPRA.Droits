const fs = require('fs');
const path = require('path');

// Get all HTML files in the directory
const directory = './';
const htmlFiles = fs.readdirSync(directory).filter(file => file.endsWith('.html'));

console.log('Starting to remove navigation from HTML files...');

// Process each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(directory, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file has a header section
    if (content.includes('<header>')) {
        console.log(`Processing ${file}...`);
        
        // Remove the entire header section
        const beforeHeader = content.split('<header>')[0];
        let afterHeader = '';
        
        if (content.includes('</header>')) {
            afterHeader = content.split('</header>')[1];
        }
        
        // Remove the menu backdrop div if it exists
        let newContent = beforeHeader + afterHeader;
        if (newContent.includes('<div class="menu-backdrop"></div>')) {
            newContent = newContent.replace('<div class="menu-backdrop"></div>', '');
        }
        
        // Remove the mobile-menu.js script reference
        if (newContent.includes('<script src="js/mobile-menu.js"></script>')) {
            newContent = newContent.replace('<script src="js/mobile-menu.js"></script>', '');
        }
        
        // Write the modified content back to the file
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Successfully removed navigation from ${file}`);
    } else {
        console.log(`No header found in ${file}, skipping...`);
    }
});

console.log('Finished removing navigation from all HTML files.'); 