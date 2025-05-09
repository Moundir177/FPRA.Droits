const fs = require('fs');
const path = require('path');

// Process all HTML files
const htmlFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));
console.log(`Found ${htmlFiles.length} HTML files to check...`);

let updated = 0;

// Process each HTML file
htmlFiles.forEach(file => {
    try {
        console.log(`Processing ${file}...`);
        
        // Read the file content
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if transparent-text-fix.css is already included
        if (!content.includes('transparent-text-fix.css')) {
            // Add the CSS reference before </head>
            content = content.replace('</head>', '    <link rel="stylesheet" href="css/transparent-text-fix.css">\n</head>');
            
            // Write the updated content back to the file
            fs.writeFileSync(file, content, 'utf8');
            console.log(`✅ Added transparent-text-fix.css to ${file}`);
            updated++;
        } else {
            console.log(`ℹ️ transparent-text-fix.css already included in ${file}`);
        }
    } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
    }
});

console.log(`\n=== Update Complete ===`);
console.log(`Updated ${updated} HTML files with mobile text color fix.`);
console.log(`All HTML files now have proper mobile text color handling in the sidebar.`); 