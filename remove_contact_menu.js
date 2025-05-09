const fs = require('fs');

try {
    // Read contact.html file
    console.log('Reading contact.html...');
    const content = fs.readFileSync('contact.html', 'utf8');
    
    console.log('Removing header section...');
    
    // Find positions of header tags
    const headerStartPos = content.indexOf('<header>');
    const headerEndPos = content.indexOf('</header>') + '</header>'.length;
    
    if (headerStartPos === -1 || headerEndPos === -1) {
        console.log('Header tags not found in the file.');
        process.exit(1);
    }
    
    // Extract parts before and after header
    const beforeHeader = content.substring(0, headerStartPos);
    const afterHeader = content.substring(headerEndPos);
    
    // Create new content without header
    let newContent = beforeHeader + afterHeader;
    
    // Remove menu backdrop div
    const backdropPos = newContent.indexOf('<div class="menu-backdrop"></div>');
    if (backdropPos !== -1) {
        console.log('Removing menu backdrop div...');
        newContent = newContent.substring(0, backdropPos) + 
                     newContent.substring(backdropPos + '<div class="menu-backdrop"></div>'.length);
    }
    
    // Remove mobile-menu.js script reference
    const scriptTag = '<script src="js/mobile-menu.js"></script>';
    const scriptPos = newContent.indexOf(scriptTag);
    if (scriptPos !== -1) {
        console.log('Removing mobile-menu.js reference...');
        newContent = newContent.substring(0, scriptPos) + 
                     newContent.substring(scriptPos + scriptTag.length);
    }
    
    // Write modified content back to file
    console.log('Writing changes to contact.html...');
    fs.writeFileSync('contact.html', newContent, 'utf8');
    
    console.log('✅ Successfully removed navigation from contact.html');
} catch (error) {
    console.error(`Error: ${error.message}`);
} 