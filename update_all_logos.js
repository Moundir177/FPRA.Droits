const fs = require('fs');
const path = require('path');

// Get all HTML files
const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));

// Process each HTML file
htmlFiles.forEach(file => {
  console.log(`Processing ${file}...`);
  let content = fs.readFileSync(file, 'utf8');

  // Add favicon if not present
  if (!content.includes('<link rel="icon" href="img/path742.png"')) {
    content = content.replace(
      /<title.*?<\/title>/,
      '$&\n    <link rel="icon" href="img/path742.png" type="image/png">'
    );
  }

  // Replace header logo with image
  content = content.replace(
    /<div class="logo">[\s\S]*?<a href="index\.html">[\s\S]*?<h1[^>]*>(.*?)<\/h1>[\s\S]*?<\/a>[\s\S]*?<\/div>/g,
    '<div class="logo">\n        <a href="index.html">\n            <img src="img/path742.png" alt="Fondation pour la promotion des droits" style="height: 60px; width: auto;">\n            <h1 class="visually-hidden">$1</h1>\n        </a>\n    </div>'
  );

  // Add logo to footer if not present
  if (content.includes('<!-- Organization Info -->')) {
    content = content.replace(
      /<!-- Organization Info -->[\s\S]*?<div>[\s\S]*?<h3/g,
      '<!-- Organization Info -->\n                <div>\n                    <div style="margin-bottom: 20px;">\n                        <img src="img/path742.png" alt="Fondation pour la promotion des droits" style="height: 80px; width: auto; margin-bottom: 15px;">\n                    </div>\n                    <h3'
    );
  }

  // Add logo to mobile menu toggle
  if (!content.includes('class="mobile-menu-logo"')) {
    content = content.replace(
      /<div class="menu-toggle" aria-label="Menu de navigation" aria-expanded="false">/g,
      '<div class="menu-toggle" aria-label="Menu de navigation" aria-expanded="false">\n                <img src="img/path742.png" alt="" class="mobile-menu-logo" style="height: 35px; width: auto; margin-right: 10px; display: inline-block; vertical-align: middle;">'
    );
  }

  // Write the updated content back to the file
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});

console.log('All HTML files have been updated with the logo!'); 