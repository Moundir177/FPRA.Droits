// Script to fix remaining French text in testimonials.html when in Arabic mode

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

    // Fix section headers
    updatedContent = updatedContent.replace(
        /<span class="intro-subtitle"[^>]*>HISTOIRES MARQUANTES<\/span>/gi,
        '<span class="intro-subtitle" data-i18n="testimonials_stories_title_caps">HISTOIRES MARQUANTES</span>'
    );

    updatedContent = updatedContent.replace(
        /<span class="intro-subtitle"[^>]*>EXPLORER PAR CATÉGORIE<\/span>/gi,
        '<span class="intro-subtitle" data-i18n="testimonials_explore_category_caps">EXPLORER PAR CATÉGORIE</span>'
    );

    // Fix "Témoignages en vedette" section header
    updatedContent = updatedContent.replace(
        /<h2[^>]*>Témoignages en vedette<\/h2>/gi,
        '<h2 data-i18n="testimonials_featured">Témoignages en vedette</h2>'
    );

    // Fix "Comment participer" section that might have been missed
    updatedContent = updatedContent.replace(
        /<h3[^>]*>Comment participer<\/h3>/gi,
        '<h3 data-i18n="testimonials_how_to">Comment participer</h3>'
    );

    // Fix "Partagez votre histoire" in the PARTICIPEZ section
    updatedContent = updatedContent.replace(
        /<h1[^>]*>Partagez votre histoire<\/h1>/gi,
        '<h1 data-i18n="testimonials_share_story">Partagez votre histoire</h1>'
    );

    // Fix "PARTICIPEZ" section header
    updatedContent = updatedContent.replace(
        /<div[^>]*>PARTICIPEZ<\/div>/gi,
        '<div data-i18n="testimonials_participate_caps">PARTICIPEZ</div>'
    );

    // Fix placeholder for textarea
    updatedContent = updatedContent.replace(
        /placeholder="...Partagez votre expérience ici"/gi,
        'placeholder="...Partagez votre expérience ici" data-i18n-placeholder="testimonials_form_content_placeholder"'
    );

    // Fix "Envoyer mon témoignage" button
    updatedContent = updatedContent.replace(
        />Envoyer mon témoignage</gi,
        ' data-i18n="testimonials_form_submit">Envoyer mon témoignage<'
    );

    // Fix pagination numbers
    updatedContent = updatedContent.replace(
        /<a[^>]*>Tous<\/a>/gi,
        '<a data-i18n="testimonials_filter_all">Tous</a>'
    );

    // Fix for "Témoignage vedette" and "Mis en avant ce mois-ci"
    updatedContent = updatedContent.replace(
        /<div[^>]*>Témoignage<br\/>vedette<\/div>/gi,
        '<div data-i18n="testimonials_spotlight_with_break">Témoignage<br/>vedette</div>'
    );

    updatedContent = updatedContent.replace(
        /<div[^>]*>Mis en avant ce<br\/>mois-ci<\/div>/gi,
        '<div data-i18n="testimonials_month_featured_with_break">Mis en avant ce<br/>mois-ci</div>'
    );

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('Successfully updated remaining French text with data-i18n attributes');
    });
}); 