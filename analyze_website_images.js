const fs = require('fs');
const path = require('path');

console.log("Analyzing website images...");

// Get all HTML files
const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
console.log(`Found ${htmlFiles.length} HTML files to analyze.`);

// Map to collect images and their usage
const imagesUsed = new Map();
const pageImageMap = new Map();

// Extract images from HTML files
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const imgRegex = /<img[^>]*src="([^"]*)"[^>]*>/g;
    
    let match;
    const imagesInFile = [];
    
    // Find all image sources in the file
    while ((match = imgRegex.exec(content)) !== null) {
        const imgSrc = match[1];
        if (imgSrc && !imgSrc.startsWith('data:')) {
            // Count this image
            if (imagesUsed.has(imgSrc)) {
                imagesUsed.set(imgSrc, imagesUsed.get(imgSrc) + 1);
            } else {
                imagesUsed.set(imgSrc, 1);
            }
            
            // Add to this file's images
            imagesInFile.push(imgSrc);
        }
    }
    
    // Store images for this page
    pageImageMap.set(file, imagesInFile);
    console.log(`${file}: Found ${imagesInFile.length} images`);
});

// Sort images by usage count
const sortedImages = [...imagesUsed.entries()]
    .sort((a, b) => b[1] - a[1]);

console.log("\nTop Images Used Across Website:");
sortedImages.slice(0, 15).forEach(([imgSrc, count]) => {
    console.log(`${imgSrc}: Used ${count} times`);
});

// Display images for each page
console.log("\nImages Used Per Page:");
htmlFiles.forEach(file => {
    const images = pageImageMap.get(file);
    if (images && images.length > 0) {
        console.log(`\n${file} (${images.length} images):`);
        images.forEach(imgSrc => {
            console.log(`  - ${imgSrc}`);
        });
    }
});

// Check which images in img folder are not used
console.log("\nChecking for unused images in img folder...");
try {
    // Get all image files
    const getImageFiles = (dir) => {
        const files = [];
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
            const fullPath = path.join(dir, item);
            const stats = fs.statSync(fullPath);
            
            if (stats.isDirectory()) {
                // Recursively get images from subdirectories
                files.push(...getImageFiles(fullPath));
            } else if (/\.(jpe?g|png|gif|svg|webp)$/i.test(item)) {
                // Just use the relative path from the working directory
                files.push(fullPath.replace(/\\/g, '/'));
            }
        });
        
        return files;
    };
    
    const imageFiles = getImageFiles('./img');
    console.log(`Found ${imageFiles.length} image files in img directory`);
    
    // Check which ones are not used
    const unusedImages = imageFiles.filter(imgPath => {
        // Convert to relative URL format used in HTML
        const relativePath = imgPath.startsWith('./') ? imgPath.slice(2) : imgPath;
        return !imagesUsed.has(relativePath);
    });
    
    console.log(`\n${unusedImages.length} unused images:`);
    unusedImages.forEach(img => {
        console.log(`  - ${img}`);
    });
    
} catch (error) {
    console.error(`Error checking unused images: ${error.message}`);
}

console.log("\nImage analysis complete!"); 