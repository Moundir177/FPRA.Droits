const fs = require('fs');
const path = require('path');

// List of all HTML files to update
const htmlFiles = [
    'index.html',
    'about.html',
    'news.html',
    'revue.html',
    'formations.html',
    'resources.html',
    'testimonials.html',
    'gallery.html',
    'contact.html',
    'civil-society.html'
];

// Pages that need table responsiveness
const pagesWithTables = [
    'formations.html',
    'resources.html',
    'revue.html'
];

// Function to update a single HTML file
function updateFile(filePath) {
    try {
        console.log(`Processing file: ${filePath}`);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add CSS file if not already present
        if (!content.includes('mobile-responsive.css')) {
            content = content.replace(
                /(<link rel="stylesheet" href="css\/footer-fix\.css">)/,
                '$1\n    <link rel="stylesheet" href="css/mobile-responsive.css">'
            );
        }
        
        // Add mobile menu JS file if not already present
        if (!content.includes('mobile-menu.js')) {
            content = content.replace(
                /(<script src="js\/script\.js"><\/script>)/,
                '$1\n    <script src="js/mobile-menu.js"></script>'
            );
        }
        
        // Add mobile table fix JS file for pages with tables
        if (pagesWithTables.includes(filePath) && !content.includes('mobile-table-fix.js')) {
            content = content.replace(
                /(<script src="js\/mobile-menu\.js"><\/script>)/,
                '$1\n    <script src="js/mobile-table-fix.js"></script>'
            );
        }
        
        // Add menu backdrop div if not present
        if (!content.includes('menu-backdrop')) {
            content = content.replace(
                /(<body>[\s\S]*?)(<header>)/,
                '$1\n    <!-- Menu backdrop for mobile navigation -->\n    <div class="menu-backdrop"></div>\n    \n    $2'
            );
        }
        
        // Ensure menu toggle has aria-expanded attribute
        content = content.replace(
            /(<div class="menu-toggle">[\s\S]*?<i class="fas fa-bars"><\/i>[\s\S]*?<\/div>)/,
            '<div class="menu-toggle" aria-expanded="false" aria-label="Toggle navigation">\n            <i class="fas fa-bars"></i>\n        </div>'
        );
        
        // Add table responsiveness for formations.html and resources.html
        if (pagesWithTables.includes(filePath)) {
            // Wrap tables in responsive containers
            content = content.replace(
                /(<table(?:\s+[^>]*)?>[\s\S]*?<\/table>)/g,
                '<div class="table-responsive">$1</div>'
            );
            
            // Add responsive meta viewport
            if (!content.includes('width=device-width, initial-scale=1.0')) {
                content = content.replace(
                    /<meta charset="UTF-8">/,
                    '<meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">'
                );
            }
        }
        
        // Write updated content back to file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Successfully updated ${filePath}`);
    } catch (error) {
        console.error(`Error updating ${filePath}: ${error.message}`);
    }
}

// Update all HTML files
htmlFiles.forEach(file => {
    updateFile(file);
});

console.log('All HTML files have been updated with mobile responsiveness improvements.'); 