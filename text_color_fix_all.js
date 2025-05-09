// Add transparent text CSS to all HTML files
const fs = require('fs');
const path = require('path');

// Ensure the CSS file exists
const textFixCssPath = 'css/transparent-text-fix.css';
const cssContent = `/* Text color adaptation for better visibility */

/* When header is transparent (not scrolled) */
.dynamic-header:not(.scrolled) .dynamic-nav-menu > li > a {
    color: white;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.dynamic-header:not(.scrolled) .dropdown-toggle::after {
    color: white;
}

.dynamic-header:not(.scrolled) .dynamic-lang-switch a {
    color: white;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.dynamic-header:not(.scrolled) .dynamic-lang-switch {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
}

/* Keep active state visible on transparent background */
.dynamic-header:not(.scrolled) .dynamic-nav-menu a.active,
.dynamic-header:not(.scrolled) .dynamic-nav-menu .active-parent > a {
    color: white;
    font-weight: 600;
}

/* Menu toggle for mobile */
.dynamic-header:not(.scrolled) .dynamic-menu-toggle span {
    background-color: white;
}

/* Logo text in transparent mode */
.dynamic-header:not(.scrolled) .dynamic-logo-text strong,
.dynamic-header:not(.scrolled) .dynamic-logo-text span {
    color: white;
}

/* When scrolled, keep the original colors (defaults to black text) */`;

// Make sure the CSS directory exists
if (!fs.existsSync('css')) {
    fs.mkdirSync('css');
}

// Write/update the CSS file
fs.writeFileSync(textFixCssPath, cssContent, 'utf8');
console.log(`✅ Created/updated ${textFixCssPath}`);

// Process all HTML files
const htmlFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));
console.log(`Found ${htmlFiles.length} HTML files to update...`);

let processedCount = 0;
htmlFiles.forEach(file => {
    try {
        console.log(`Processing ${file}...`);
        
        // Read the file
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if the CSS is already included
        if (!content.includes('transparent-text-fix.css')) {
            // Find position to insert the CSS link
            // We'll add it right before </head>
            const headCloseIndex = content.indexOf('</head>');
            
            if (headCloseIndex !== -1) {
                // Insert the CSS link
                const cssLinkTag = '    <link rel="stylesheet" href="css/transparent-text-fix.css">\n';
                content = content.slice(0, headCloseIndex) + cssLinkTag + content.slice(headCloseIndex);
                
                // Write the modified content back
                fs.writeFileSync(file, content, 'utf8');
                console.log(`✅ Added CSS link to ${file}`);
                processedCount++;
            } else {
                console.log(`❌ Could not find </head> in ${file}`);
            }
        } else {
            console.log(`ℹ️ CSS already included in ${file}`);
        }
    } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
    }
});

console.log(`\nSummary: Added CSS link to ${processedCount} of ${htmlFiles.length} HTML files.`);
console.log('All HTML files now support text color adaptation based on header transparency.'); 