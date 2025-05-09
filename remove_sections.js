const fs = require('fs');

// This script will:
// 1. Remove the blue gradient section with "Restons connectés" visible in the screenshot
// 2. Remove duplicate section in formations.html with white background

// First, let's remove the blue section from all HTML files
const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
console.log(`Found ${htmlFiles.length} HTML files to check.`);

// We can see in the screenshot that the section has specific elements:
// - Blue gradient background
// - "Restons connectés" heading
// - Social media icons in circular buttons

let blueGradientCount = 0;
let formationsCount = 0;

// Process each file
htmlFiles.forEach(file => {
  console.log(`\nChecking ${file}...`);
  let content = fs.readFileSync(file, 'utf8');
  const originalLength = content.length;
  let modified = false;
  
  // Look for blue gradient section (matches the screenshot)
  // Common patterns found in this section
  if (content.includes('Restons connectés') && 
      content.includes('réseaux sociaux') && 
      content.includes('linear-gradient')) {
      
    console.log(`Found potential match in ${file} for blue gradient section`);
    
    // Target the section by pattern matching, being specific to what we see in the screenshot
    // The section has: a blue gradient background, "Restons connectés" text, and social media buttons
    const bluePattern = /<section[^>]*?>[\s\S]*?(?:Restons connectés|Restez connectés)[\s\S]*?(?:réseaux sociaux|actualités)[\s\S]*?fa-(?:facebook|twitter|instagram)[\s\S]*?<\/section>/i;
    
    // Try to match the section
    const matched = content.match(bluePattern);
    if (matched) {
      console.log(`Found blue gradient section in ${file} (${matched[0].length} bytes)`);
      
      // Remove the section
      const newContent = content.replace(bluePattern, '');
      if (newContent.length !== content.length) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Removed blue gradient section from ${file} (${content.length - newContent.length} bytes removed)`);
        content = newContent; // Update content for further checks
        modified = true;
        blueGradientCount++;
      }
    }
  }
  
  // Special case for formations.html - white background section with social cards
  if (file === 'formations.html' && content.includes('social-links') && content.includes('social-card')) {
    console.log(`Found potential match in ${file} for white background social section`);
    
    // This pattern is specific to the formations.html social cards section
    const whitePattern = /<section[^>]*?class="social-links"[\s\S]*?<div class="social-cards"[\s\S]*?<\/section>/i;
    
    // Try to match the section
    const matched = content.match(whitePattern);
    if (matched) {
      console.log(`Found white background social section in ${file} (${matched[0].length} bytes)`);
      
      // Remove the section
      const newContent = content.replace(whitePattern, '');
      if (newContent.length !== content.length) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Removed white background social section from ${file} (${content.length - newContent.length} bytes removed)`);
        modified = true;
        formationsCount++;
      }
    }
  }
  
  if (!modified) {
    console.log(`No changes made to ${file}`);
  }
});

console.log(`\nSummary: Removed ${blueGradientCount} blue gradient sections and ${formationsCount} white background sections.`); 