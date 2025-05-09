const fs = require('fs');

// Files where we should keep the newsletter section (contact.html contains the version to keep)
const filesToKeep = ['contact.html'];

// Find all HTML files
const htmlFiles = fs.readdirSync('.')
    .filter(file => file.endsWith('.html') && !filesToKeep.includes(file));

console.log(`Found ${htmlFiles.length} HTML files to process (excluding ${filesToKeep.join(', ')})`);

// Special case for civil-society.html which has a different style newsletter section
const processFile = (file) => {
    console.log(`Processing ${file}...`);
    const content = fs.readFileSync(file, 'utf8');
    let newContent;
    
    // Check if it's the civil-society.html file which has a differently styled newsletter section
    if (file === 'civil-society.html') {
        // Pattern for the light background newsletter section in civil-society.html
        const pattern = /<section class="newsletter"[^>]*?>[^]*?<\/section>/i;
        newContent = content.replace(pattern, '');
    } else {
        // Pattern for the blue gradient newsletter sections in other files
        const pattern = /<section class="newsletter" id="newsletter"[^>]*?>[^]*?<\/section>/i;
        newContent = content.replace(pattern, '');
    }
    
    // Check if we made changes
    if (newContent !== content) {
        // Write the updated content
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Removed newsletter section from ${file} (${content.length - newContent.length} bytes removed)`);
    } else {
        console.log(`No newsletter section found in ${file}`);
    }
};

// Process each file
htmlFiles.forEach(processFile);

console.log('Finished removing newsletter sections.'); 