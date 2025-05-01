# Generate placeholder image URLs for website

$placeholders = @(
    @{name="revue-cover.jpg"; width=800; height=600; text="Revue Cover"; bg="4A7DB3"; fg="FFFFFF"},
    @{name="formations-intro.jpg"; width=800; height=600; text="Formations"; bg="3D8B5F"; fg="FFFFFF"},
    @{name="resources-intro.jpg"; width=800; height=600; text="Resources"; bg="B35F4A"; fg="FFFFFF"},
    @{name="testimonials-bg.jpg"; width=1200; height=800; text="Testimonials"; bg="8B5F3D"; fg="FFFFFF"},
    @{name="civil-society.jpg"; width=800; height=600; text="Civil Society"; bg="5F3D8B"; fg="FFFFFF"}
)

Write-Host "Here are placeholder image URLs you can use:"
Write-Host "------------------------------------------"

foreach ($img in $placeholders) {
    $url = "https://via.placeholder.com/$($img.width)x$($img.height)/$($img.bg)/$($img.fg)?text=$($img.text -replace ' ', '+')"
    Write-Host "$($img.name): $url"
}

Write-Host "`nTo use these placeholder images:"
Write-Host "1. Visit each URL in your browser"
Write-Host "2. Right-click and save the image"
Write-Host "3. Save it to your img folder with the filename listed above" 