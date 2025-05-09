// Script to add data-i18n attributes to French text in testimonials.html

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

    // Hero section
    updatedContent = updatedContent.replace(
        /<h1 class="animate-fadeIn" style="[^>]*">[\s\n]*Témoignages[\s\n]*<\/h1>/,
        '<h1 class="animate-fadeIn" style="font-size: 3.5rem; margin-bottom: 1.5rem; color: white; font-weight: 800; text-shadow: 2px 2px 15px rgba(0,0,0,0.3);" data-i18n="testimonials_title">Témoignages</h1>'
    );

    updatedContent = updatedContent.replace(
        /<p class="animate-fadeIn" style="[^>]*">[\s\n]*Des voix pour les droits, des histoires qui inspirent[\s\n]*<\/p>/,
        '<p class="animate-fadeIn" style="animation-delay: 0.3s; font-size: 1.3rem; margin-bottom: 2rem; color: rgba(255,255,255,0.95); text-shadow: 1px 1px 5px rgba(0,0,0,0.2); line-height: 1.6;" data-i18n="testimonials_subtitle">Des voix pour les droits, des histoires qui inspirent</p>'
    );

    // Hero buttons
    updatedContent = updatedContent.replace(
        /<span>Voir les témoignages<\/span>/,
        '<span data-i18n="testimonials_view_all">Voir les témoignages</span>'
    );

    updatedContent = updatedContent.replace(
        /<span>Partagez votre histoire<\/span>/,
        '<span data-i18n="testimonials_share_yours">Partagez votre histoire</span>'
    );

    // Introduction section
    updatedContent = updatedContent.replace(
        /<span class="intro-subtitle" style="[^>]*">Des histoires inspirantes<\/span>/,
        '<span class="intro-subtitle" style="text-transform: uppercase; font-size: 0.9rem; font-weight: 700; color: #3894b6; letter-spacing: 2px; display: block; margin-bottom: 15px;" data-i18n="testimonials_inspiring_stories">Des histoires inspirantes</span>'
    );

    updatedContent = updatedContent.replace(
        /<h2 class="section-title">L'impact de notre travail<\/h2>/,
        '<h2 class="section-title" data-i18n="testimonials_impact_title">L\'impact de notre travail</h2>'
    );

    // Main content paragraphs
    updatedContent = updatedContent.replace(
        /Les <strong style="color: var\(--primary-color\);">témoignages<\/strong> présentés sur cette page sont partagés par des individus et organisations qui ont bénéficié de notre soutien ou qui ont collaboré avec nous dans le cadre de nos différentes activités./,
        '<span data-i18n="testimonials_intro_p1">Les <strong style="color: var(--primary-color);">témoignages</strong> présentés sur cette page sont partagés par des individus et organisations qui ont bénéficié de notre soutien ou qui ont collaboré avec nous dans le cadre de nos différentes activités.</span>'
    );

    updatedContent = updatedContent.replace(
        /Ces récits personnels illustrent l'impact concret de notre travail sur le terrain et mettent en lumière les expériences vécues par ceux qui s'engagent pour la défense et la promotion des droits./,
        '<span data-i18n="testimonials_intro_p2">Ces récits personnels illustrent l\'impact concret de notre travail sur le terrain et mettent en lumière les expériences vécues par ceux qui s\'engagent pour la défense et la promotion des droits.</span>'
    );

    updatedContent = updatedContent.replace(
        /Nous croyons que ces témoignages constituent une ressource précieuse pour comprendre les enjeux réels auxquels sont confrontés les défenseurs des droits et pour inspirer d'autres personnes à s'engager dans cette cause./,
        '<span data-i18n="testimonials_intro_p3">Nous croyons que ces témoignages constituent une ressource précieuse pour comprendre les enjeux réels auxquels sont confrontés les défenseurs des droits et pour inspirer d\'autres personnes à s\'engager dans cette cause.</span>'
    );

    // Stats section
    updatedContent = updatedContent.replace(
        /<h3 style="[^>]*">Impact en chiffres<\/h3>/,
        '<h3 style="font-size: 1.2rem; margin-bottom: 20px; color: var(--primary-color);" data-i18n="testimonials_stats_title">Impact en chiffres</h3>'
    );

    updatedContent = updatedContent.replace(
        />Témoignages recueillis</,
        ' data-i18n="testimonials_stats_count">Témoignages recueillis<'
    );

    updatedContent = updatedContent.replace(
        />Organisations</,
        ' data-i18n="testimonials_stats_orgs">Organisations<'
    );

    updatedContent = updatedContent.replace(
        />Wilayas représentées</,
        ' data-i18n="testimonials_stats_regions">Wilayas représentées<'
    );

    // Featured Testimonials section
    updatedContent = updatedContent.replace(
        /<h2[^>]*>Témoignages de bénéficiaires et partenaires<\/h2>/,
        '<h2 class="section-title" data-i18n="testimonials_featured_title">Témoignages de bénéficiaires et partenaires</h2>'
    );

    updatedContent = updatedContent.replace(
        /<span[^>]*>Témoignage vedette<\/span>/,
        '<span data-i18n="testimonials_spotlight">Témoignage vedette</span>'
    );

    updatedContent = updatedContent.replace(
        /<span[^>]*>Mis en avant ce mois-ci<\/span>/,
        '<span data-i18n="testimonials_month_featured">Mis en avant ce mois-ci</span>'
    );

    updatedContent = updatedContent.replace(
        /« La formation a changé ma vision du plaidoyer... »/,
        '<span data-i18n="testimonials_spotlight_quote">« La formation a changé ma vision du plaidoyer... »</span>'
    );

    // Main testimonials section
    updatedContent = updatedContent.replace(
        /<h2[^>]*>Histoires marquantes<\/h2>/,
        '<h2 data-i18n="testimonials_stories_title">Histoires marquantes</h2>'
    );

    updatedContent = updatedContent.replace(
        /<h3[^>]*>Témoignages en vedette<\/h3>/,
        '<h3 data-i18n="testimonials_highlights">Témoignages en vedette</h3>'
    );

    updatedContent = updatedContent.replace(
        /<p[^>]*>Découvrez les témoignages de ceux qui ont bénéficié de notre soutien ou collaboré avec nous<\/p>/,
        '<p data-i18n="testimonials_discover">Découvrez les témoignages de ceux qui ont bénéficié de notre soutien ou collaboré avec nous</p>'
    );

    // Footer call to action and "See all"
    updatedContent = updatedContent.replace(
        /<span>Voir tous les témoignages<\/span>/,
        '<span data-i18n="testimonials_view_more">Voir tous les témoignages</span>'
    );

    // Category filter section
    updatedContent = updatedContent.replace(
        /<h2[^>]*>Explorer par catégorie<\/h2>/,
        '<h2 data-i18n="testimonials_explore_by_category">Explorer par catégorie</h2>'
    );

    updatedContent = updatedContent.replace(
        /<h3[^>]*>Tous nos témoignages<\/h3>/,
        '<h3 data-i18n="testimonials_all_stories">Tous nos témoignages</h3>'
    );

    updatedContent = updatedContent.replace(
        /<p[^>]*>Filtrez les témoignages par catégorie pour découvrir des expériences qui vous intéressent<\/p>/,
        '<p data-i18n="testimonials_filter_desc">Filtrez les témoignages par catégorie pour découvrir des expériences qui vous intéressent</p>'
    );

    // Filter buttons
    updatedContent = updatedContent.replace(
        />Tous</,
        ' data-i18n="testimonials_filter_all">Tous<'
    );

    updatedContent = updatedContent.replace(
        />Soutien juridique</,
        ' data-i18n="testimonials_filter_legal">Soutien juridique<'
    );

    updatedContent = updatedContent.replace(
        />Médias</,
        ' data-i18n="testimonials_filter_media">Médias<'
    );

    updatedContent = updatedContent.replace(
        />Partenariats</,
        ' data-i18n="testimonials_filter_partnerships">Partenariats<'
    );

    // Share your story section
    updatedContent = updatedContent.replace(
        /<h2[^>]*>Participez<\/h2>/,
        '<h2 data-i18n="testimonials_participate">Participez</h2>'
    );

    updatedContent = updatedContent.replace(
        /<h3[^>]*>Partagez votre histoire<\/h3>/,
        '<h3 data-i18n="testimonials_share_story">Partagez votre histoire</h3>'
    );

    updatedContent = updatedContent.replace(
        /Vous avez bénéficié des activités de la Fondation pour la promotion des droits ou collaboré avec nous \? Nous vous invitons à partager votre expérience./,
        '<span data-i18n="testimonials_invitation">Vous avez bénéficié des activités de la Fondation pour la promotion des droits ou collaboré avec nous ? Nous vous invitons à partager votre expérience.</span>'
    );

    updatedContent = updatedContent.replace(
        /Votre témoignage est précieux pour illustrer l'impact de notre travail et inspirer d'autres personnes à s'engager pour la défense des droits./,
        '<span data-i18n="testimonials_value">Votre témoignage est précieux pour illustrer l\'impact de notre travail et inspirer d\'autres personnes à s\'engager pour la défense des droits.</span>'
    );

    updatedContent = updatedContent.replace(
        /<h4[^>]*>Comment participer<\/h4>/,
        '<h4 data-i18n="testimonials_how_to">Comment participer</h4>'
    );

    // Steps to participate
    updatedContent = updatedContent.replace(
        /Remplissez le formulaire ci-contre avec vos coordonnées et votre témoignage/,
        '<span data-i18n="testimonials_step1">Remplissez le formulaire ci-contre avec vos coordonnées et votre témoignage</span>'
    );

    updatedContent = updatedContent.replace(
        /Notre équipe vous contactera pour vérifier les informations/,
        '<span data-i18n="testimonials_step2">Notre équipe vous contactera pour vérifier les informations</span>'
    );

    updatedContent = updatedContent.replace(
        /Après votre approbation, votre témoignage sera publié sur notre site/,
        '<span data-i18n="testimonials_step3">Après votre approbation, votre témoignage sera publié sur notre site</span>'
    );

    updatedContent = updatedContent.replace(
        /Note : Nous respectons votre vie privée. Si vous le souhaitez, votre témoignage peut être anonymisé ou publié sous un pseudonyme./,
        '<span data-i18n="testimonials_privacy_note">Note : Nous respectons votre vie privée. Si vous le souhaitez, votre témoignage peut être anonymisé ou publié sous un pseudonyme.</span>'
    );

    // Form section
    updatedContent = updatedContent.replace(
        /<h3[^>]*>Formulaire de témoignage<\/h3>/,
        '<h3 data-i18n="testimonials_form_title">Formulaire de témoignage</h3>'
    );

    // Form fields
    updatedContent = updatedContent.replace(
        />Nom et prénom</,
        ' data-i18n="testimonials_form_name">Nom et prénom<'
    );

    updatedContent = updatedContent.replace(
        />Votre nom complet</,
        ' data-i18n="testimonials_form_name_placeholder">Votre nom complet<'
    );

    updatedContent = updatedContent.replace(
        />Organisation \(si applicable\)</,
        ' data-i18n="testimonials_form_org">Organisation (si applicable)<'
    );

    updatedContent = updatedContent.replace(
        />Nom de votre organisation</,
        ' data-i18n="testimonials_form_org_placeholder">Nom de votre organisation<'
    );

    updatedContent = updatedContent.replace(
        />Email</,
        ' data-i18n="testimonials_form_email">Email<'
    );

    updatedContent = updatedContent.replace(
        />Votre adresse email</,
        ' data-i18n="testimonials_form_email_placeholder">Votre adresse email<'
    );

    updatedContent = updatedContent.replace(
        />Catégorie de témoignage</,
        ' data-i18n="testimonials_form_category">Catégorie de témoignage<'
    );

    updatedContent = updatedContent.replace(
        />Sélectionnez une catégorie</,
        ' data-i18n="testimonials_form_category_placeholder">Sélectionnez une catégorie<'
    );

    updatedContent = updatedContent.replace(
        />Votre témoignage</,
        ' data-i18n="testimonials_form_content">Votre témoignage<'
    );

    updatedContent = updatedContent.replace(
        />Partagez votre expérience ici...</,
        ' data-i18n="testimonials_form_content_placeholder">Partagez votre expérience ici...<'
    );

    updatedContent = updatedContent.replace(
        /J'accepte que mon témoignage soit publié sur le site de la Fondation/,
        '<span data-i18n="testimonials_form_consent">J\'accepte que mon témoignage soit publié sur le site de la Fondation</span>'
    );

    updatedContent = updatedContent.replace(
        /<button[^>]*>Envoyer mon témoignage<\/button>/,
        '<button type="submit" class="btn-primary" style="width: 100%; padding: 15px; border-radius: 8px; font-weight: 600; font-size: 1rem;" data-i18n="testimonials_form_submit">Envoyer mon témoignage</button>'
    );

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('Successfully updated testimonials.html with data-i18n attributes');
    });
}); 