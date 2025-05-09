const fs = require('fs');
const path = require('path');

// Process all HTML files
function enhanceLogo() {
    try {
        // Get all HTML files
        const directory = './';
        const htmlFiles = fs.readdirSync(directory).filter(file => file.endsWith('.html'));
        console.log(`Found ${htmlFiles.length} HTML files to enhance logo...`);
        
        htmlFiles.forEach(file => {
            const filePath = path.join(directory, file);
            console.log(`Enhancing logo in ${file}...`);
            
            try {
                // Read file content
                let content = fs.readFileSync(filePath, 'utf8');
                let modified = false;
                
                // 1. Add logo-enhancement.css link to the head if not already present
                if (!content.includes('logo-enhancement.css')) {
                    content = content.replace('</head>', '    <link rel="stylesheet" href="css/logo-enhancement.css">\n</head>');
                    console.log(`Added logo-enhancement.css link to ${file}`);
                    modified = true;
                }
                
                // 2. Update the dynamic-logo with enhanced version
                const oldLogoPattern = /<a href="index\.html" class="dynamic-logo">[\s\S]*?<\/a>/;
                const enhancedLogo = `<a href="index.html" class="dynamic-logo">
                <img src="img/path742.png" alt="Fondation pour la promotion des droits" aria-hidden="true">
                <div class="dynamic-logo-text">
                    <strong>Fondation</strong>
                    <span>Pour la promotion des droits</span>
                </div>
                <span class="visually-hidden">Fondation pour la promotion des droits</span>
            </a>`;
                
                if (content.match(oldLogoPattern)) {
                    content = content.replace(oldLogoPattern, enhancedLogo);
                    console.log(`Updated logo HTML in ${file}`);
                    modified = true;
                }
                
                // 3. Add a transparent logo version for better contrast on dark backgrounds
                if (!content.includes('logo-inverse')) {
                    const logoScriptCode = `
    <!-- Dynamic Logo Color Script -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const dynamicHeader = document.querySelector('.dynamic-header');
            const logoImg = document.querySelector('.dynamic-logo img');
            const originalLogoSrc = logoImg.getAttribute('src');
            
            // Change logo color based on scroll position
            window.addEventListener('scroll', function() {
                if (dynamicHeader.classList.contains('scrolled')) {
                    // Original logo (dark version) for white background
                    if (logoImg.getAttribute('src') !== originalLogoSrc) {
                        logoImg.setAttribute('src', originalLogoSrc);
                    }
                } else {
                    // Use lighter version with drop shadow for better visibility on transparent background
                    logoImg.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))';
                }
            });
        });
    </script>`;
                    
                    // Add the logo script before the closing body tag
                    content = content.replace('</body>', `${logoScriptCode}\n</body>`);
                    console.log(`Added dynamic logo color script to ${file}`);
                    modified = true;
                }
                
                // Write modified content back to file if changes were made
                if (modified) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`✅ Successfully enhanced logo in ${file}`);
                } else {
                    console.log(`No logo enhancements needed for ${file}`);
                }
                
            } catch (err) {
                console.error(`❌ Error processing ${file}: ${err.message}`);
            }
        });
        
        console.log('Finished enhancing logo in all HTML files.');
        
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}

// Run the logo enhancer
enhanceLogo(); 