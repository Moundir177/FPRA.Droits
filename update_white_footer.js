const fs = require('fs');
const path = require('path');

// Get all HTML files
const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));

// The new footer HTML with white background
const newFooterHTML = `
<footer style="background: white; color: #333; padding: 60px 0 0; position: relative; overflow: hidden; box-shadow: 0 -5px 20px rgba(0,0,0,0.05);">
    <!-- Background decorative elements -->
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.03; pointer-events: none;">
        <div style="position: absolute; bottom: -100px; right: -100px; width: 300px; height: 300px; border-radius: 50%; background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);"></div>
        <div style="position: absolute; top: -50px; left: -50px; width: 200px; height: 200px; border-radius: 50%; background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);"></div>
    </div>
    
    <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; margin-bottom: 40px;">
            <!-- Organization Info -->
            <div>
                <div style="margin-bottom: 20px;">
                    <img src="img/path742.png" alt="Fondation pour la promotion des droits" style="height: 80px; width: auto; margin-bottom: 15px;">
                </div>
                <h3 style="font-size: 1.3rem; margin-bottom: 20px; position: relative; padding-bottom: 15px; font-weight: 600; color: #333;" data-i18n="site_title_full">
                    Fondation pour la promotion des droits
                    <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background: var(--primary-color); border-radius: 3px;"></span>
                </h3>
                <p style="margin-bottom: 20px; line-height: 1.6; color: #555;" data-i18n="footer_mission">Ensemble, pour des droits connus, reconnus et défendus.</p>
                <div style="margin-top: 25px;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <i class="fas fa-map-marker-alt" style="width: 20px; color: var(--primary-color);"></i>
                        <span style="color: #555;">Alger, Algérie</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <i class="fas fa-envelope" style="width: 20px; color: var(--primary-color);"></i>
                        <a href="mailto:contact@fondationdroits.org" style="color: #555; text-decoration: none; transition: all 0.3s ease;">contact@fondationdroits.org</a>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-phone" style="width: 20px; color: var(--primary-color);"></i>
                        <a href="tel:+21300000000" style="color: #555; text-decoration: none; transition: all 0.3s ease;">+213 XX XX XX XX</a>
                    </div>
                </div>
            </div>
            
            <!-- Liens rapides -->
            <div>
                <h3 style="font-size: 1.3rem; margin-bottom: 20px; position: relative; padding-bottom: 15px; font-weight: 600; color: #333;">
                    Liens rapides
                    <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background: var(--primary-color); border-radius: 3px;"></span>
                </h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="margin-bottom: 12px;">
                        <a href="index.html" style="color: #555; text-decoration: none; display: flex; align-items: center; transition: all 0.3s ease;" data-i18n="nav_home">
                            <i class="fas fa-chevron-right" style="font-size: 0.8rem; margin-right: 10px; color: var(--primary-color);"></i> Accueil
                        </a>
                    </li>
                    <li style="margin-bottom: 12px;">
                        <a href="about.html" style="color: #555; text-decoration: none; display: flex; align-items: center; transition: all 0.3s ease;" data-i18n="nav_about">
                            <i class="fas fa-chevron-right" style="font-size: 0.8rem; margin-right: 10px; color: var(--primary-color);"></i> À propos
                        </a>
                    </li>
                    <li style="margin-bottom: 12px;">
                        <a href="news.html" style="color: #555; text-decoration: none; display: flex; align-items: center; transition: all 0.3s ease;" data-i18n="nav_news">
                            <i class="fas fa-chevron-right" style="font-size: 0.8rem; margin-right: 10px; color: var(--primary-color);"></i> Actualités
                        </a>
                    </li>
                    <li style="margin-bottom: 12px;">
                        <a href="revue.html" style="color: #555; text-decoration: none; display: flex; align-items: center; transition: all 0.3s ease;" data-i18n="nav_review">
                            <i class="fas fa-chevron-right" style="font-size: 0.8rem; margin-right: 10px; color: var(--primary-color);"></i> Revue
                        </a>
                    </li>
                    <li style="margin-bottom: 12px;">
                        <a href="formations.html" style="color: #555; text-decoration: none; display: flex; align-items: center; transition: all 0.3s ease;" data-i18n="nav_training">
                            <i class="fas fa-chevron-right" style="font-size: 0.8rem; margin-right: 10px; color: var(--primary-color);"></i> Formations
                        </a>
                    </li>
                </ul>
            </div>
            
            <!-- Autres liens -->
            <div>
                <h3 style="font-size: 1.3rem; margin-bottom: 20px; position: relative; padding-bottom: 15px; font-weight: 600; color: #333;">
                    Informations
                    <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background: var(--primary-color); border-radius: 3px;"></span>
                </h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="margin-bottom: 12px;">
                        <a href="resources.html" style="color: #555; text-decoration: none; display: flex; align-items: center; transition: all 0.3s ease;" data-i18n="nav_resources">
                            <i class="fas fa-chevron-right" style="font-size: 0.8rem; margin-right: 10px; color: var(--primary-color);"></i> Ressources
                        </a>
                    </li>
                    <li style="margin-bottom: 12px;">
                        <a href="testimonials.html" style="color: #555; text-decoration: none; display: flex; align-items: center; transition: all 0.3s ease;" data-i18n="nav_testimonials">
                            <i class="fas fa-chevron-right" style="font-size: 0.8rem; margin-right: 10px; color: var(--primary-color);"></i> Témoignages
                        </a>
                    </li>
                    <li style="margin-bottom: 12px;">
                        <a href="civil-society.html" style="color: #555; text-decoration: none; display: flex; align-items: center; transition: all 0.3s ease;" data-i18n="nav_civil_society">
                            <i class="fas fa-chevron-right" style="font-size: 0.8rem; margin-right: 10px; color: var(--primary-color);"></i> Société civile
                        </a>
                    </li>
                    <li style="margin-bottom: 12px;">
                        <a href="gallery.html" style="color: #555; text-decoration: none; display: flex; align-items: center; transition: all 0.3s ease;" data-i18n="nav_gallery">
                            <i class="fas fa-chevron-right" style="font-size: 0.8rem; margin-right: 10px; color: var(--primary-color);"></i> Galerie
                        </a>
                    </li>
                    <li style="margin-bottom: 12px;">
                        <a href="contact.html" style="color: #555; text-decoration: none; display: flex; align-items: center; transition: all 0.3s ease;" data-i18n="nav_contact">
                            <i class="fas fa-chevron-right" style="font-size: 0.8rem; margin-right: 10px; color: var(--primary-color);"></i> Contact
                        </a>
                    </li>
                </ul>
            </div>
            
            <!-- Suivez-nous -->
            <div>
                <h3 style="font-size: 1.3rem; margin-bottom: 20px; position: relative; padding-bottom: 15px; font-weight: 600; color: #333;">
                    Suivez-nous
                    <span style="position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background: var(--primary-color); border-radius: 3px;"></span>
                </h3>
                <p style="margin-bottom: 20px; color: #555; line-height: 1.6;">Restez connecté(e) avec nous sur les réseaux sociaux pour suivre nos actualités et événements.</p>
                <div style="display: flex; gap: 15px;">
                    <a href="https://web.facebook.com/profile.php?id=61566611772758&sk=about" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: var(--primary-color); border-radius: 50%; color: white; font-size: 18px; transition: all 0.3s ease;">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://x.com/FondationDZ" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: var(--primary-color); border-radius: 50%; color: white; font-size: 18px; transition: all 0.3s ease;">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.instagram.com/fondationdz" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: var(--primary-color); border-radius: 50%; color: white; font-size: 18px; transition: all 0.3s ease;">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: var(--primary-color); border-radius: 50%; color: white; font-size: 18px; transition: all 0.3s ease;">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
        </div>
        
        <!-- Footer Bottom -->
        <div style="padding: 20px 0; border-top: 1px solid rgba(0,0,0,0.1); text-align: center;">
            <p style="margin: 0; color: #555; font-size: 0.9rem;">© 2024 Fondation pour la promotion des droits. Tous droits réservés.</p>
        </div>
    </div>
    
    <!-- Scroll to top button -->
    <a href="#" id="scroll-to-top" style="position: absolute; right: 30px; bottom: 30px; width: 50px; height: 50px; background-color: var(--primary-color); color: white; display: flex; justify-content: center; align-items: center; border-radius: 50%; text-decoration: none; font-size: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); transition: all 0.3s ease;">
        <i class="fas fa-arrow-up"></i>
    </a>
</footer>`;

// Process each HTML file
htmlFiles.forEach(file => {
  if (file === 'index.html') {
    // Skip index.html as we already updated it manually
    console.log(`Skipping ${file} (already updated)`);
    return;
  }
  
  console.log(`Processing ${file}...`);
  let content = fs.readFileSync(file, 'utf8');

  // Replace the old footer with the new white footer
  // This regular expression looks for the footer tag and everything inside it
  const footerRegex = /<footer[\s\S]*?<\/footer>/;
  
  if (content.match(footerRegex)) {
    content = content.replace(footerRegex, newFooterHTML);
    
    // Write the updated content back to the file
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file} with white footer`);
  } else {
    console.log(`No footer found in ${file}`);
  }
});

console.log('All HTML files have been updated with the white footer!'); 