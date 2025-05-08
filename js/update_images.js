// Script to update website with high-quality human rights images
document.addEventListener('DOMContentLoaded', function() {
    console.log('Updating website with high-quality human rights images');
    
    // List of high-quality human rights related images to be used on the site
    const highQualityImages = [
        {
            name: 'legal-aid.jpg',
            url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            alt: 'Aide juridique et défense des droits',
            category: 'rights'
        },
        {
            name: 'human-rights-protest.jpg',
            url: 'https://images.unsplash.com/photo-1591189824397-2a128b6bc158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            alt: 'Manifestation pour les droits humains',
            category: 'rights'
        },
        {
            name: 'equal-rights.jpg',
            url: 'https://images.unsplash.com/photo-1551024466-02c25babef68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            alt: 'Égalité des droits',
            category: 'rights'
        },
        {
            name: 'refugee-rights.jpg',
            url: 'https://images.unsplash.com/photo-1530490125459-847a6d437825?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            alt: 'Droits des réfugiés',
            category: 'rights'
        },
        {
            name: 'children-rights.jpg',
            url: 'https://images.unsplash.com/photo-1444487233259-1ee744816b8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            alt: 'Droits des enfants',
            category: 'rights'
        },
        {
            name: 'indigenous-rights.jpg',
            url: 'https://images.unsplash.com/photo-1494368308039-ed3393aacc79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            alt: 'Droits des peuples autochtones',
            category: 'rights'
        },
        {
            name: 'disability-rights.jpg',
            url: 'https://images.unsplash.com/photo-1624713701572-e29dc30e4165?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            alt: 'Droits des personnes handicapées',
            category: 'rights'
        },
        {
            name: 'workers-rights.jpg',
            url: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            alt: 'Droits des travailleurs',
            category: 'rights'
        },
        {
            name: 'freedom-speech.jpg',
            url: 'https://images.unsplash.com/photo-1593113598332-cd59a9e43e24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            alt: 'Liberté d\'expression',
            category: 'rights'
        },
        {
            name: 'environmental-rights.jpg',
            url: 'https://images.unsplash.com/photo-1534491089148-7a0f3dc3c20e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            alt: 'Droits environnementaux',
            category: 'rights'
        }
    ];

    // Function to download images
    async function downloadImages() {
        console.log('Starting download of images');
        for (const image of highQualityImages) {
            try {
                const response = await fetch(image.url);
                const blob = await response.blob();
                const objectURL = URL.createObjectURL(blob);
                
                // Create a download link
                const link = document.createElement('a');
                link.href = objectURL;
                link.download = `img/real/rights/${image.name}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                console.log(`Downloaded: ${image.name}`);
                // Wait a bit to not overload the browser
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                console.error(`Error downloading ${image.name}:`, error);
            }
        }
        console.log('Image download completed');
    }

    // Function to update image paths in all website pages
    function updateImagePaths() {
        // Replace placeholder images with high-quality rights images
        const placeholderImages = document.querySelectorAll('img[src*="placeholder"], div[style*="placeholder"]');
        
        if (placeholderImages.length > 0) {
            placeholderImages.forEach((img, index) => {
                const randomIndex = Math.floor(Math.random() * highQualityImages.length);
                const newImage = highQualityImages[randomIndex];
                
                if (img.tagName === 'IMG') {
                    img.src = `img/real/rights/${newImage.name}`;
                    if (img.alt === "" || img.alt.includes('placeholder')) {
                        img.alt = newImage.alt;
                    }
                } else {
                    // For div background images
                    const style = img.getAttribute('style');
                    if (style) {
                        const newStyle = style.replace(
                            /background-image:.*placeholder[^;]*;/,
                            `background-image: url('img/real/rights/${newImage.name}');`
                        );
                        img.setAttribute('style', newStyle);
                    }
                }
                
                console.log(`Replaced placeholder image #${index + 1} with ${newImage.name}`);
            });
        }
        
        // Add new images to gallery
        const galleryContainer = document.querySelector('.gallery-container');
        if (galleryContainer) {
            // Add new high-quality images to gallery
            highQualityImages.forEach((image, index) => {
                if (index < 6) return; // Skip first few to avoid too many images
                
                const categoryNames = {
                    'rights': 'Droits humains'
                };
                
                const categoryName = categoryNames[image.category] || image.category;
                
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item reveal-item';
                galleryItem.setAttribute('data-category', image.category);
                galleryItem.innerHTML = `
                    <img src="img/real/rights/${image.name}" alt="${image.alt}" class="gallery-img">
                    <div class="gallery-caption">
                        <div class="category-tag" style="display: inline-block; padding: 5px 10px; background: var(--primary-color); color: white; border-radius: 20px; font-size: 0.7rem; margin-bottom: 10px;">${categoryName}</div>
                        <h3>${image.alt}</h3>
                        <p>La fondation en action pour la défense des droits</p>
                    </div>
                `;
                
                galleryContainer.appendChild(galleryItem);
                console.log(`Added ${image.name} to gallery`);
            });
        }
        
        // Update civil society page images
        const civilSocietyImages = document.querySelectorAll('.civil-box, .service-card');
        if (civilSocietyImages.length > 0) {
            civilSocietyImages.forEach((box, index) => {
                const imgIndex = index % highQualityImages.length;
                const newImage = highQualityImages[imgIndex];
                
                // Add a background image to each box
                box.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('img/real/rights/${newImage.name}')`;
                box.style.backgroundSize = 'cover';
                box.style.backgroundPosition = 'center';
                box.style.backgroundBlendMode = 'overlay';
                
                console.log(`Added background to civil society box #${index + 1} with ${newImage.name}`);
            });
        }
        
        // Update hero sections
        const heroSections = document.querySelectorAll('.hero');
        if (heroSections.length > 0) {
            heroSections.forEach((hero, index) => {
                if (!hero.style.backgroundImage || hero.style.backgroundImage.includes('gradient')) {
                    const imgIndex = index % highQualityImages.length;
                    const newImage = highQualityImages[imgIndex];
                    
                    hero.style.backgroundImage = `linear-gradient(135deg, rgba(60, 180, 150, 0.85), rgba(243, 146, 7, 0.85)), url('img/real/rights/${newImage.name}')`;
                    hero.style.backgroundSize = 'cover';
                    hero.style.backgroundPosition = 'center';
                    
                    console.log(`Updated hero section #${index + 1} with ${newImage.name}`);
                }
            });
        }
    }

    // Create a UI for downloading images
    function createDownloadUI() {
        const downloadUI = document.createElement('div');
        downloadUI.style.position = 'fixed';
        downloadUI.style.bottom = '20px';
        downloadUI.style.right = '20px';
        downloadUI.style.backgroundColor = '#fff';
        downloadUI.style.padding = '15px';
        downloadUI.style.borderRadius = '8px';
        downloadUI.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
        downloadUI.style.zIndex = '9999';
        
        const title = document.createElement('h3');
        title.textContent = 'Gestion des images';
        title.style.marginBottom = '10px';
        title.style.fontSize = '16px';
        
        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = 'Télécharger des images';
        downloadBtn.style.backgroundColor = '#3cb496';
        downloadBtn.style.color = '#fff';
        downloadBtn.style.border = 'none';
        downloadBtn.style.padding = '8px 15px';
        downloadBtn.style.borderRadius = '4px';
        downloadBtn.style.cursor = 'pointer';
        downloadBtn.style.marginRight = '10px';
        
        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Mettre à jour les images';
        updateBtn.style.backgroundColor = '#f39207';
        updateBtn.style.color = '#fff';
        updateBtn.style.border = 'none';
        updateBtn.style.padding = '8px 15px';
        updateBtn.style.borderRadius = '4px';
        updateBtn.style.cursor = 'pointer';
        
        const closeBtn = document.createElement('span');
        closeBtn.textContent = '×';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '5px';
        closeBtn.style.right = '10px';
        closeBtn.style.fontSize = '20px';
        closeBtn.style.cursor = 'pointer';
        
        downloadBtn.addEventListener('click', downloadImages);
        updateBtn.addEventListener('click', updateImagePaths);
        closeBtn.addEventListener('click', () => downloadUI.style.display = 'none');
        
        downloadUI.appendChild(title);
        downloadUI.appendChild(downloadBtn);
        downloadUI.appendChild(updateBtn);
        downloadUI.appendChild(closeBtn);
        
        document.body.appendChild(downloadUI);
    }
    
    // Initialize the UI
    createDownloadUI();
    
    // Function to detect if images are missing
    function checkMissingImages() {
        const images = document.querySelectorAll('img');
        let missingCount = 0;
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                missingCount++;
                console.error(`Missing image: ${img.src}`);
                
                // Replace with a random high-quality image
                const randomIndex = Math.floor(Math.random() * highQualityImages.length);
                const newImage = highQualityImages[randomIndex];
                
                img.src = `img/real/rights/${newImage.name}`;
                img.alt = newImage.alt;
                
                console.log(`Replaced missing image with ${newImage.name}`);
            });
        });
    }
    
    // Check for missing images after a delay
    setTimeout(checkMissingImages, 2000);
}); 