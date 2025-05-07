/**
 * Exemple d'intégration du CMS Sanity avec le site web
 * Fondation Pour La Promotion Des Droits
 */

// Import du client Sanity
import { client } from './sanity-client';

/**
 * Charger les formations et les afficher sur la page
 */
function loadFormations() {
  // Requête GROQ pour obtenir toutes les formations avec leurs catégories
  const query = `*[_type == "formation"] {
    _id,
    title,
    slug,
    mainImage,
    description,
    categories[]->{title},
    instructor,
    duration,
    level
  }`;

  // Exécuter la requête
  client.fetch(query)
    .then(formations => {
      // Référence à l'élément DOM où afficher les formations
      const formationsContainer = document.querySelector('#formations-container');
      
      // Vider le conteneur
      formationsContainer.innerHTML = '';
      
      // Parcourir les formations et créer les éléments HTML
      formations.forEach(formation => {
        // Construire l'URL de l'image avec la fonction urlFor de Sanity
        const imageUrl = formation.mainImage ? 
          `https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${formation.mainImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg')}` 
          : 'img/default-formation.jpg';
        
        // Créer un élément HTML pour chaque formation
        const formationElement = document.createElement('div');
        formationElement.className = 'formation-card';
        formationElement.innerHTML = `
          <div class="formation-image" style="background-image: url('${imageUrl}')"></div>
          <div class="formation-content">
            <h3>${formation.title}</h3>
            <p>${formation.description || ''}</p>
            <div class="formation-meta">
              ${formation.instructor ? `<span><i class="fas fa-user"></i> ${formation.instructor}</span>` : ''}
              ${formation.duration ? `<span><i class="fas fa-clock"></i> ${formation.duration}</span>` : ''}
              ${formation.level ? `<span><i class="fas fa-signal"></i> ${formation.level}</span>` : ''}
            </div>
            <a href="formation-details.html?slug=${formation.slug.current}" class="btn-primary">En savoir plus</a>
          </div>
        `;
        
        // Ajouter l'élément au conteneur
        formationsContainer.appendChild(formationElement);
      });
    })
    .catch(error => {
      console.error('Erreur lors du chargement des formations:', error);
      document.querySelector('#formations-container').innerHTML = '<p>Impossible de charger les formations. Veuillez réessayer plus tard.</p>';
    });
}

/**
 * Charger un témoignage aléatoire sur la page d'accueil
 */
function loadRandomTestimonial() {
  // Requête pour obtenir tous les témoignages mis en avant
  const query = `*[_type == "testimonial" && featured == true] {
    name,
    role,
    quote,
    organization,
    image
  }`;
  
  client.fetch(query)
    .then(testimonials => {
      // S'il y a des témoignages disponibles
      if (testimonials.length > 0) {
        // Sélectionner un témoignage aléatoire
        const randomIndex = Math.floor(Math.random() * testimonials.length);
        const testimonial = testimonials[randomIndex];
        
        // Référence à l'élément DOM du témoignage
        const testimonialContainer = document.querySelector('.testimonial');
        
        // Afficher le témoignage
        testimonialContainer.innerHTML = `
          <p>"${testimonial.quote}"</p>
          <div class="testimonial-author">
            <span class="name">${testimonial.name}</span>
            <span class="role">${testimonial.role}${testimonial.organization ? `, ${testimonial.organization}` : ''}</span>
          </div>
        `;
      }
    })
    .catch(error => {
      console.error('Erreur lors du chargement du témoignage:', error);
    });
}

/**
 * Charger les détails d'une formation spécifique
 */
function loadFormationDetails() {
  // Récupérer le slug de l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  
  if (slug) {
    // Requête pour obtenir les détails de la formation
    const query = `*[_type == "formation" && slug.current == $slug][0] {
      _id,
      title,
      mainImage,
      description,
      body,
      categories[]->{title},
      instructor,
      duration,
      level,
      publishedAt
    }`;
    
    client.fetch(query, { slug })
      .then(formation => {
        if (formation) {
          // Mettre à jour le titre de la page
          document.title = `${formation.title} | Fondation pour la promotion des droits`;
          
          // Mettre à jour le contenu de la page
          document.querySelector('.page-header h1').textContent = formation.title;
          
          // Construire le contenu principal
          const contentContainer = document.querySelector('.formation-details');
          
          // Convertir le contenu rich text en HTML
          // Note: Dans un vrai projet, utilisez @sanity/block-content-to-html ou @portabletext/react
          // Ceci est une version simplifiée pour l'exemple
          const bodyContent = formation.body ? 
            JSON.stringify(formation.body) : 
            '<p>' + formation.description + '</p>';
          
          contentContainer.innerHTML = `
            <div class="formation-meta">
              ${formation.instructor ? `<div><strong>Formateur:</strong> ${formation.instructor}</div>` : ''}
              ${formation.duration ? `<div><strong>Durée:</strong> ${formation.duration}</div>` : ''}
              ${formation.level ? `<div><strong>Niveau:</strong> ${formation.level}</div>` : ''}
              ${formation.categories?.length ? `<div><strong>Catégories:</strong> ${formation.categories.map(c => c.title).join(', ')}</div>` : ''}
            </div>
            <div class="formation-content">
              ${bodyContent}
            </div>
          `;
        } else {
          // Formation non trouvée
          document.querySelector('.formation-details').innerHTML = '<p>Formation non trouvée.</p>';
        }
      })
      .catch(error => {
        console.error('Erreur lors du chargement des détails de la formation:', error);
        document.querySelector('.formation-details').innerHTML = '<p>Impossible de charger les détails de la formation. Veuillez réessayer plus tard.</p>';
      });
  } else {
    // Pas de slug spécifié
    document.querySelector('.formation-details').innerHTML = '<p>Aucune formation spécifiée.</p>';
  }
}

/**
 * Charger les galeries d'images
 */
function loadGalleries() {
  const query = `*[_type == "gallery"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    images[0..0] {
      asset->{url}
    }
  }`;
  
  client.fetch(query)
    .then(galleries => {
      const galleriesContainer = document.querySelector('#galleries-container');
      galleriesContainer.innerHTML = '';
      
      galleries.forEach(gallery => {
        const thumbnailUrl = gallery.images && gallery.images[0] ? 
          gallery.images[0].asset.url : 
          'img/default-gallery.jpg';
        
        const galleryElement = document.createElement('div');
        galleryElement.className = 'gallery-preview-item';
        galleryElement.innerHTML = `
          <a href="gallery-details.html?slug=${gallery.slug.current}">
            <img src="${thumbnailUrl}" alt="${gallery.title}">
            <div class="overlay">
              <h3>${gallery.title}</h3>
            </div>
          </a>
        `;
        
        galleriesContainer.appendChild(galleryElement);
      });
    })
    .catch(error => {
      console.error('Erreur lors du chargement des galeries:', error);
      document.querySelector('#galleries-container').innerHTML = '<p>Impossible de charger les galeries. Veuillez réessayer plus tard.</p>';
    });
}

// Exécuter les fonctions en fonction de la page actuelle
document.addEventListener('DOMContentLoaded', function() {
  // Détecter la page actuelle
  const currentPath = window.location.pathname;
  
  if (currentPath.includes('formations.html')) {
    loadFormations();
  } else if (currentPath.includes('formation-details.html')) {
    loadFormationDetails();
  } else if (currentPath.includes('gallery.html')) {
    loadGalleries();
  } else if (currentPath === '/' || currentPath.includes('index.html')) {
    // Page d'accueil - charger le témoignage aléatoire
    loadRandomTestimonial();
  }
}); 