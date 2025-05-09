const fs = require('fs');

// Read the index.html file where we know the blue section exists (from the screenshot)
console.log('Checking index.html for the blue "Restons connectés" section...');
let content = fs.readFileSync('index.html', 'utf8');

// The blue section we want to remove has a style with linear-gradient background
// It's a distinct section that matches what's in the screenshot
const blueSection = /<section[^>]*?style="[^"]*?background: linear-gradient[^"]*?"[^>]*>[\s\S]*?Restons connectés[\s\S]*?<\/section>/i;

// Let's extract this section for debugging
const match = content.match(blueSection);
if (match) {
  console.log('Found the blue "Restons connectés" section:');
  console.log('Length of section: ' + match[0].length + ' bytes');
  
  // Now remove this section from index.html
  const newContent = content.replace(blueSection, '');
  fs.writeFileSync('index.html', newContent, 'utf8');
  console.log('Removed the blue section from index.html');
  
  // Get a list of all HTML files
  const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html') && file !== 'index.html');
  console.log(`Found ${htmlFiles.length} additional HTML files to process.`);
  
  // Remove the same section from all other HTML files
  htmlFiles.forEach(file => {
    console.log(`Processing ${file}...`);
    let fileContent = fs.readFileSync(file, 'utf8');
    let originalLength = fileContent.length;
    
    const updatedContent = fileContent.replace(blueSection, '');
    
    if (updatedContent.length !== originalLength) {
      fs.writeFileSync(file, updatedContent, 'utf8');
      console.log(`Removed the blue section from ${file} (${originalLength - updatedContent.length} bytes)`);
    } else {
      console.log(`No changes made to ${file}`);
    }
  });
} else {
  console.log('Could not find the blue "Restons connectés" section in index.html.');
}

// Special case for formations.html - remove the social links section with white background
if (fs.existsSync('formations.html')) {
  console.log('\nChecking formations.html for duplicate social links section...');
  let formationsContent = fs.readFileSync('formations.html', 'utf8');
  
  // Look for the section with the class "social-links" that contains social media cards
  if (formationsContent.includes('class="social-links"') && formationsContent.includes('social-cards')) {
    const socialLinksSection = /<section class="social-links"[\s\S]*?<\/section>/i;
    const match = formationsContent.match(socialLinksSection);
    
    if (match) {
      console.log('Found social links section in formations.html');
      const newContent = formationsContent.replace(socialLinksSection, '');
      fs.writeFileSync('formations.html', newContent, 'utf8');
      console.log(`Removed social links section from formations.html (${match[0].length} bytes)`);
    }
  } else {
    console.log('No social links section found in formations.html');
  }
}

console.log('\nFinished removing duplicate "Restons connectés" sections'); 