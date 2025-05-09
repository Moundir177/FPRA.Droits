const fs = require('fs');
const path = require('path');

// Process all HTML files
function applyLogoSpecialEffects() {
    try {
        // Get all HTML files
        const directory = './';
        const htmlFiles = fs.readdirSync(directory).filter(file => file.endsWith('.html'));
        console.log(`Found ${htmlFiles.length} HTML files to apply logo special effects...`);
        
        htmlFiles.forEach(file => {
            const filePath = path.join(directory, file);
            console.log(`Applying logo special effects to ${file}...`);
            
            try {
                // Read file content
                let content = fs.readFileSync(filePath, 'utf8');
                let modified = false;
                
                // 1. Add logo-special-effects.css link to the head if not already present
                if (!content.includes('logo-special-effects.css')) {
                    content = content.replace('</head>', '    <link rel="stylesheet" href="css/logo-special-effects.css">\n</head>');
                    console.log(`Added logo-special-effects.css link to ${file}`);
                    modified = true;
                }
                
                // 2. Add badge to the logo if not already present
                const logoBadgePattern = /<div class="dynamic-logo-badge/;
                if (!content.match(logoBadgePattern) && content.includes('dynamic-logo')) {
                    // Find the dynamic logo HTML
                    const logoPattern = /<a href="index\.html" class="dynamic-logo">/;
                    if (content.match(logoPattern)) {
                        // Insert the badge after the logo opening tag
                        content = content.replace(
                            logoPattern,
                            '$&\n                <div class="dynamic-logo-badge" id="logo-badge">Nouveau</div>'
                        );
                        console.log(`Added logo badge to ${file}`);
                        modified = true;
                    }
                }
                
                // 3. Add badge toggle script if not already present
                if (!content.includes('showLogoBadge') && content.includes('dynamic-logo-badge')) {
                    const badgeScript = `
    <!-- Logo Badge Control Script -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Function to show/hide the logo badge based on special events
            function handleLogoBadge() {
                const logoBadge = document.getElementById('logo-badge');
                if (logoBadge) {
                    // Check if there's an active special event (you can customize this logic)
                    const today = new Date();
                    
                    // Example: Show badge for December events
                    if (today.getMonth() === 11) { // December (0-based index)
                        logoBadge.textContent = "Joyeuses Fêtes";
                        logoBadge.classList.add('show');
                    }
                    
                    // Example: Show badge for specific date range (e.g., for an event)
                    const eventStart = new Date('2024-01-15');
                    const eventEnd = new Date('2024-01-30');
                    
                    if (today >= eventStart && today <= eventEnd) {
                        logoBadge.textContent = "Événement";
                        logoBadge.classList.add('show');
                    }
                    
                    // You can add more conditions for other special events
                }
            }
            
            // Run badge logic
            handleLogoBadge();
        });
    </script>`;
                    
                    // Add the badge script before the closing body tag
                    content = content.replace('</body>', `${badgeScript}\n</body>`);
                    console.log(`Added logo badge control script to ${file}`);
                    modified = true;
                }
                
                // Write modified content back to file if changes were made
                if (modified) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`✅ Successfully applied logo special effects to ${file}`);
                } else {
                    console.log(`No special effects needed for ${file}`);
                }
                
            } catch (err) {
                console.error(`❌ Error processing ${file}: ${err.message}`);
            }
        });
        
        console.log('Finished applying logo special effects to all HTML files.');
        
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}

// Run the logo special effects applier
applyLogoSpecialEffects(); 