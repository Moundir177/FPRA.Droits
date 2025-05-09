// Improved script to fix remaining French text in testimonials.html when in Arabic mode

const fs = require('fs');
const path = require('path');

// Path to the testimonials.html file
const filePath = path.join(__dirname, 'testimonials.html');

console.log(`Attempting to read file: ${filePath}`);
console.log(`Current directory: ${__dirname}`);

// Check if file exists
if (!fs.existsSync(filePath)) {
    console.error(`Error: File does not exist at path: ${filePath}`);
    process.exit(1);
}

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    
    console.log(`Successfully read file: ${filePath}`);
    console.log(`File size: ${data.length} bytes`);

    // Apply the changes
    let updatedContent = data;
    let changesMade = 0;

    // Helper function to apply replacements and count changes
    function applyReplacement(regex, replacement) {
        const before = updatedContent;
        updatedContent = updatedContent.replace(regex, replacement);
        const matches = (before.match(regex) || []).length;
        changesMade += matches;
        console.log(`Applied replacement for pattern: ${regex}, matches found: ${matches}`);
        return matches;
    }

    // Fix remaining section headers
    applyReplacement(/HISTOIRES MARQUANTES/gi, 
        '<span data-i18n="testimonials_stories_title_caps">HISTOIRES MARQUANTES</span>');
    
    applyReplacement(/EXPLORER PAR CATÉGORIE/gi, 
        '<span data-i18n="testimonials_explore_category_caps">EXPLORER PAR CATÉGORIE</span>');
    
    applyReplacement(/>Témoignages en vedette</gi, 
        ' data-i18n="testimonials_featured">Témoignages en vedette<');
    
    applyReplacement(/>Partagez votre histoire</gi, 
        ' data-i18n="testimonials_share_story">Partagez votre histoire<');
    
    applyReplacement(/PARTICIPEZ/gi, 
        '<span data-i18n="testimonials_participate_caps">PARTICIPEZ</span>');
    
    applyReplacement(/>Comment participer</gi, 
        ' data-i18n="testimonials_how_to">Comment participer<');
    
    applyReplacement(/Témoignage vedette/gi, 
        '<span data-i18n="testimonials_spotlight">Témoignage vedette</span>');
    
    applyReplacement(/Mis en avant ce mois-ci/gi, 
        '<span data-i18n="testimonials_month_featured">Mis en avant ce mois-ci</span>');
    
    applyReplacement(/Envoyer mon témoignage/gi, 
        '<span data-i18n="testimonials_form_submit">Envoyer mon témoignage</span>');
    
    applyReplacement(/placeholder="...Partagez votre expérience ici"/gi, 
        'placeholder="...Partagez votre expérience ici" data-i18n-placeholder="testimonials_form_content_placeholder_extended"');

    console.log(`Total changes made: ${changesMade}`);

    if (changesMade === 0) {
        console.log("No changes were made. Either patterns didn't match or file already updated.");
        return;
    }

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log(`Successfully updated file with ${changesMade} changes.`);
    });
}); 