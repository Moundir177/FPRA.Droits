# Script pour télécharger des images libres de droits pour le site web de la Fondation
# Les images sont libres de droits et proviennent de Pexels, Unsplash et Pixabay

# Créer le dossier s'il n'existe pas
if (-not (Test-Path -Path "img/real" -PathType Container)) {
    New-Item -Path "img/real" -ItemType Directory -Force
}

# Liste des URLs d'images et leurs noms de fichiers de destination
$images = @(
    @{
        Url = "https://images.pexels.com/photos/5668481/pexels-photo-5668481.jpeg?auto=compress&cs=tinysrgb&w=800"
        File = "img/real/justice-scale.jpg"
        Description = "Balance de la justice - Symbolise l'équité et le droit"
    },
    @{
        Url = "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800"
        File = "img/real/human-rights.jpg"
        Description = "Manifestation pour les droits humains"
    },
    @{
        Url = "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800"
        File = "img/real/diversity-team.jpg"
        Description = "Équipe diverse collaborant - Symbolise la coopération et l'inclusion"
    },
    @{
        Url = "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=800"
        File = "img/real/education-rights.jpg"
        Description = "Éducation - Droit fondamental pour tous"
    },
    @{
        Url = "https://images.pexels.com/photos/3194519/pexels-photo-3194519.jpeg?auto=compress&cs=tinysrgb&w=800"
        File = "img/real/youth-engagement.jpg"
        Description = "Jeunes engagés - Représentant l'avenir de l'activisme"
    },
    @{
        Url = "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
        File = "img/real/collaboration.jpg"
        Description = "Collaboration - Travail d'équipe pour la défense des droits"
    },
    @{
        Url = "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800"
        File = "img/real/advocacy.jpg"
        Description = "Plaidoyer - Discussion autour des enjeux des droits"
    },
    @{
        Url = "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800"
        File = "img/real/women-rights.jpg"
        Description = "Droits des femmes - Égalité et émancipation"
    }
)

# Télécharger chaque image
foreach ($image in $images) {
    Write-Host "Téléchargement de $($image.File)..."
    try {
        Invoke-WebRequest -Uri $image.Url -OutFile $image.File
        Write-Host "Image téléchargée avec succès: $($image.File) - $($image.Description)" -ForegroundColor Green
    } catch {
        Write-Host "Erreur lors du téléchargement de $($image.File): $_" -ForegroundColor Red
    }
}

Write-Host "Téléchargement terminé! Les images sont disponibles dans le dossier img/real/" 