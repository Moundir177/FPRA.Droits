// Script to add data-i18n attributes to remaining French text in testimonials.html

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

    // Fix the remaining French text sections
    
    // Featured testimonials section header that was missed
    updatedContent = updatedContent.replace(
        /<h2[^>]*>Témoignages de bénéficiaires et partenaires<\/h2>/g,
        '<h2 class="section-title" data-i18n="testimonials_featured_title">Témoignages de bénéficiaires et partenaires</h2>'
    );
    
    // Featured testimonial highlight text
    updatedContent = updatedContent.replace(
        /<span[^>]*>Témoignage vedette<\/span>/g,
        '<span data-i18n="testimonials_spotlight">Témoignage vedette</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span[^>]*>Mis en avant ce mois-ci<\/span>/g,
        '<span data-i18n="testimonials_month_featured">Mis en avant ce mois-ci</span>'
    );
    
    // Stories section headers
    updatedContent = updatedContent.replace(
        /<h2[^>]*>Histoires marquantes<\/h2>/g,
        '<h2 data-i18n="testimonials_stories_title">Histoires marquantes</h2>'
    );
    
    updatedContent = updatedContent.replace(
        /<h3[^>]*>Témoignages en vedette<\/h3>/g,
        '<h3 data-i18n="testimonials_highlights">Témoignages en vedette</h3>'
    );
    
    // Category section
    updatedContent = updatedContent.replace(
        /<h2[^>]*>Explorer par catégorie<\/h2>/g,
        '<h2 data-i18n="testimonials_explore_by_category">Explorer par catégorie</h2>'
    );
    
    updatedContent = updatedContent.replace(
        /<h3[^>]*>Tous nos témoignages<\/h3>/g,
        '<h3 data-i18n="testimonials_all_stories">Tous nos témoignages</h3>'
    );
    
    // "How to participate" section
    updatedContent = updatedContent.replace(
        /<h4[^>]*>Comment participer<\/h4>/g,
        '<h4 data-i18n="testimonials_how_to">Comment participer</h4>'
    );
    
    // Button to submit testimony
    updatedContent = updatedContent.replace(
        /<button[^>]*>Envoyer mon témoignage<\/button>/g,
        '<button type="submit" class="btn-primary" style="width: 100%; padding: 15px; border-radius: 8px; font-weight: 600; font-size: 1rem;" data-i18n="testimonials_form_submit">Envoyer mon témoignage</button>'
    );
    
    // Form field placeholders - make sure they have data-i18n attributes
    updatedContent = updatedContent.replace(
        /<input[^>]*placeholder="Votre nom complet"[^>]*>/g,
        (match) => {
            if (match.includes('data-i18n-placeholder')) {
                return match;
            }
            return match.replace('placeholder="Votre nom complet"', 'placeholder="Votre nom complet" data-i18n-placeholder="testimonials_form_name_placeholder"');
        }
    );
    
    updatedContent = updatedContent.replace(
        /<input[^>]*placeholder="Nom de votre organisation"[^>]*>/g,
        (match) => {
            if (match.includes('data-i18n-placeholder')) {
                return match;
            }
            return match.replace('placeholder="Nom de votre organisation"', 'placeholder="Nom de votre organisation" data-i18n-placeholder="testimonials_form_org_placeholder"');
        }
    );
    
    updatedContent = updatedContent.replace(
        /<input[^>]*placeholder="Votre adresse email"[^>]*>/g,
        (match) => {
            if (match.includes('data-i18n-placeholder')) {
                return match;
            }
            return match.replace('placeholder="Votre adresse email"', 'placeholder="Votre adresse email" data-i18n-placeholder="testimonials_form_email_placeholder"');
        }
    );
    
    updatedContent = updatedContent.replace(
        /<select[^>]*>/g,
        (match) => {
            if (match.includes('data-i18n-placeholder')) {
                return match;
            }
            return match.replace('<select', '<select data-i18n-placeholder="testimonials_form_category_placeholder"');
        }
    );
    
    updatedContent = updatedContent.replace(
        /<option[^>]*>Sélectionnez une catégorie<\/option>/g,
        '<option value="" data-i18n="testimonials_form_category_placeholder">Sélectionnez une catégorie</option>'
    );
    
    updatedContent = updatedContent.replace(
        /<textarea[^>]*placeholder="Partagez votre expérience ici..."[^>]*>/g,
        (match) => {
            if (match.includes('data-i18n-placeholder')) {
                return match;
            }
            return match.replace('placeholder="Partagez votre expérience ici..."', 'placeholder="Partagez votre expérience ici..." data-i18n-placeholder="testimonials_form_content_placeholder"');
        }
    );
    
    // Add data-i18n to individual testimonial cards if not already present
    
    // Add data-i18n to category tabs
    updatedContent = updatedContent.replace(
        /<span[^>]*>Formation<\/span>/g,
        '<span data-i18n="testimonials_category_training">Formation</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span[^>]*>Soutien juridique<\/span>/g,
        '<span data-i18n="testimonials_category_legal">Soutien juridique</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span[^>]*>Média<\/span>/g,
        '<span data-i18n="testimonials_category_media">Média</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span[^>]*>Partenariat<\/span>/g,
        '<span data-i18n="testimonials_category_partnership">Partenariat</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span[^>]*>Ressources<\/span>/g,
        '<span data-i18n="testimonials_category_resources">Ressources</span>'
    );

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('Successfully updated testimonials.html with additional data-i18n attributes');
    });
}); 