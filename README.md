# Fondation pour la promotion des droits - Site Web

Ce projet est un site web bilingue (français et arabe) pour la "Fondation pour la promotion des droits", une association algérienne dédiée à la promotion et à la défense des droits.

## Fonctionnalités

- Design moderne et responsive adapté à tous les appareils
- Interface bilingue (français et arabe) avec support RTL pour l'arabe
- Pages principales :
  - Accueil
  - À propos (mission, objectifs, équipe)
  - Actualités et projets
  - Revue des droits humains
  - Formations
  - Ressources et documentation
  - Témoignages
  - Espace société civile
  - Contact

## Structure des fichiers

```
/
├── index.html                  # Page d'accueil (français)
├── about.html                  # Page À propos (français)
├── contact.html                # Page Contact (français)
├── ar/                         # Versions arabes des pages
│   └── index.html              # Page d'accueil (arabe)
├── css/
│   └── style.css               # Feuille de style principale
├── js/
│   └── script.js               # JavaScript principal
└── img/                        # Dossier des images (à compléter)
```

## Technologies utilisées

- HTML5
- CSS3 (avec variables CSS pour la gestion des couleurs)
- JavaScript (vanilla)
- Font Awesome pour les icônes
- Google Fonts pour la typographie

## Comment utiliser

1. Clonez ce dépôt
2. Ouvrez le fichier `index.html` dans votre navigateur pour voir la version française
3. Cliquez sur le bouton "عربي" pour basculer vers la version arabe

## Personnalisation

### Couleurs

Les couleurs principales du site sont définies comme variables CSS dans le fichier `css/style.css` :

```css
:root {
    --primary-color: #2c3e50;     /* Bleu foncé */
    --secondary-color: #d35400;   /* Orange */
    --accent-color: #3498db;      /* Bleu clair */
    --text-color: #333;           /* Texte principal */
    --light-color: #f8f9fa;       /* Fond clair */
    --dark-color: #343a40;        /* Fond foncé */
}
```

Pour changer le schéma de couleurs, modifiez simplement ces valeurs.

### Images

Remplacez les images d'espace réservé dans le dossier `img/` par les images réelles de votre organisation.

### Contenu

Le contenu de chaque page peut être facilement modifié en éditant les fichiers HTML correspondants. 

## Développement futur

- Ajout de pages supplémentaires (revue, formations, etc.)
- Système de gestion de contenu pour les actualités et les ressources
- Fonctionnalité de recherche
- Intégration de médias sociaux améliorée

## Licence

Ce projet est destiné à l'usage exclusif de la Fondation pour la promotion des droits.

## Contact

Pour toute question concernant ce site web, veuillez contacter [votre contact]. 