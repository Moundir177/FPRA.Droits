// This is a Node.js script to update all HTML files with translation support
// It should be run with: node update_all_pages.js

const fs = require('fs');
const path = require('path');

// Get all HTML files
const htmlFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));
console.log(`Found ${htmlFiles.length} HTML files to update`);

// Updates to add to each file
const HEAD_ADDITIONS = `
    <link rel="stylesheet" href="css/rtl-styles.css">
    <script src="js/translations.js"></script>`;

const LANGUAGE_SWITCHER = `
            <div class="language-switch">
                <a href="#" data-lang="fr" class="active">FR</a>
                <a href="#" data-lang="ar">AR</a>
            </div>`;

// Process each file
htmlFiles.forEach(htmlFile => {
    console.log(`Processing ${htmlFile}...`);
    
    // Read file content
    let content = fs.readFileSync(htmlFile, 'utf8');
    
    // Check if file already has translation support
    if (content.includes('translations.js')) {
        console.log(`  - ${htmlFile} already has translation support.`);
    } else {
        // Add translation script to head
        content = content.replace('</head>', `${HEAD_ADDITIONS}\n</head>`);
        
        // Update language switcher if exists
        if (content.includes('class="language-switch"')) {
            content = content.replace(/<div class="language-switch">[\s\S]*?<\/div>/m, LANGUAGE_SWITCHER);
        }
        
        // Write updated content back to file
        fs.writeFileSync(htmlFile, content, 'utf8');
        console.log(`  - Updated ${htmlFile} with translation support.`);
    }
});

console.log('All HTML files updated successfully!'); 