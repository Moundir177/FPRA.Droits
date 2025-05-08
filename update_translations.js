// This script adds data-i18n attributes to all HTML files to support Arabic translation
const fs = require('fs');
const path = require('path');

// Get all HTML files
const htmlFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));
console.log(`Found ${htmlFiles.length} HTML files to update`);

// Navigation translation mapping
const navTranslations = {
  "Accueil": "nav_home",
  "À propos": "nav_about",
  "Actualités": "nav_news",
  "Revue": "nav_review",
  "Formations": "nav_training",
  "Ressources": "nav_resources",
  "Témoignages": "nav_testimonials",
  "Société civile": "nav_civil_society",
  "Galerie": "nav_gallery",
  "Contact": "nav_contact",
  
  "Notre mission": "nav_mission",
  "Notre vision": "nav_vision",
  "Notre équipe": "nav_team",
  "Notre histoire": "nav_history",
  "Mot du gérant": "nav_manager",
  
  "Dernières actualités": "nav_latest_news",
  "Projets en cours": "nav_projects",
  "Communiqués de presse": "nav_press",
  "Événements à venir": "nav_events",
  
  "Numéro actuel": "nav_current_issue",
  "Archives": "nav_archives",
  "Comment contribuer": "nav_contribute",
  "Comité éditorial": "nav_editorial",
  
  "Programmes de formation": "nav_training_programs",
  "Ateliers": "nav_workshops",
  "Calendrier": "nav_calendar",
  "Inscription": "nav_registration",
  
  "Documentation": "nav_documentation",
  "Publications": "nav_publications",
  "Rapports": "nav_reports",
  "Guides pratiques": "nav_guides",
  "Média": "nav_media",
  "Multimédia": "nav_multimedia",
  
  "Bénéficiaires": "nav_beneficiaries",
  "Partenaires": "nav_partners_list",
  "Experts": "nav_experts",
  "Partagez votre témoignage": "nav_share_testimonial",
  
  "Notre réseau": "nav_network",
  "Nos partenaires": "nav_partners",
  "Collaborations": "nav_collaborations",
  "Rejoindre notre réseau": "nav_join_network",
  
  "Informations générales": "nav_general_info",
  "Relations médias": "nav_media_relations",
  "Support": "nav_support",
  "Carrières": "nav_careers",
  
  "Liens rapides": "footer_quick_links",
  "Suivez-nous": "footer_follow"
};

// Process each file
htmlFiles.forEach(htmlFile => {
  console.log(`Processing ${htmlFile}...`);
  const filePath = path.join('./', htmlFile);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add data-i18n attributes to links and text
  for (const [frenchText, translationKey] of Object.entries(navTranslations)) {
    // Match <a> tags containing the exact French text
    const linkRegex = new RegExp(`<a[^>]*>\\s*${frenchText}\\s*</a>`, 'g');
    content = content.replace(linkRegex, (match) => {
      if (match.includes('data-i18n=')) {
        return match; // Skip if already has data-i18n
      }
      return match.replace('<a', `<a data-i18n="${translationKey}"`);
    });
    
    // Match <span> tags containing the exact French text
    const spanRegex = new RegExp(`<span[^>]*>\\s*${frenchText}\\s*</span>`, 'g');
    content = content.replace(spanRegex, (match) => {
      if (match.includes('data-i18n=')) {
        return match; // Skip if already has data-i18n
      }
      return match.replace('<span', `<span data-i18n="${translationKey}"`);
    });
    
    // Match dropdown headers
    const headerRegex = new RegExp(`<div class="dropdown-section-header"[^>]*>\\s*${frenchText}\\s*</div>`, 'g');
    content = content.replace(headerRegex, (match) => {
      if (match.includes('data-i18n=')) {
        return match; // Skip if already has data-i18n
      }
      return match.replace('<div class="dropdown-section-header"', `<div class="dropdown-section-header" data-i18n="${translationKey}"`);
    });
    
    // Add more specific patterns as needed
  }
  
  // Special case for the h3 in the footer (site title)
  content = content.replace(/<div class="footer-section">\s*<h3>Fondation pour la promotion des droits<\/h3>/g, 
    `<div class="footer-section">\n                    <h3 data-i18n="site_title_full">Fondation pour la promotion des droits</h3>`);
  
  // Special case for the footer mission
  content = content.replace(/<p>Ensemble, pour des droits connus, reconnus et défendus.<\/p>/g, 
    `<p data-i18n="footer_mission">Ensemble, pour des droits connus, reconnus et défendus.</p>`);
  
  // Special case for the footer copyright
  content = content.replace(/<p>&copy; 2024 Fondation pour la promotion des droits. Tous droits réservés.<\/p>/g, 
    `<p data-i18n="footer_copyright">&copy; 2024 Fondation pour la promotion des droits. Tous droits réservés.</p>`);
  
  // Save the updated file
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${htmlFile}`);
});

console.log('All HTML files have been updated with data-i18n attributes.'); 