# Fondation Pour La Promotion Des Droits - CMS

Ce projet est un système de gestion de contenu (CMS) basé sur Sanity.io pour le site web de la Fondation Pour La Promotion Des Droits.

## Structure du contenu

Le CMS est configuré avec les types de contenu suivants adaptés aux besoins du site:

1. **Formations** - Pour gérer les formations et ateliers proposés
2. **Ressources** - Documents, guides et autres ressources téléchargeables
3. **Témoignages** - Récits et citations des bénéficiaires et partenaires
4. **Société Civile** - Organisations partenaires et réseaux
5. **Galerie** - Photos et médias des événements et activités

## Accès au CMS

### Localement
Pour exécuter le CMS en local (développement):

```bash
# Installation des dépendances (première fois uniquement)
npm install

# Démarrer le serveur de développement
npm run dev
```

Le studio sera accessible à l'adresse: http://localhost:3333

### En ligne
Le studio Sanity est accessible en ligne à l'adresse: 
[Lien vers le Sanity Studio en ligne]

## Intégration avec le site web

Pour intégrer ce CMS à votre site web:

1. Ajoutez la bibliothèque client Sanity à votre projet:
   ```bash
   npm install @sanity/client
   ```

2. Copiez le fichier `sanity-client.js` dans votre projet web

3. Importez-le dans vos composants:
   ```javascript
   import { client } from './sanity-client';
   
   // Exemple: récupérer toutes les formations
   client.fetch('*[_type == "formation"]').then(formations => {
     console.log('Formations:', formations);
     // Utilisez ces données pour alimenter votre site
   });
   ```

## Requêtes GROQ courantes

Voici quelques exemples de requêtes GROQ pour récupérer différents types de contenu:

```javascript
// Toutes les formations avec leurs catégories
const formations = '*[_type == "formation"]{..., categories[]->{title}}';

// Témoignages mis en avant pour la page d'accueil
const featuredTestimonials = '*[_type == "testimonial" && featured == true]';

// Ressources triées par date de publication
const resources = '*[_type == "resource"] | order(publishedAt desc)';

// Détails d'une formation spécifique par slug
const formationBySlug = '*[_type == "formation" && slug.current == $slug][0]';
client.fetch(formationBySlug, { slug: 'nom-de-la-formation' });
```

## Gestion des utilisateurs

Pour ajouter de nouveaux utilisateurs ou modifier les permissions:

1. Connectez-vous à [manage.sanity.io](https://manage.sanity.io)
2. Sélectionnez le projet "FPRA"
3. Allez dans "Users & Teams"
4. Invitez de nouveaux collaborateurs et définissez leurs rôles

## Contact et support

Pour toute question ou assistance concernant le CMS, veuillez contacter:
[Votre email ou contact] 