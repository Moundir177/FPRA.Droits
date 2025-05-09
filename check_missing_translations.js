// check_missing_translations.js
const fs = require('fs');
const path = require('path');

// Read the Arabic translation file
let arTranslations;
try {
    const arTranslationsContent = fs.readFileSync('translations/ar.json', 'utf8');
    arTranslations = JSON.parse(arTranslationsContent);
    console.log(`Successfully loaded Arabic translations with ${Object.keys(arTranslations).length} entries`);
} catch (error) {
    console.error('Error reading Arabic translations file:', error);
    process.exit(1);
}

// Get all HTML files
const htmlFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));
console.log(`Found ${htmlFiles.length} HTML files to check`);

// Track all i18n keys used in the HTML files
const allUsedKeys = new Set();
const missingTranslations = [];

// Check each HTML file for i18n keys
htmlFiles.forEach(file => {
    console.log(`Checking ${file}...`);
    
    try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Find all data-i18n attributes
        const regex = /data-i18n="([^"]+)"/g;
        let match;
        let keysInFile = 0;
        
        while ((match = regex.exec(content)) !== null) {
            const key = match[1];
            allUsedKeys.add(key);
            keysInFile++;
            
            // Check if the key exists in Arabic translations
            if (!arTranslations[key]) {
                missingTranslations.push({ file, key });
                console.log(`  ❌ Missing Arabic translation for key: "${key}" in ${file}`);
            }
        }
        
        console.log(`  Found ${keysInFile} i18n keys in ${file}`);
    } catch (error) {
        console.error(`  Error processing ${file}:`, error);
    }
});

// Print results
console.log('\n=== Translation Check Results ===');
console.log(`Total unique i18n keys used across all files: ${allUsedKeys.size}`);
console.log(`Missing Arabic translations: ${missingTranslations.length}`);

if (missingTranslations.length > 0) {
    console.log('\nMissing translations list:');
    missingTranslations.forEach(({ file, key }, index) => {
        console.log(`${index + 1}. Key: "${key}" in file: ${file}`);
    });
    
    // Create a template for the missing translations
    console.log('\nAdd these missing translations to the Arabic file:');
    
    const missingTranslationsTemplate = {};
    missingTranslations.forEach(({ key }) => {
        missingTranslationsTemplate[key] = "TRANSLATION_NEEDED";
    });
    
    console.log(JSON.stringify(missingTranslationsTemplate, null, 2));
} 