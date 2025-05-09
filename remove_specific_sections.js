const fs = require('fs');

// Based on the screenshot, we can directly target the section to remove
// This is the blue gradient section with the heading "Restons connectés"

console.log('Removing blue gradient "Restons connectés" section and duplicate social sections...');

// We will directly target index.html first to see if we can get the exact section
try {
  if (fs.existsSync('index.html')) {
    console.log('Processing index.html...');
    let content = fs.readFileSync('index.html', 'utf8');
    
    // This is the exact section we see in the screenshot
    // It has a blue gradient background and shows social media links
    if (content.includes('Restons connectés')) {
      console.log('Found "Restons connectés" text in index.html');
      
      // Extract the section between <section> and </section> that contains "Restons connectés"
      const sectionPattern = /<section[^>]*>[\s\S]*?Restons connectés[\s\S]*?<\/section>/i;
      const match = content.match(sectionPattern);
      
      if (match) {
        // Output details of the matched section to help debug
        const section = match[0];
        console.log(`Found section in index.html (${section.length} bytes)`);
        console.log(`Section preview: ${section.substring(0, 100)}...`);
        
        // Remove this section
        const newContent = content.replace(section, '');
        fs.writeFileSync('index.html', newContent, 'utf8');
        console.log(`Removed section from index.html (${content.length - newContent.length} bytes removed)`);
      }
    }
  }
  
  // Now target the white background section in formations.html
  if (fs.existsSync('formations.html')) {
    console.log('\nProcessing formations.html...');
    let content = fs.readFileSync('formations.html', 'utf8');
    
    // Look for the section with class="social-links" 
    const sectionStart = content.indexOf('<section class="social-links"');
    
    if (sectionStart !== -1) {
      console.log('Found <section class="social-links"> in formations.html');
      
      // Find the end of this section
      let sectionEnd = content.indexOf('</section>', sectionStart);
      
      if (sectionEnd !== -1) {
        sectionEnd += '</section>'.length;
        
        // Extract the section
        const section = content.substring(sectionStart, sectionEnd);
        console.log(`Found section in formations.html (${section.length} bytes)`);
        console.log(`Section preview: ${section.substring(0, 100)}...`);
        
        // Remove this section
        const newContent = content.substring(0, sectionStart) + content.substring(sectionEnd);
        fs.writeFileSync('formations.html', newContent, 'utf8');
        console.log(`Removed section from formations.html (${content.length - newContent.length} bytes removed)`);
      }
    }
  }
  
  // Check if the section exists in other HTML files like civil-society.html or contact.html
  const otherFiles = ['civil-society.html', 'contact.html', 'societe-civile.html'];
  
  otherFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`\nProcessing ${file}...`);
      let content = fs.readFileSync(file, 'utf8');
      
      if (content.includes('Restons connectés')) {
        console.log(`Found "Restons connectés" text in ${file}`);
        
        // Similar pattern as index.html
        const sectionPattern = /<section[^>]*>[\s\S]*?Restons connectés[\s\S]*?<\/section>/i;
        const match = content.match(sectionPattern);
        
        if (match) {
          const section = match[0];
          console.log(`Found section in ${file} (${section.length} bytes)`);
          
          // Remove this section
          const newContent = content.replace(section, '');
          fs.writeFileSync(file, newContent, 'utf8');
          console.log(`Removed section from ${file} (${content.length - newContent.length} bytes removed)`);
        }
      }
    }
  });
  
  console.log('\nFinished removing sections.');
} catch (error) {
  console.error('Error:', error.message);
} 