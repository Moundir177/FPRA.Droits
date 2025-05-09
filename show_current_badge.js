const fs = require('fs');
const path = require('path');

// Process all HTML files
function showCurrentBadge() {
    try {
        // Get all HTML files
        const directory = './';
        const htmlFiles = fs.readdirSync(directory).filter(file => file.endsWith('.html'));
        console.log(`Found ${htmlFiles.length} HTML files to update badge...`);
        
        const today = new Date();
        let badgeText = "";
        let shouldShow = true;
        
        // Determine which badge to show based on the current date
        const currentMonth = today.getMonth(); // 0-based (0 = January, 11 = December)
        
        if (currentMonth === 11) { // December
            badgeText = "Joyeuses Fêtes";
        } else if (currentMonth === 0) { // January
            badgeText = "Bonne Année";
        } else if (currentMonth === 2 && today.getDate() === 8) { // March 8
            badgeText = "Journée des Femmes";
        } else if (currentMonth === 4 && today.getDate() === 1) { // May 1
            badgeText = "Fête du Travail";
        } else if (currentMonth === 6 || currentMonth === 7) { // July-August
            badgeText = "Session d'Été";
        } else if (currentMonth === 9) { // October
            badgeText = "Nouveau Programme";
        } else {
            // For demonstration, always show a badge with current month
            const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
                               "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
            badgeText = monthNames[currentMonth];
        }
        
        htmlFiles.forEach(file => {
            const filePath = path.join(directory, file);
            console.log(`Updating badge in ${file}...`);
            
            try {
                // Read file content
                let content = fs.readFileSync(filePath, 'utf8');
                let modified = false;
                
                // Update badge script to always show the current badge
                const badgeHandlerPattern = /function handleLogoBadge\(\) \{[\s\S]*?\}/;
                const updatedBadgeHandler = `function handleLogoBadge() {
                const logoBadge = document.getElementById('logo-badge');
                if (logoBadge) {
                    // Always show current badge
                    logoBadge.textContent = "${badgeText}";
                    logoBadge.classList.add('show');
                    
                    // Add current month class for styling
                    logoBadge.className = 'dynamic-logo-badge show month-${currentMonth + 1}';
                }
            }`;
                
                if (content.match(badgeHandlerPattern)) {
                    content = content.replace(badgeHandlerPattern, updatedBadgeHandler);
                    console.log(`Updated badge handler in ${file}`);
                    modified = true;
                }
                
                // If the script wasn't updated because the pattern didn't match,
                // try another approach with a simpler script replacement
                if (!modified && content.includes('Logo Badge Control Script')) {
                    const simpleBadgeScript = `
    <!-- Logo Badge Control Script -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const logoBadge = document.getElementById('logo-badge');
            if (logoBadge) {
                logoBadge.textContent = "${badgeText}";
                logoBadge.classList.add('show');
                logoBadge.className = 'dynamic-logo-badge show month-${currentMonth + 1}';
            }
        });
    </script>`;
                    
                    // Replace the entire badge script
                    content = content.replace(/<!-- Logo Badge Control Script -->[\s\S]*?<\/script>/g, simpleBadgeScript);
                    console.log(`Replaced badge script in ${file}`);
                    modified = true;
                }
                
                // Add additional CSS for month-specific badge colors
                if (content.includes('logo-special-effects.css') && !content.includes('month-badge-colors')) {
                    const badgeColorsStyle = `
    <!-- Month-specific badge colors -->
    <style id="month-badge-colors">
        .dynamic-logo-badge.month-1 { background-color: #1E88E5; } /* January - Blue */
        .dynamic-logo-badge.month-2 { background-color: #E91E63; } /* February - Pink */
        .dynamic-logo-badge.month-3 { background-color: #43A047; } /* March - Green */
        .dynamic-logo-badge.month-4 { background-color: #7B1FA2; } /* April - Purple */
        .dynamic-logo-badge.month-5 { background-color: #EF6C00; } /* May - Orange */
        .dynamic-logo-badge.month-6 { background-color: #C0CA33; } /* June - Lime */
        .dynamic-logo-badge.month-7 { background-color: #FF5722; } /* July - Deep Orange */
        .dynamic-logo-badge.month-8 { background-color: #00ACC1; } /* August - Cyan */
        .dynamic-logo-badge.month-9 { background-color: #FFC107; } /* September - Amber */
        .dynamic-logo-badge.month-10 { background-color: #795548; } /* October - Brown */
        .dynamic-logo-badge.month-11 { background-color: #3949AB; } /* November - Indigo */
        .dynamic-logo-badge.month-12 { background-color: #D32F2F; } /* December - Red */
    </style>`;
                    
                    // Add badge colors style before the closing head tag
                    content = content.replace('</head>', `${badgeColorsStyle}\n</head>`);
                    console.log(`Added month-specific badge colors to ${file}`);
                    modified = true;
                }
                
                // Write modified content back to file if changes were made
                if (modified) {
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`✅ Successfully updated badge in ${file}`);
                } else {
                    console.log(`No badge updates needed for ${file}`);
                }
                
            } catch (err) {
                console.error(`❌ Error processing ${file}: ${err.message}`);
            }
        });
        
        console.log(`Finished updating badge to "${badgeText}" in all HTML files.`);
        
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}

// Run the badge updater
showCurrentBadge(); 