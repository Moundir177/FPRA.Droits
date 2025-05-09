const fs = require('fs');

// Get all HTML files in the directory
const htmlFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));

console.log(`Found ${htmlFiles.length} HTML files to process...`);

// Correct Logo Badge Control Script
const correctScript = `
    <!-- Logo Badge Control Script -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Function to show/hide the logo badge based on special events
            function handleLogoBadge() {
                const logoBadge = document.getElementById('logo-badge');
                if (logoBadge) {
                    const today = new Date();
                    
                    // Always show current badge
                    logoBadge.textContent = "Mai";
                    logoBadge.classList.add('show');
                    
                    // Add current month class for styling
                    logoBadge.className = 'dynamic-logo-badge show month-5';
                    
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
    </script>
`;

htmlFiles.forEach(file => {
    try {
        console.log(`Processing ${file}...`);
        
        // Read the file
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if the file has the problematic script sections
        if (content.includes('<!-- Logo Badge Control Script -->')) {
            // Replace all Logo Badge Control Script sections with the correct one
            const regex = /<!-- Logo Badge Control Script -->[\s\S]*?<\/script>/g;
            const matches = content.match(regex) || [];
            
            if (matches.length > 0) {
                // Replace the first instance with the correct script
                content = content.replace(matches[0], correctScript);
                
                // Remove any additional instances
                for (let i = 1; i < matches.length; i++) {
                    content = content.replace(matches[i], '');
                }
                
                console.log(`✅ Fixed Logo Badge Control Script in ${file}`);
                
                // Write the modified content back to the file
                fs.writeFileSync(file, content, 'utf8');
            }
        } else {
            console.log(`⚠️ No Logo Badge Control Script found in ${file} - skipping`);
        }
    } catch (error) {
        console.error(`Error processing ${file}:`, error);
    }
});

console.log('Finished fixing Logo Badge Control Script in all HTML files.'); 