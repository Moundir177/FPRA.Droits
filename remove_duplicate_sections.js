const fs = require('fs');
const path = require('path');

// Identify the sections we want to remove based on the user's request
// 1. Blue gradient "Restons connectés" section (seen in screenshot)
// 2. White background section in formations.html that contains "Suivez-nous pour les actualités de formation"
// 3. Any duplicate "Restez connectés" sections in société civile

// Get all HTML files
const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
console.log(`Found ${htmlFiles.length} HTML files to process.`);

// Process each HTML file
htmlFiles.forEach(file => {
  console.log(`\nProcessing ${file}...`);
  let content = fs.readFileSync(file, 'utf8');
  let originalLength = content.length;
  let modified = false;

  // Special case for formations.html - look for the section with "Suivez-nous pour les actualités de formation"
  if (file === 'formations.html') {
    // Check for the white background social links section
    if (content.includes('Suivez-nous pour les actualités de formation')) {
      console.log(`Found "Suivez-nous pour les actualités de formation" in ${file}`);
      
      // This regex specifically targets the social links section with the heading
      const socialLinksPattern = /<section[^>]*class=["']social-links["'][^>]*>[\s\S]*?Suivez-nous pour les actualités de formation[\s\S]*?<\/section>/i;
      const newContent = content.replace(socialLinksPattern, '');
      
      if (newContent.length !== content.length) {
        content = newContent;
        modified = true;
        console.log(`Removed social links section from ${file}`);
      }
    }
  }
  
  // Look for blue gradient section with "Restons connectés" - this is in the screenshot
  // This section has a blue gradient background
  if ((file === 'contact.html' || file.includes('civil-society') || file === 'societe-civile.html')) {
    // More specific search for the blue gradient section
    if (content.includes('Restons connectés')) {
      console.log(`Found "Restons connectés" text in ${file}`);
      
      // This pattern looks for section tags containing the heading "Restons connectés"
      // and is more likely to match the exact section shown in the screenshot
      const blueGradientPattern = /<section[^>]*>[\s\S]*?<h2[^>]*>Restons connectés<\/h2>[\s\S]*?<\/section>/i;
      const altPattern = /<section[^>]*>[\s\S]*?Restons connectés[\s\S]*?Suivez-nous sur les réseaux sociaux[\s\S]*?<\/section>/i;
      
      let newContent = content.replace(blueGradientPattern, '');
      
      if (newContent.length === content.length) {
        // Try the alternative pattern if the first one didn't match
        newContent = content.replace(altPattern, '');
      }
      
      if (newContent.length !== content.length) {
        content = newContent;
        modified = true;
        console.log(`Removed blue gradient section with "Restons connectés" from ${file}`);
      }
    }
  }

  // Save changes if the file was modified
  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file} (removed ${originalLength - content.length} bytes)`);
  } else {
    console.log(`No changes made to ${file}`);
  }
});

console.log('\nFinished removing duplicate "Restez connectés" sections'); 