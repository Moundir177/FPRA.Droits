// adjust_header_spacing.js
const fs = require('fs');
const path = require('path');

// Create or update dynamic-header-fix.css file
const cssContent = `/* Improved header spacing and balance */
.dynamic-header-inner {
    padding: 0 20px;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1300px;
}

/* Adjust logo spacing */
.dynamic-logo {
    margin-right: 15px;
}

/* Ensure language switcher is visible and properly spaced */
.dynamic-lang-switch {
    margin-left: 20px;
    margin-right: 0;
    min-width: 100px;
    justify-content: space-around;
}

/* Add extra padding to the left on mobile */
@media (max-width: 991px) {
    .dynamic-header-inner {
        padding: 0 15px;
    }
    
    /* Keep language switcher visible on mobile */
    .dynamic-lang-switch {
        display: flex !important;
        margin-right: 15px;
    }
}`;

// Write CSS file
fs.writeFileSync('css/dynamic-header-fix.css', cssContent, 'utf8');
console.log('✅ Created css/dynamic-header-fix.css');

// Process all HTML files to add the new CSS
const htmlFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));
console.log(`Found ${htmlFiles.length} HTML files to update...`);

htmlFiles.forEach(file => {
    try {
        console.log(`Processing ${file}...`);
        
        // Read the file
        let content = fs.readFileSync(file, 'utf8');
        
        // Add dynamic-header-fix.css if not already present
        if (!content.includes('dynamic-header-fix.css')) {
            content = content.replace('</head>', '    <link rel="stylesheet" href="css/dynamic-header-fix.css">\n</head>');
            console.log(`✅ Added dynamic-header-fix.css to ${file}`);
            
            // Write the modified content back to the file
            fs.writeFileSync(file, content, 'utf8');
        } else {
            console.log(`dynamic-header-fix.css already present in ${file}`);
        }
    } catch (error) {
        console.error(`Error processing ${file}:`, error);
    }
});

console.log('Finished updating all HTML files with improved header spacing.'); 