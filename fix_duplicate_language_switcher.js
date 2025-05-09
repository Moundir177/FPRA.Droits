const fs = require('fs');
const path = require('path');

// Get all HTML files in the directory
const htmlFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));

console.log(`Found ${htmlFiles.length} HTML files to process...`);

htmlFiles.forEach(file => {
    try {
        console.log(`Processing ${file}...`);
        
        // Read the file
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if the file has duplicate language switchers
        const mobileLanguageSwitcher = '<div class="dynamic-lang-switch">\n                        <a href="#" data-lang="fr" class="active">FR</a>\n                        <a href="#" data-lang="ar">AR</a>\n                    </div>';
        
        // Remove the mobile language switcher from the navigation menu
        if (content.includes(mobileLanguageSwitcher)) {
            content = content.replace(mobileLanguageSwitcher, '');
            console.log(`✅ Removed duplicate language switcher from ${file}`);
            
            // Write the modified content back to the file
            fs.writeFileSync(file, content, 'utf8');
        } else {
            console.log(`No duplicate language switcher found in ${file}`);
        }
    } catch (error) {
        console.error(`Error processing ${file}:`, error);
    }
});

console.log('Finished processing all HTML files.'); 