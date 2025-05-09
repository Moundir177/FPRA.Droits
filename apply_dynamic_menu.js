const fs = require('fs');
const path = require('path');

// HTML content to insert for the dynamic menu
const dynamicMenuHeader = `
    <!-- Dynamic Menu Header -->
    <header class="dynamic-header">
        <div class="dynamic-header-inner">
            <!-- Logo -->
            <a href="index.html" class="dynamic-logo">
                <img src="img/path742.png" alt="Fondation pour la promotion des droits" aria-hidden="true">
                <span class="visually-hidden">Fondation pour la promotion des droits</span>
            </a>
            
            <!-- Navigation Menu -->
            <nav aria-label="Navigation principale">
                <ul class="dynamic-nav-menu">
                    <li><a href="index.html" data-i18n="nav_home">Accueil</a></li>
                    
                    <li class="dropdown">
                        <a href="about.html" class="dropdown-toggle" data-i18n="nav_about">À propos</a>
                        <ul class="dropdown-menu">
                            <li><a href="about.html#mission" data-i18n="nav_mission">Notre mission</a></li>
                            <li><a href="about.html#vision" data-i18n="nav_vision">Notre vision</a></li>
                            <li><a href="about.html#team" data-i18n="nav_team">Notre équipe</a></li>
                            <li><a href="about.html#history" data-i18n="nav_history">Notre histoire</a></li>
                        </ul>
                    </li>
                    
                    <li class="dropdown">
                        <a href="news.html" class="dropdown-toggle" data-i18n="nav_news">Actualités</a>
                        <ul class="dropdown-menu">
                            <li><a href="news.html#latest" data-i18n="nav_latest_news">Dernières actualités</a></li>
                            <li><a href="news.html#projects" data-i18n="nav_projects">Projets en cours</a></li>
                            <li><a href="news.html#press" data-i18n="nav_press">Communiqués de presse</a></li>
                            <li><a href="news.html#events" data-i18n="nav_events">Événements à venir</a></li>
                        </ul>
                    </li>
                    
                    <li class="dropdown">
                        <a href="revue.html" class="dropdown-toggle" data-i18n="nav_review">Revue</a>
                        <ul class="dropdown-menu">
                            <li><a href="revue.html#current" data-i18n="nav_current_issue">Numéro actuel</a></li>
                            <li><a href="revue.html#archives" data-i18n="nav_archives">Archives</a></li>
                            <li><a href="revue.html#contribute" data-i18n="nav_contribute">Comment contribuer</a></li>
                            <li><a href="revue.html#editorial" data-i18n="nav_editorial">Comité éditorial</a></li>
                        </ul>
                    </li>
                    
                    <li class="dropdown">
                        <a href="formations.html" class="dropdown-toggle" data-i18n="nav_training">Formations</a>
                        <ul class="dropdown-menu">
                            <li><a href="formations.html#programs" data-i18n="nav_training_programs">Programmes de formation</a></li>
                            <li><a href="formations.html#workshops" data-i18n="nav_workshops">Ateliers</a></li>
                            <li><a href="formations.html#calendar" data-i18n="nav_calendar">Calendrier</a></li>
                            <li><a href="formations.html#registration" data-i18n="nav_registration">Inscription</a></li>
                        </ul>
                    </li>
                    
                    <li class="dropdown">
                        <a href="resources.html" class="dropdown-toggle" data-i18n="nav_resources">Ressources</a>
                        <ul class="dropdown-menu">
                            <li><a href="resources.html#publications" data-i18n="nav_publications">Publications</a></li>
                            <li><a href="resources.html#reports" data-i18n="nav_reports">Rapports</a></li>
                            <li><a href="resources.html#guides" data-i18n="nav_guides">Guides pratiques</a></li>
                            <li><a href="resources.html#multimedia" data-i18n="nav_multimedia">Multimédia</a></li>
                        </ul>
                    </li>
                    
                    <li><a href="testimonials.html" data-i18n="nav_testimonials">Témoignages</a></li>
                    <li><a href="civil-society.html" data-i18n="nav_civil_society">Société civile</a></li>
                    <li><a href="gallery.html" data-i18n="nav_gallery">Galerie</a></li>
                    <li><a href="contact.html" data-i18n="nav_contact">Contact</a></li>
                    
                    <!-- Language Switcher for Mobile -->
                    <div class="dynamic-lang-switch">
                        <a href="#" data-lang="fr" class="active">FR</a>
                        <a href="#" data-lang="ar">AR</a>
                    </div>
                </ul>
            </nav>
            
            <!-- Desktop Language Switcher -->
            <div class="dynamic-lang-switch">
                <a href="#" data-lang="fr" class="active">FR</a>
                <a href="#" data-lang="ar">AR</a>
            </div>
            
            <!-- Mobile Menu Toggle -->
            <div class="dynamic-menu-toggle" aria-label="Menu" aria-expanded="false" aria-controls="mobile-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </header>
    
    <!-- Menu Overlay for Mobile -->
    <div class="dynamic-menu-overlay"></div>
`;

// CSS link to add to head
const cssLinkTag = '<link rel="stylesheet" href="css/dynamic-menu.css">';

// JS script to add at the end
const jsScriptTag = '<script src="js/dynamic-menu.js"></script>';

// Process all HTML files
function processHtmlFiles() {
    try {
        // Get all HTML files
        const directory = './';
        const htmlFiles = fs.readdirSync(directory).filter(file => file.endsWith('.html'));
        console.log(`Found ${htmlFiles.length} HTML files to process...`);
        
        htmlFiles.forEach(file => {
            const filePath = path.join(directory, file);
            console.log(`Processing ${file}...`);
            
            try {
                // Read file content
                let content = fs.readFileSync(filePath, 'utf8');
                
                // Skip files that already have the dynamic menu
                if (content.includes('dynamic-header')) {
                    console.log(`Dynamic menu already exists in ${file}, skipping...`);
                    return;
                }
                
                // 1. Add CSS link to head
                if (!content.includes(cssLinkTag)) {
                    content = content.replace('</head>', `    ${cssLinkTag}\n</head>`);
                    console.log(`Added CSS link to ${file}`);
                }
                
                // 2. Add the dynamic menu after skip-link
                if (content.includes('<a href="#content" class="skip-link"')) {
                    content = content.replace(
                        /<a href="#content" class="skip-link".*?<\/a>/s, 
                        '$&\n' + dynamicMenuHeader
                    );
                    console.log(`Added dynamic menu to ${file}`);
                }
                
                // 3. Add the JS script before closing body tag
                if (!content.includes(jsScriptTag)) {
                    content = content.replace('</body>', `    ${jsScriptTag}\n</body>`);
                    console.log(`Added JS script to ${file}`);
                }
                
                // Write modified content back to file
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✅ Successfully updated ${file}`);
                
            } catch (err) {
                console.error(`Error processing ${file}: ${err.message}`);
            }
        });
        
        console.log('Finished applying dynamic menu to all HTML files.');
        
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}

// Run the processor
processHtmlFiles(); 