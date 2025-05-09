// Script to add data-i18n attributes to testimonial quotes in testimonials.html

const fs = require('fs');
const path = require('path');

// Path to the testimonials.html file
const filePath = path.join(__dirname, 'testimonials.html');

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Apply the changes
    let updatedContent = data;
    
    // Define patterns and replacements for testimonial quotes
    const testimonialsReplacements = [
        {
            // First testimonial - Fatima B.
            pattern: /(La formation sur les techniques de plaidoyer[^<]+)/,
            replacement: '<span data-i18n="testimonials_quote1">$1</span>'
        },
        {
            // First testimonial author name
            pattern: /Fatima B\./g,
            replacement: '<span data-i18n="testimonials_quote1_author">Fatima B.</span>'
        },
        {
            // First testimonial author role
            pattern: /Présidente d'association, Tlemcen/g,
            replacement: '<span data-i18n="testimonials_quote1_role">Présidente d\'association, Tlemcen</span>'
        },
        
        {
            // Second testimonial - Ahmed M.
            pattern: /(Le soutien juridique de la Fondation[^<]+)/,
            replacement: '<span data-i18n="testimonials_quote2">$1</span>'
        },
        {
            // Second testimonial author name
            pattern: /Ahmed M\./g,
            replacement: '<span data-i18n="testimonials_quote2_author">Ahmed M.</span>'
        },
        {
            // Second testimonial author role
            pattern: /Collectif citoyen, Bejaia/g,
            replacement: '<span data-i18n="testimonials_quote2_role">Collectif citoyen, Bejaia</span>'
        },
        
        {
            // Third testimonial - Yasmine K.
            pattern: /(En tant que jeune journaliste[^<]+)/,
            replacement: '<span data-i18n="testimonials_quote3">$1</span>'
        },
        {
            // Third testimonial author name
            pattern: /Yasmine K\./g,
            replacement: '<span data-i18n="testimonials_quote3_author">Yasmine K.</span>'
        },
        {
            // Third testimonial author role
            pattern: /Journaliste, Oran/g,
            replacement: '<span data-i18n="testimonials_quote3_role">Journaliste, Oran</span>'
        },
        
        {
            // Fourth testimonial - Naima H.
            pattern: /(Le guide pratique sur les droits des femmes[^<]+)/,
            replacement: '<span data-i18n="testimonials_quote4">$1</span>'
        },
        {
            // Fourth testimonial author name
            pattern: /Naima H\./g,
            replacement: '<span data-i18n="testimonials_quote4_author">Naima H.</span>'
        },
        {
            // Fourth testimonial author role
            pattern: /Association pour les droits des femmes, Sétif/g,
            replacement: '<span data-i18n="testimonials_quote4_role">Association pour les droits des femmes, Sétif</span>'
        },
        
        {
            // Fifth testimonial - Karim L.
            pattern: /(Notre partenariat avec la Fondation[^<]+)/,
            replacement: '<span data-i18n="testimonials_quote5">$1</span>'
        },
        {
            // Fifth testimonial author name
            pattern: /Karim L\./g,
            replacement: '<span data-i18n="testimonials_quote5_author">Karim L.</span>'
        },
        {
            // Fifth testimonial author role
            pattern: /Directeur d'ONG nationale, Alger/g,
            replacement: '<span data-i18n="testimonials_quote5_role">Directeur d\'ONG nationale, Alger</span>'
        },
        
        {
            // Sixth testimonial - Sofiane R.
            pattern: /(En tant qu'avocat débutant[^<]+)/,
            replacement: '<span data-i18n="testimonials_quote6">$1</span>'
        },
        {
            // Sixth testimonial author name
            pattern: /Sofiane R\./g,
            replacement: '<span data-i18n="testimonials_quote6_author">Sofiane R.</span>'
        },
        {
            // Sixth testimonial author role
            pattern: /Avocat, Constantine/g,
            replacement: '<span data-i18n="testimonials_quote6_role">Avocat, Constantine</span>'
        }
    ];
    
    // Apply each replacement pattern
    testimonialsReplacements.forEach(({ pattern, replacement }) => {
        updatedContent = updatedContent.replace(pattern, replacement);
    });

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('Successfully updated testimonial quotes with data-i18n attributes');
    });
}); 