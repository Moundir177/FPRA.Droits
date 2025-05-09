// Script to complete Arabic translation in civil-society.html by adding data-i18n attributes

document.addEventListener('DOMContentLoaded', function() {
    const elementsToTranslate = [
        // Support Projects section (already partly translated)
        { selector: '.support-programs h4:contains("Micro-financement")', attribute: 'civil_society_program1_feature3_title' },
        { selector: '.support-programs p:contains("Appui financier limité")', attribute: 'civil_society_program1_feature3_desc' },
        { selector: '.support-programs .btn-apply span:contains("Postuler")', attribute: 'civil_society_program1_cta' },
        
        // Protection des défenseurs
        { selector: '.program-card h3:contains("Protection des défenseurs")', attribute: 'civil_society_program2_title' },
        { selector: '.program-card p:contains("Mécanisme de soutien")', attribute: 'civil_society_program2_desc' },
        { selector: '.program-card h4:contains("Réponse d\'urgence")', attribute: 'civil_society_program2_feature1_title' },
        { selector: '.program-card p:contains("Assistance rapide")', attribute: 'civil_society_program2_feature1_desc' },
        { selector: '.program-card h4:contains("Assistance juridique")', attribute: 'civil_society_program2_feature2_title' },
        { selector: '.program-card p:contains("Conseils et représentation")', attribute: 'civil_society_program2_feature2_desc' },
        { selector: '.program-card h4:contains("Soutien psychosocial")', attribute: 'civil_society_program2_feature3_title' },
        { selector: '.program-card p:contains("Accompagnement pour gérer")', attribute: 'civil_society_program2_feature3_desc' },
        { selector: '.program-card .btn-apply span:contains("Demander une assistance")', attribute: 'civil_society_program2_cta' },
        
        // Gouvernance associative
        { selector: '.program-card h3:contains("Gouvernance associative")', attribute: 'civil_society_program3_title' },
        { selector: '.program-card p:contains("Programme visant à renforcer")', attribute: 'civil_society_program3_desc' },
        { selector: '.program-card h4:contains("Audit organisationnel")', attribute: 'civil_society_program3_feature1_title' },
        { selector: '.program-card p:contains("Évaluation des forces")', attribute: 'civil_society_program3_feature1_desc' },
        { selector: '.program-card h4:contains("Planification stratégique")', attribute: 'civil_society_program3_feature2_title' },
        { selector: '.program-card p:contains("Définition d\'objectifs")', attribute: 'civil_society_program3_feature2_desc' },
        { selector: '.program-card h4:contains("Gestion financière")', attribute: 'civil_society_program3_feature3_title' },
        { selector: '.program-card p:contains("Renforcement des processus")', attribute: 'civil_society_program3_feature3_desc' },
        { selector: '.program-card .btn-apply span:contains("Demander un accompagnement")', attribute: 'civil_society_program3_cta' },
        
        // Soutien aux projets section
        { selector: '.civil-box h3:contains("Soutien aux projets")', attribute: 'civil_society_service4_title' },
        { selector: '.civil-box p:contains("Accompagnement dans la conception")', attribute: 'civil_society_service4_desc' },
        { selector: '.civil-box .service-features div:contains("Conception de projets") span', attribute: 'civil_society_service4_feature1' },
        { selector: '.civil-box .service-features div:contains("Suivi et évaluation") span', attribute: 'civil_society_service4_feature2' },
        { selector: '.civil-box .service-features div:contains("Capitalisation") span', attribute: 'civil_society_service4_feature3' },
        { selector: '.civil-box a.btn-primary span:contains("Proposer un projet")', attribute: 'civil_society_service4_cta' },
        
        // Plaidoyer section
        { selector: '.civil-box h3:contains("Plaidoyer")', attribute: 'civil_society_service5_title' },
        { selector: '.civil-box p:contains("Soutien aux actions de plaidoyer")', attribute: 'civil_society_service5_desc' },
        { selector: '.civil-box .service-features div:contains("Stratégies d\'influence") span', attribute: 'civil_society_service5_feature1' },
        { selector: '.civil-box .service-features div:contains("Campagnes thématiques") span', attribute: 'civil_society_service5_feature2' },
        { selector: '.civil-box .service-features div:contains("Communication d\'impact") span', attribute: 'civil_society_service5_feature3' },
        
        // Accès aux financements section
        { selector: '.civil-box h3:contains("Accès aux financements")', attribute: 'civil_society_service6_title' },
        { selector: '.civil-box p:contains("Information sur les opportunités")', attribute: 'civil_society_service6_desc' },
        { selector: '.civil-box .service-features div:contains("Veille sur les financements") span', attribute: 'civil_society_service6_feature1' },
        { selector: '.civil-box .service-features div:contains("Appui aux demandes") span', attribute: 'civil_society_service6_feature2' },
        { selector: '.civil-box .service-features div:contains("Diversification des ressources") span', attribute: 'civil_society_service6_feature3' },
        { selector: '.civil-box a.btn-primary span:contains("Nous contacter")', attribute: 'civil_society_service6_cta' },
        
        // Networks section
        { selector: 'h2.section-title:contains("Réseaux et collaborations")', attribute: 'civil_society_networks_title' },
        { selector: 'p:contains("La Fondation pour la promotion des droits facilite")', attribute: 'civil_society_networks_desc' },
        
        // Network 1
        { selector: '.network-item h3:contains("Réseau des Défenseurs des Droits")', attribute: 'civil_society_network1_title' },
        { selector: '.network-item p:contains("Coalition d\'organisations")', attribute: 'civil_society_network1_desc' },
        { selector: '.network-item h4:contains("Activités principales")', attribute: 'civil_society_network1_activities' },
        { selector: '.network-item span:contains("Réunions trimestrielles")', attribute: 'civil_society_network1_activity1' },
        { selector: '.network-item span:contains("Groupe de discussion en ligne")', attribute: 'civil_society_network1_activity2' },
        { selector: '.network-item span:contains("Publications conjointes")', attribute: 'civil_society_network1_activity3' },
        { selector: '.network-item a.btn-link span:contains("Rejoindre ce réseau")', attribute: 'civil_society_network1_cta' },
        
        // Network 2
        { selector: '.network-item h3:contains("Collectif pour les Droits des Femmes")', attribute: 'civil_society_network2_title' },
        { selector: '.network-item p:contains("Alliance d\'associations œuvrant")', attribute: 'civil_society_network2_desc' },
        { selector: '.network-item:contains("Collectif pour les Droits des Femmes") h4:contains("Activités principales")', attribute: 'civil_society_network2_activities' },
        { selector: '.network-item:contains("Collectif pour les Droits des Femmes") span:contains("Campagnes de sensibilisation")', attribute: 'civil_society_network2_activity1' },
        { selector: '.network-item:contains("Collectif pour les Droits des Femmes") span:contains("Assistance juridique mutuelle")', attribute: 'civil_society_network2_activity2' },
        { selector: '.network-item:contains("Collectif pour les Droits des Femmes") span:contains("Projets collaboratifs")', attribute: 'civil_society_network2_activity3' },
        { selector: '.network-item:contains("Collectif pour les Droits des Femmes") a.btn-link span:contains("Rejoindre ce réseau")', attribute: 'civil_society_network2_cta' },
        
        // Network 3
        { selector: '.network-item h3:contains("Plateforme Jeunesse et Droits")', attribute: 'civil_society_network3_title' },
        { selector: '.network-item p:contains("Espace dédié aux organisations")', attribute: 'civil_society_network3_desc' },
        { selector: '.network-item:contains("Plateforme Jeunesse et Droits") h4:contains("Activités principales")', attribute: 'civil_society_network3_activities' },
        { selector: '.network-item span:contains("Incubation d\'initiatives")', attribute: 'civil_society_network3_activity1' },
        { selector: '.network-item span:contains("Mentorat entre pairs")', attribute: 'civil_society_network3_activity2' },
        { selector: '.network-item span:contains("Forums de dialogue")', attribute: 'civil_society_network3_activity3' },
        { selector: '.network-item:contains("Plateforme Jeunesse et Droits") a.btn-link span:contains("Rejoindre ce réseau")', attribute: 'civil_society_network3_cta' },
        
        // Network creation section
        { selector: '.network-create-cta h3:contains("Créez votre réseau thématique")', attribute: 'civil_society_create_network_title' },
        { selector: '.network-create-cta p:contains("Vous souhaitez mettre en place")', attribute: 'civil_society_create_network_desc' },
        { selector: '.network-create-cta a.btn-white span:contains("Proposer un réseau")', attribute: 'civil_society_create_network_cta1' },
        { selector: '.network-create-cta a.btn-outline span:contains("En savoir plus")', attribute: 'civil_society_create_network_cta2' },
        
        // Join Networks section
        { selector: 'h2:contains("Rejoignez nos réseaux")', attribute: 'civil_society_join_title' },
        { selector: 'p:contains("Vous êtes une organisation de la société civile")', attribute: 'civil_society_join_desc' },
        { selector: '.benefit-item h3:contains("Communauté")', attribute: 'civil_society_benefit1_title' },
        { selector: '.benefit-item p:contains("Rejoignez une communauté dynamique")', attribute: 'civil_society_benefit1_desc' },
        { selector: '.benefit-item h3:contains("Expertise")', attribute: 'civil_society_benefit2_title' },
        { selector: '.benefit-item p:contains("Accédez à l\'expertise")', attribute: 'civil_society_benefit2_desc' },
        { selector: '.benefit-item h3:contains("Visibilité")', attribute: 'civil_society_benefit3_title' },
        { selector: '.benefit-item p:contains("Amplifiez la visibilité")', attribute: 'civil_society_benefit3_desc' },
        { selector: '.benefit-item h3:contains("Financement")', attribute: 'civil_society_benefit4_title' },
        { selector: '.benefit-item p:contains("Découvrez des opportunités")', attribute: 'civil_society_benefit4_desc' },
        { selector: '.cta-buttons a.btn-primary span:contains("Nous contacter")', attribute: 'civil_society_join_cta1' },
        { selector: '.cta-buttons a.btn-outline span:contains("Télécharger le formulaire")', attribute: 'civil_society_join_cta2' },
        
        // Partners section
        { selector: 'h2.section-title:contains("Nos partenaires")', attribute: 'civil_society_partners_title' },
        { selector: 'p:contains("Nous travaillons avec un réseau diversifié")', attribute: 'civil_society_partners_desc' },
        { selector: 'a span:contains("Devenir partenaire")', attribute: 'civil_society_become_partner' }
    ];
    
    // Add data-i18n attributes to elements
    elementsToTranslate.forEach(function(item) {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach(function(element) {
            element.setAttribute('data-i18n', item.attribute);
        });
    });
    
    // After adding all attributes, trigger the translation function if it exists
    if (typeof translatePage === 'function') {
        translatePage();
    }
});

// Helper function to execute the translation immediately on imported pages
function applyTranslationToCivilSociety() {
    // Get current language
    const currentLang = localStorage.getItem('lang') || 'fr';
    
    // Apply RTL for Arabic
    if (currentLang === 'ar') {
        document.body.classList.add('rtl');
        document.documentElement.setAttribute('dir', 'rtl');
    }
    
    // Get all elements with data-i18n attribute
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    
    // Replace content with translations
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.innerHTML = translations[currentLang][key];
        }
    });
}

// Run immediately if page is already loaded
if (document.readyState === 'complete') {
    applyTranslationToCivilSociety();
} else {
    // Otherwise wait for it to load
    window.addEventListener('load', applyTranslationToCivilSociety);
} 