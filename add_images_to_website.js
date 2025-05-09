const fs = require('fs');
const path = require('path');

console.log("Starting image replacement script...");

// List of available images
const algeriaImages = [
    'img/algeria-643757_1280.png',
    'img/algeria-643758_1280.png'
];

const legalImages = [
    'img/right-4703922_1280.jpg',
    'img/gavel-7499911_1280.jpg',
    'img/lawyer-7123797_1280.jpg',
    'img/right-4926156_1280.jpg',
    'img/real/human-rights.jpg',
    'img/real/justice-scale.jpg'
];

const teamworkImages = [
    'img/pexels-fauxels-3184292.jpg',
    'img/pexels-pavel-danilyuk-8112172.jpg',
    'img/pexels-august-de-richelieu-4427630.jpg'
];

const businessImages = [
    'img/pexels-goumbik-669619.jpg',
    'img/pexels-goumbik-652355.jpg',
    'img/startup-593341_1280.jpg',
    'img/building-4884852_1280.jpg'
];

const legalProfessionalsImages = [
    'img/pexels-sora-shimazaki-5668772.jpg',
    'img/pexels-ekaterina-bolovtsova-6077326.jpg',
    'img/pexels-sora-shimazaki-5668473.jpg',
    'img/pexels-sora-shimazaki-5669602.jpg'
];

const educationImages = [
    'img/pexels-rdne-7414214.jpg',
    'img/pexels-mikhail-nilov-8730987.jpg', 
    'img/pexels-mikhail-nilov-8731031.jpg'
];

console.log("Loaded image lists:");
console.log(`- Algeria images: ${algeriaImages.length}`);
console.log(`- Legal images: ${legalImages.length}`);
console.log(`- Teamwork images: ${teamworkImages.length}`);
console.log(`- Business images: ${businessImages.length}`);
console.log(`- Legal professionals images: ${legalProfessionalsImages.length}`);
console.log(`- Education images: ${educationImages.length}`);

// Simple counter to track replacements
let totalReplacements = 0;

// Helper function to replace images with a placeholder pattern
function replaceImages(content, pattern, imageList) {
    let replacementCount = 0;
    const result = content.replace(pattern, (match) => {
        // Skip if already contains one of our images
        if (imageList.some(img => match.includes(img))) {
            return match;
        }
        
        // Pick a random image from the list
        const newImage = imageList[Math.floor(Math.random() * imageList.length)];
        replacementCount++;
        
        // Replace src attribute
        return match.replace(/src="[^"]*"/, `src="${newImage}"`);
    });
    
    totalReplacements += replacementCount;
    return { 
        content: result, 
        replacementCount 
    };
}

// Process a file, replacing placeholder images with appropriate real images
function processFile(filePath) {
    const fileName = path.basename(filePath);
    console.log(`\nProcessing ${fileName}...`);
    
    try {
        // Read the file
        let content = fs.readFileSync(filePath, 'utf8');
        let replacements = 0;
        
        // Patterns for different types of images that need replacement
        const patterns = [
            // Placeholder images
            /<img[^>]*src="[^"]*placeholder[^"]*"[^>]*>/g,
            // Fallback images 
            /<img[^>]*src="[^"]*fallback[^"]*"[^>]*>/g,
            // Onerror placeholder images
            /<img[^>]*onerror="this\.src='[^']*'"[^>]*>/g,
            // Empty src images
            /<img[^>]*src=""[^>]*>/g,
            // Images with no proper path
            /<img[^>]*src="(?!http)[^"\/]*"[^>]*>/g
        ];
        
        // Hero images (Algeria)
        if (fileName === 'index.html' || fileName === 'about.html' || 
            fileName === 'contact.html' || fileName === 'gallery.html') {
            // Find and replace hero background images
            const heroPattern = /<img[^>]*class="[^"]*fallback-bg[^"]*"[^>]*>/g;
            const result = replaceImages(content, heroPattern, algeriaImages);
            content = result.content;
            replacements += result.replacementCount;
            console.log(`  - Replaced ${result.replacementCount} hero images`);
        }
        
        // Choose appropriate image sets based on file content and name
        let imageList;
        
        if (fileName.includes('resources') || 
            content.includes('rights-section') || 
            content.includes('legal')) {
            imageList = legalImages;
        } 
        else if (fileName.includes('formation') || 
                fileName.includes('training') || 
                content.includes('workshop')) {
            imageList = educationImages;
        }
        else if (fileName.includes('team') || 
                fileName.includes('about') || 
                content.includes('team-section')) {
            imageList = teamworkImages;
        }
        else if (fileName.includes('civil') || 
                fileName.includes('society') || 
                content.includes('organizations')) {
            imageList = businessImages;
        }
        else {
            // Mix images for general pages
            imageList = [...algeriaImages, ...legalImages, ...teamworkImages].sort(() => Math.random() - 0.5);
        }
        
        // Apply all patterns with the selected image list
        for (const pattern of patterns) {
            const result = replaceImages(content, pattern, imageList);
            content = result.content;
            replacements += result.replacementCount;
        }
        
        // If we made replacements, save the file
        if (replacements > 0) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`  ✓ Successfully replaced ${replacements} images in ${fileName}`);
        } else {
            console.log(`  - No images to replace in ${fileName}`);
        }
        
        return replacements;
    } catch (error) {
        console.error(`  ✗ Error processing ${fileName}: ${error.message}`);
        return 0;
    }
}

// Get all HTML files
try {
    const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
    console.log(`\nFound ${htmlFiles.length} HTML files to process`);
    
    // Process each file
    let filesUpdated = 0;
    
    for (const file of htmlFiles) {
        const filePath = path.join('.', file);
        const replacements = processFile(filePath);
        if (replacements > 0) {
            filesUpdated++;
        }
    }
    
    console.log(`\nSummary:`);
    console.log(`- ${filesUpdated} out of ${htmlFiles.length} files updated`);
    console.log(`- ${totalReplacements} images replaced in total`);
    console.log(`\nImage replacement completed successfully!`);
    
} catch (error) {
    console.error(`Failed to process HTML files: ${error.message}`);
} 