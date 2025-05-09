const fs = require('fs');

// Read the content of contact.html
let content = fs.readFileSync('contact.html', 'utf8');

// Remove the header section
if (content.includes('<header>') && content.includes('</header>')) {
    const beforeHeader = content.split('<header>')[0];
    const afterHeader = content.split('</header>')[1];
    
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
    fs.writeFileSync('contact.html', newContent, 'utf8');
    console.log('Successfully removed navigation from contact.html');
} else {
    console.log('Header section not found in contact.html');
} 