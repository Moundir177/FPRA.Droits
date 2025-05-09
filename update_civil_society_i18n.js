// Script to add data-i18n attributes to remaining French text in civil-society.html

const fs = require('fs');
const path = require('path');

// Path to the civil-society.html file
const filePath = path.join(__dirname, 'civil-society.html');

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Apply the changes
    let updatedContent = data;

    // Program details that need data-i18n attributes
    // Program 1: Already has data-i18n attributes for title and description
    updatedContent = updatedContent.replace(
        /<h4 style="margin: 0 0 5px; font-size: 1rem; color: #333;">Micro-financement<\/h4>/,
        '<h4 style="margin: 0 0 5px; font-size: 1rem; color: #333;" data-i18n="civil_society_program1_feature3_title">Micro-financement</h4>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="margin: 0; color: #666; font-size: 0.85rem;">Appui financier limité pour démarrer les activités<\/p>/,
        '<p style="margin: 0; color: #666; font-size: 0.85rem;" data-i18n="civil_society_program1_feature3_desc">Appui financier limité pour démarrer les activités</p>'
    );
    
    updatedContent = updatedContent.replace(
        /<span>Postuler<\/span>/,
        '<span data-i18n="civil_society_program1_cta">Postuler</span>'
    );

    // Program 2: Protection des défenseurs
    updatedContent = updatedContent.replace(
        /<h3 style="color: white; font-size: 1.4rem; margin: 0; font-weight: 600;">Protection des défenseurs<\/h3>/,
        '<h3 style="color: white; font-size: 1.4rem; margin: 0; font-weight: 600;" data-i18n="civil_society_program2_title">Protection des défenseurs</h3>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="color: #555; margin-bottom: 20px; line-height: 1.5; font-size: 0.95rem;">Mécanisme de soutien pour les défenseurs des droits confrontés à des risques ou des menaces en raison de leur travail.<\/p>/,
        '<p style="color: #555; margin-bottom: 20px; line-height: 1.5; font-size: 0.95rem;" data-i18n="civil_society_program2_desc">Mécanisme de soutien pour les défenseurs des droits confrontés à des risques ou des menaces en raison de leur travail.</p>'
    );
    
    // Feature 1
    updatedContent = updatedContent.replace(
        /<h4 style="margin: 0 0 5px; font-size: 1rem; color: #333;">Réponse d'urgence<\/h4>/,
        '<h4 style="margin: 0 0 5px; font-size: 1rem; color: #333;" data-i18n="civil_society_program2_feature1_title">Réponse d\'urgence</h4>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="margin: 0; color: #666; font-size: 0.85rem;">Assistance rapide en cas de situation critique<\/p>/,
        '<p style="margin: 0; color: #666; font-size: 0.85rem;" data-i18n="civil_society_program2_feature1_desc">Assistance rapide en cas de situation critique</p>'
    );
    
    // Feature 2
    updatedContent = updatedContent.replace(
        /<h4 style="margin: 0 0 5px; font-size: 1rem; color: #333;">Assistance juridique<\/h4>/,
        '<h4 style="margin: 0 0 5px; font-size: 1rem; color: #333;" data-i18n="civil_society_program2_feature2_title">Assistance juridique</h4>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="margin: 0; color: #666; font-size: 0.85rem;">Conseils et représentation juridique<\/p>/,
        '<p style="margin: 0; color: #666; font-size: 0.85rem;" data-i18n="civil_society_program2_feature2_desc">Conseils et représentation juridique</p>'
    );
    
    // Feature 3
    updatedContent = updatedContent.replace(
        /<h4 style="margin: 0 0 5px; font-size: 1rem; color: #333;">Soutien psychosocial<\/h4>/,
        '<h4 style="margin: 0 0 5px; font-size: 1rem; color: #333;" data-i18n="civil_society_program2_feature3_title">Soutien psychosocial</h4>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="margin: 0; color: #666; font-size: 0.85rem;">Accompagnement pour gérer le stress et l'anxiété<\/p>/,
        '<p style="margin: 0; color: #666; font-size: 0.85rem;" data-i18n="civil_society_program2_feature3_desc">Accompagnement pour gérer le stress et l\'anxiété</p>'
    );
    
    updatedContent = updatedContent.replace(
        /<span>Demander une assistance<\/span>/,
        '<span data-i18n="civil_society_program2_cta">Demander une assistance</span>'
    );

    // Program 3: Gouvernance associative
    updatedContent = updatedContent.replace(
        /<h3 style="color: white; font-size: 1.4rem; margin: 0; font-weight: 600;">Gouvernance associative<\/h3>/,
        '<h3 style="color: white; font-size: 1.4rem; margin: 0; font-weight: 600;" data-i18n="civil_society_program3_title">Gouvernance associative</h3>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="color: #555; margin-bottom: 20px; line-height: 1.5; font-size: 0.95rem;">Programme visant à renforcer les structures de gouvernance et les processus organisationnels des associations établies.<\/p>/,
        '<p style="color: #555; margin-bottom: 20px; line-height: 1.5; font-size: 0.95rem;" data-i18n="civil_society_program3_desc">Programme visant à renforcer les structures de gouvernance et les processus organisationnels des associations établies.</p>'
    );
    
    // Features
    updatedContent = updatedContent.replace(
        /<h4 style="margin: 0 0 5px; font-size: 1rem; color: #333;">Audit organisationnel<\/h4>/,
        '<h4 style="margin: 0 0 5px; font-size: 1rem; color: #333;" data-i18n="civil_society_program3_feature1_title">Audit organisationnel</h4>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="margin: 0; color: #666; font-size: 0.85rem;">Évaluation des forces et faiblesses<\/p>/,
        '<p style="margin: 0; color: #666; font-size: 0.85rem;" data-i18n="civil_society_program3_feature1_desc">Évaluation des forces et faiblesses</p>'
    );
    
    updatedContent = updatedContent.replace(
        /<h4 style="margin: 0 0 5px; font-size: 1rem; color: #333;">Planification stratégique<\/h4>/,
        '<h4 style="margin: 0 0 5px; font-size: 1rem; color: #333;" data-i18n="civil_society_program3_feature2_title">Planification stratégique</h4>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="margin: 0; color: #666; font-size: 0.85rem;">Définition d'objectifs à moyen et long terme<\/p>/,
        '<p style="margin: 0; color: #666; font-size: 0.85rem;" data-i18n="civil_society_program3_feature2_desc">Définition d\'objectifs à moyen et long terme</p>'
    );
    
    updatedContent = updatedContent.replace(
        /<h4 style="margin: 0 0 5px; font-size: 1rem; color: #333;">Gestion financière<\/h4>/,
        '<h4 style="margin: 0 0 5px; font-size: 1rem; color: #333;" data-i18n="civil_society_program3_feature3_title">Gestion financière</h4>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="margin: 0; color: #666; font-size: 0.85rem;">Renforcement des processus budgétaires<\/p>/,
        '<p style="margin: 0; color: #666; font-size: 0.85rem;" data-i18n="civil_society_program3_feature3_desc">Renforcement des processus budgétaires</p>'
    );
    
    updatedContent = updatedContent.replace(
        /<span>Demander un accompagnement<\/span>/,
        '<span data-i18n="civil_society_program3_cta">Demander un accompagnement</span>'
    );

    // Services sections
    // Soutien aux projets
    updatedContent = updatedContent.replace(
        /<h3 style="margin-bottom: 15px; font-weight: 600; color: #1a1a1a;">Soutien aux projets<\/h3>/,
        '<h3 style="margin-bottom: 15px; font-weight: 600; color: #1a1a1a;" data-i18n="civil_society_service4_title">Soutien aux projets</h3>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="color: #555; margin-bottom: 20px; line-height: 1.6;">Accompagnement dans la conception, mise en œuvre et évaluation de projets en faveur des droits.<\/p>/,
        '<p style="color: #555; margin-bottom: 20px; line-height: 1.6;" data-i18n="civil_society_service4_desc">Accompagnement dans la conception, mise en œuvre et évaluation de projets en faveur des droits.</p>'
    );
    
    // Service 4 features
    updatedContent = updatedContent.replace(
        /<span>Conception de projets<\/span>/,
        '<span data-i18n="civil_society_service4_feature1">Conception de projets</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span>Suivi et évaluation<\/span>/,
        '<span data-i18n="civil_society_service4_feature2">Suivi et évaluation</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span>Capitalisation<\/span>/,
        '<span data-i18n="civil_society_service4_feature3">Capitalisation</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span>Proposer un projet<\/span>/,
        '<span data-i18n="civil_society_service4_cta">Proposer un projet</span>'
    );

    // Plaidoyer
    updatedContent = updatedContent.replace(
        /<h3 style="margin-bottom: 15px; font-weight: 600; color: #1a1a1a;">Plaidoyer<\/h3>/,
        '<h3 style="margin-bottom: 15px; font-weight: 600; color: #1a1a1a;" data-i18n="civil_society_service5_title">Plaidoyer</h3>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="color: #555; margin-bottom: 20px; line-height: 1.6;">Soutien aux actions de plaidoyer pour influencer les politiques publiques en matière de droits.<\/p>/,
        '<p style="color: #555; margin-bottom: 20px; line-height: 1.6;" data-i18n="civil_society_service5_desc">Soutien aux actions de plaidoyer pour influencer les politiques publiques en matière de droits.</p>'
    );
    
    // Service 5 features
    updatedContent = updatedContent.replace(
        /<span>Stratégies d'influence<\/span>/,
        '<span data-i18n="civil_society_service5_feature1">Stratégies d\'influence</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span>Campagnes thématiques<\/span>/,
        '<span data-i18n="civil_society_service5_feature2">Campagnes thématiques</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span>Communication d'impact<\/span>/,
        '<span data-i18n="civil_society_service5_feature3">Communication d\'impact</span>'
    );

    // Accès aux financements
    updatedContent = updatedContent.replace(
        /<h3 style="margin-bottom: 15px; font-weight: 600; color: #1a1a1a;">Accès aux financements<\/h3>/,
        '<h3 style="margin-bottom: 15px; font-weight: 600; color: #1a1a1a;" data-i18n="civil_society_service6_title">Accès aux financements</h3>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="color: #555; margin-bottom: 20px; line-height: 1.6;">Information sur les opportunités de financement et appui à la recherche de fonds pour les organisations locales.<\/p>/,
        '<p style="color: #555; margin-bottom: 20px; line-height: 1.6;" data-i18n="civil_society_service6_desc">Information sur les opportunités de financement et appui à la recherche de fonds pour les organisations locales.</p>'
    );
    
    // Service 6 features
    updatedContent = updatedContent.replace(
        /<span>Veille sur les financements<\/span>/,
        '<span data-i18n="civil_society_service6_feature1">Veille sur les financements</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span>Appui aux demandes<\/span>/,
        '<span data-i18n="civil_society_service6_feature2">Appui aux demandes</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span>Diversification des ressources<\/span>/,
        '<span data-i18n="civil_society_service6_feature3">Diversification des ressources</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span>Nous contacter<\/span>/,
        '<span data-i18n="civil_society_service6_cta">Nous contacter</span>'
    );

    // Networks and Collaborations section
    updatedContent = updatedContent.replace(
        /<h2 class="section-title" style="margin-bottom: 20px;">Réseaux et collaborations<\/h2>/,
        '<h2 class="section-title" style="margin-bottom: 20px;" data-i18n="civil_society_networks_title">Réseaux et collaborations</h2>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="font-size: 1.1rem; line-height: 1.7; color: var\(--text-color\);">La Fondation pour la promotion des droits facilite et participe à plusieurs réseaux thématiques qui rassemblent diverses organisations de la société civile. Ces plateformes offrent des opportunités d'échange d'expériences, de coordination d'actions et de mutualisation des ressources.<\/p>/,
        '<p style="font-size: 1.1rem; line-height: 1.7; color: var(--text-color);" data-i18n="civil_society_networks_desc">La Fondation pour la promotion des droits facilite et participe à plusieurs réseaux thématiques qui rassemblent diverses organisations de la société civile. Ces plateformes offrent des opportunités d\'échange d\'expériences, de coordination d\'actions et de mutualisation des ressources.</p>'
    );

    // Network items
    // Network 1
    updatedContent = updatedContent.replace(
        /<h3 style="font-size: 1.4rem; margin-bottom: 15px; font-weight: 600; color: #333;">Réseau des Défenseurs des Droits<\/h3>/,
        '<h3 style="font-size: 1.4rem; margin-bottom: 15px; font-weight: 600; color: #333;" data-i18n="civil_society_network1_title">Réseau des Défenseurs des Droits</h3>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="margin-bottom: 20px; line-height: 1.6; color: #555;">Coalition d'organisations et d'individus engagés dans la protection et la promotion des droits humains fondamentaux en Algérie.<\/p>/,
        '<p style="margin-bottom: 20px; line-height: 1.6; color: #555;" data-i18n="civil_society_network1_desc">Coalition d\'organisations et d\'individus engagés dans la protection et la promotion des droits humains fondamentaux en Algérie.</p>'
    );
    
    updatedContent = updatedContent.replace(
        /<h4 style="font-size: 1rem; margin-bottom: 15px; color: #333;">Activités principales<\/h4>/,
        '<h4 style="font-size: 1rem; margin-bottom: 15px; color: #333;" data-i18n="civil_society_network1_activities">Activités principales</h4>'
    );
    
    updatedContent = updatedContent.replace(
        /<span style="font-size: 0.95rem;">Réunions trimestrielles<\/span>/,
        '<span style="font-size: 0.95rem;" data-i18n="civil_society_network1_activity1">Réunions trimestrielles</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span style="font-size: 0.95rem;">Groupe de discussion en ligne<\/span>/,
        '<span style="font-size: 0.95rem;" data-i18n="civil_society_network1_activity2">Groupe de discussion en ligne</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span style="font-size: 0.95rem;">Publications conjointes<\/span>/,
        '<span style="font-size: 0.95rem;" data-i18n="civil_society_network1_activity3">Publications conjointes</span>'
    );
    
    // Update network links
    updatedContent = updatedContent.replace(
        /<span>Rejoindre ce réseau<\/span>/g,
        '<span data-i18n="civil_society_network1_cta">Rejoindre ce réseau</span>'
    );

    // Network 2
    updatedContent = updatedContent.replace(
        /<h3 style="font-size: 1.4rem; margin-bottom: 15px; font-weight: 600; color: #333;">Collectif pour les Droits des Femmes<\/h3>/,
        '<h3 style="font-size: 1.4rem; margin-bottom: 15px; font-weight: 600; color: #333;" data-i18n="civil_society_network2_title">Collectif pour les Droits des Femmes</h3>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="margin-bottom: 20px; line-height: 1.6; color: #555;">Alliance d'associations œuvrant pour l'égalité des genres et l'autonomisation des femmes à travers différentes régions.<\/p>/,
        '<p style="margin-bottom: 20px; line-height: 1.6; color: #555;" data-i18n="civil_society_network2_desc">Alliance d\'associations œuvrant pour l\'égalité des genres et l\'autonomisation des femmes à travers différentes régions.</p>'
    );
    
    // Replace all instances of "Activités principales" for the second occurrence
    let count = 0;
    updatedContent = updatedContent.replace(/<h4 style="font-size: 1rem; margin-bottom: 15px; color: #333;">Activités principales<\/h4>/g, function(match) {
        count++;
        if (count === 2) {
            return '<h4 style="font-size: 1rem; margin-bottom: 15px; color: #333;" data-i18n="civil_society_network2_activities">Activités principales</h4>';
        }
        return match;
    });
    
    updatedContent = updatedContent.replace(
        /<span style="font-size: 0.95rem;">Campagnes de sensibilisation<\/span>/,
        '<span style="font-size: 0.95rem;" data-i18n="civil_society_network2_activity1">Campagnes de sensibilisation</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span style="font-size: 0.95rem;">Assistance juridique mutuelle<\/span>/,
        '<span style="font-size: 0.95rem;" data-i18n="civil_society_network2_activity2">Assistance juridique mutuelle</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span style="font-size: 0.95rem;">Projets collaboratifs<\/span>/,
        '<span style="font-size: 0.95rem;" data-i18n="civil_society_network2_activity3">Projets collaboratifs</span>'
    );

    // Network 3
    updatedContent = updatedContent.replace(
        /<h3 style="font-size: 1.4rem; margin-bottom: 15px; font-weight: 600; color: #333;">Plateforme Jeunesse et Droits<\/h3>/,
        '<h3 style="font-size: 1.4rem; margin-bottom: 15px; font-weight: 600; color: #333;" data-i18n="civil_society_network3_title">Plateforme Jeunesse et Droits</h3>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="margin-bottom: 20px; line-height: 1.6; color: #555;">Espace dédié aux organisations dirigées par des jeunes et travaillant sur les problématiques de la jeunesse et de l'engagement civique.<\/p>/,
        '<p style="margin-bottom: 20px; line-height: 1.6; color: #555;" data-i18n="civil_society_network3_desc">Espace dédié aux organisations dirigées par des jeunes et travaillant sur les problématiques de la jeunesse et de l\'engagement civique.</p>'
    );
    
    // Replace the third occurrence of "Activités principales"
    count = 0;
    updatedContent = updatedContent.replace(/<h4 style="font-size: 1rem; margin-bottom: 15px; color: #333;">Activités principales<\/h4>/g, function(match) {
        count++;
        if (count === 3) {
            return '<h4 style="font-size: 1rem; margin-bottom: 15px; color: #333;" data-i18n="civil_society_network3_activities">Activités principales</h4>';
        }
        return match;
    });
    
    updatedContent = updatedContent.replace(
        /<span style="font-size: 0.95rem;">Incubation d'initiatives<\/span>/,
        '<span style="font-size: 0.95rem;" data-i18n="civil_society_network3_activity1">Incubation d\'initiatives</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span style="font-size: 0.95rem;">Mentorat entre pairs<\/span>/,
        '<span style="font-size: 0.95rem;" data-i18n="civil_society_network3_activity2">Mentorat entre pairs</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span style="font-size: 0.95rem;">Forums de dialogue<\/span>/,
        '<span style="font-size: 0.95rem;" data-i18n="civil_society_network3_activity3">Forums de dialogue</span>'
    );

    // Network creation CTA
    updatedContent = updatedContent.replace(
        /<h3 style="color: white; font-size: 1.8rem; margin-bottom: 15px;">Créez votre réseau thématique<\/h3>/,
        '<h3 style="color: white; font-size: 1.8rem; margin-bottom: 15px;" data-i18n="civil_society_create_network_title">Créez votre réseau thématique</h3>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="color: rgba\(255,255,255,0.9\); font-size: 1.1rem; max-width: 800px; margin: 0 auto 30px;">Vous souhaitez mettre en place un nouveau réseau pour renforcer les acteurs de la société civile dans votre domaine d'expertise \? La Fondation peut vous accompagner dans toutes les étapes de création et d'animation.<\/p>/,
        '<p style="color: rgba(255,255,255,0.9); font-size: 1.1rem; max-width: 800px; margin: 0 auto 30px;" data-i18n="civil_society_create_network_desc">Vous souhaitez mettre en place un nouveau réseau pour renforcer les acteurs de la société civile dans votre domaine d\'expertise ? La Fondation peut vous accompagner dans toutes les étapes de création et d\'animation.</p>'
    );
    
    updatedContent = updatedContent.replace(
        /<span>Proposer un réseau<\/span>/,
        '<span data-i18n="civil_society_create_network_cta1">Proposer un réseau</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span>En savoir plus<\/span>/,
        '<span data-i18n="civil_society_create_network_cta2">En savoir plus</span>'
    );

    // Join Networks section
    updatedContent = updatedContent.replace(
        /<h2 style="font-size: 2.5rem; margin-bottom: 25px; color: #333;">Rejoignez nos réseaux<\/h2>/,
        '<h2 style="font-size: 2.5rem; margin-bottom: 25px; color: #333;" data-i18n="civil_society_join_title">Rejoignez nos réseaux</h2>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="font-size: 1.1rem; line-height: 1.7; color: #555; margin-bottom: 30px;">Vous êtes une organisation de la société civile, une association ou un collectif citoyen \? Rejoignez nos réseaux pour renforcer votre impact et bénéficier de nos programmes de soutien.<\/p>/,
        '<p style="font-size: 1.1rem; line-height: 1.7; color: #555; margin-bottom: 30px;" data-i18n="civil_society_join_desc">Vous êtes une organisation de la société civile, une association ou un collectif citoyen ? Rejoignez nos réseaux pour renforcer votre impact et bénéficier de nos programmes de soutien.</p>'
    );
    
    // Benefits
    updatedContent = updatedContent.replace(
        /<h3 style="font-size: 1.2rem; margin-bottom: 10px; color: #333;">Communauté<\/h3>/,
        '<h3 style="font-size: 1.2rem; margin-bottom: 10px; color: #333;" data-i18n="civil_society_benefit1_title">Communauté</h3>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="color: #666; font-size: 0.95rem; line-height: 1.5;">Rejoignez une communauté dynamique partageant des valeurs communes.<\/p>/,
        '<p style="color: #666; font-size: 0.95rem; line-height: 1.5;" data-i18n="civil_society_benefit1_desc">Rejoignez une communauté dynamique partageant des valeurs communes.</p>'
    );
    
    updatedContent = updatedContent.replace(
        /<h3 style="font-size: 1.2rem; margin-bottom: 10px; color: #333;">Expertise<\/h3>/,
        '<h3 style="font-size: 1.2rem; margin-bottom: 10px; color: #333;" data-i18n="civil_society_benefit2_title">Expertise</h3>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="color: #666; font-size: 0.95rem; line-height: 1.5;">Accédez à l'expertise et aux ressources de la Fondation et de ses partenaires.<\/p>/,
        '<p style="color: #666; font-size: 0.95rem; line-height: 1.5;" data-i18n="civil_society_benefit2_desc">Accédez à l\'expertise et aux ressources de la Fondation et de ses partenaires.</p>'
    );
    
    updatedContent = updatedContent.replace(
        /<h3 style="font-size: 1.2rem; margin-bottom: 10px; color: #333;">Visibilité<\/h3>/,
        '<h3 style="font-size: 1.2rem; margin-bottom: 10px; color: #333;" data-i18n="civil_society_benefit3_title">Visibilité</h3>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="color: #666; font-size: 0.95rem; line-height: 1.5;">Amplifiez la visibilité de vos actions et renforcez votre crédibilité.<\/p>/,
        '<p style="color: #666; font-size: 0.95rem; line-height: 1.5;" data-i18n="civil_society_benefit3_desc">Amplifiez la visibilité de vos actions et renforcez votre crédibilité.</p>'
    );
    
    updatedContent = updatedContent.replace(
        /<h3 style="font-size: 1.2rem; margin-bottom: 10px; color: #333;">Financement<\/h3>/,
        '<h3 style="font-size: 1.2rem; margin-bottom: 10px; color: #333;" data-i18n="civil_society_benefit4_title">Financement</h3>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="color: #666; font-size: 0.95rem; line-height: 1.5;">Découvrez des opportunités de financement adaptées à vos projets.<\/p>/,
        '<p style="color: #666; font-size: 0.95rem; line-height: 1.5;" data-i18n="civil_society_benefit4_desc">Découvrez des opportunités de financement adaptées à vos projets.</p>'
    );
    
    updatedContent = updatedContent.replace(
        /<span>Nous contacter<\/span>/,
        '<span data-i18n="civil_society_join_cta1">Nous contacter</span>'
    );
    
    updatedContent = updatedContent.replace(
        /<span>Télécharger le formulaire<\/span>/,
        '<span data-i18n="civil_society_join_cta2">Télécharger le formulaire</span>'
    );

    // Partners section
    updatedContent = updatedContent.replace(
        /<h2 class="section-title">Nos partenaires<\/h2>/,
        '<h2 class="section-title" data-i18n="civil_society_partners_title">Nos partenaires</h2>'
    );
    
    updatedContent = updatedContent.replace(
        /<p style="font-size: 1.1rem; color: var\(--text-color\); opacity: 0.9; margin-top: 20px;">Nous travaillons avec un réseau diversifié de partenaires locaux et internationaux qui partagent notre engagement pour la promotion des droits.<\/p>/,
        '<p style="font-size: 1.1rem; color: var(--text-color); opacity: 0.9; margin-top: 20px;" data-i18n="civil_society_partners_desc">Nous travaillons avec un réseau diversifié de partenaires locaux et internationaux qui partagent notre engagement pour la promotion des droits.</p>'
    );
    
    updatedContent = updatedContent.replace(
        /<span>Devenir partenaire<\/span>/,
        '<span data-i18n="civil_society_become_partner">Devenir partenaire</span>'
    );

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('Successfully updated civil-society.html with data-i18n attributes');
    });
}); 