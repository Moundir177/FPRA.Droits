// Script to add final Arabic translations for the testimonials page

const fs = require('fs');
const path = require('path');

// Path to the ar.json file
const arJsonPath = path.join(__dirname, 'translations', 'ar.json');

// Read the Arabic translation file
fs.readFile(arJsonPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading Arabic translation file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const translations = JSON.parse(data);

        // Add final Arabic translations
        const finalTranslations = {
            // Section headers with capitalization
            "testimonials_stories_title_caps": "قصص بارزة",
            "testimonials_explore_category_caps": "استكشاف حسب الفئة",
            "testimonials_participate_caps": "شارك",
            
            // Featured section headers
            "testimonials_featured": "شهادات مميزة",
            
            // Featured spotlight with line breaks
            "testimonials_spotlight_with_break": "شهادة مميزة",
            "testimonials_month_featured_with_break": "مسلط عليها الضوء هذا الشهر",
            
            // Textarea placeholder
            "testimonials_form_content_placeholder_extended": "...شارك تجربتك هنا",
            
            // Button text corrections
            "testimonials_form_submit_full": "إرسال شهادتي",
            
            // Ensure all basic keys have translations
            "participez": "شارك",
            "partagez_votre_histoire": "شارك قصتك",
            "comment_participer": "كيفية المشاركة",
            "tous": "الكل"
        };

        // Add or update translations
        Object.assign(translations, finalTranslations);

        // Write the updated translations back to the file
        fs.writeFile(arJsonPath, JSON.stringify(translations, null, 4), 'utf8', (err) => {
            if (err) {
                console.error('Error writing updated translations:', err);
                return;
            }
            console.log('Successfully added final Arabic translations to translation file');
        });
    } catch (parseError) {
        console.error('Error parsing translation file:', parseError);
    }
}); 