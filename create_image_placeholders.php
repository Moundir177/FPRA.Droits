<?php
// Create placeholder image function
function createPlaceholderImage($width, $height, $text, $outputPath) {
    // Create a blank image with the specified dimensions
    $image = imagecreatetruecolor($width, $height);
    
    // Define colors
    $bgColor = imagecolorallocate($image, 44, 62, 80); // Primary color
    $textColor = imagecolorallocate($image, 255, 255, 255); // White
    $accentColor = imagecolorallocate($image, 211, 84, 0); // Secondary color
    
    // Fill the background
    imagefill($image, 0, 0, $bgColor);
    
    // Add a decorative element
    imagefilledrectangle($image, 0, $height - 30, $width, $height, $accentColor);
    
    // Set up text settings
    $fontSize = 5;
    $fontWidth = imagefontwidth($fontSize);
    $fontHeight = imagefontheight($fontSize);
    $textWidth = $fontWidth * strlen($text);
    $textX = ($width - $textWidth) / 2;
    $textY = ($height - $fontHeight) / 2;
    
    // Add the text to the image
    imagestring($image, $fontSize, $textX, $textY, $text, $textColor);
    
    // Add a "Law-themed" mention
    $lawText = "LAW-THEMED IMAGE";
    $lawTextWidth = $fontWidth * strlen($lawText);
    $lawTextX = ($width - $lawTextWidth) / 2;
    imagestring($image, $fontSize, $lawTextX, $textY + $fontHeight + 10, $lawText, $textColor);
    
    // Save the image to the specified output path
    imagejpeg($image, $outputPath);
    
    // Free up memory
    imagedestroy($image);
    
    echo "Created: $outputPath ($width x $height)\n";
}

// Make sure the img directory exists
if (!is_dir('img')) {
    mkdir('img', 0755, true);
}

if (!is_dir('img/placeholder_images')) {
    mkdir('img/placeholder_images', 0755, true);
}

// Create main images
$mainImages = [
    'hero-bg.jpg' => ['width' => 1920, 'height' => 1080, 'text' => 'HERO BACKGROUND - Justice Theme'],
    'news-placeholder.jpg' => ['width' => 800, 'height' => 600, 'text' => 'NEWS - Legal Document'],
    'mission.jpg' => ['width' => 800, 'height' => 800, 'text' => 'MISSION - Human Rights'],
    'about-mission.jpg' => ['width' => 800, 'height' => 800, 'text' => 'ABOUT - Legal Team'],
    'revue-cover.jpg' => ['width' => 800, 'height' => 600, 'text' => 'REVUE - Law Journal'],
    'formations-intro.jpg' => ['width' => 800, 'height' => 600, 'text' => 'FORMATIONS - Legal Training'],
    'resources-intro.jpg' => ['width' => 800, 'height' => 600, 'text' => 'RESOURCES - Law Library'],
    'testimonials-bg.jpg' => ['width' => 1920, 'height' => 1080, 'text' => 'TESTIMONIALS - Justice'],
    'civil-society.jpg' => ['width' => 800, 'height' => 600, 'text' => 'CIVIL SOCIETY - Legal Forum']
];

// Create team member images
$teamImages = [
    'team-1.jpg' => ['width' => 400, 'height' => 600, 'text' => 'LAWYER - Team Member 1'],
    'team-2.jpg' => ['width' => 400, 'height' => 600, 'text' => 'ADVOCATE - Team Member 2'],
    'team-3.jpg' => ['width' => 400, 'height' => 600, 'text' => 'JURIST - Team Member 3'],
    'team-4.jpg' => ['width' => 400, 'height' => 600, 'text' => 'LEGAL EXPERT - Team Member 4']
];

// Create gallery images
$galleryImages = [
    'gallery1.jpg' => ['width' => 800, 'height' => 600, 'text' => 'GALLERY - Legal Seminar'],
    'gallery2.jpg' => ['width' => 800, 'height' => 600, 'text' => 'GALLERY - Rights Workshop'],
    'gallery3.jpg' => ['width' => 800, 'height' => 600, 'text' => 'GALLERY - Law Conference'],
    'gallery4.jpg' => ['width' => 800, 'height' => 600, 'text' => 'GALLERY - Human Rights'],
    'gallery5.jpg' => ['width' => 800, 'height' => 600, 'text' => 'GALLERY - Legal Education'],
    'gallery6.jpg' => ['width' => 800, 'height' => 600, 'text' => 'GALLERY - Justice'],
    'gallery7.jpg' => ['width' => 800, 'height' => 600, 'text' => 'GALLERY - Rights Protest'],
    'gallery8.jpg' => ['width' => 800, 'height' => 600, 'text' => 'GALLERY - Legal Speaker'],
    'gallery9.jpg' => ['width' => 800, 'height' => 600, 'text' => 'GALLERY - Legal Discussion']
];

// Generate all main images
foreach ($mainImages as $filename => $imageConfig) {
    createPlaceholderImage(
        $imageConfig['width'],
        $imageConfig['height'],
        $imageConfig['text'],
        "img/$filename"
    );
}

// Generate all team images
foreach ($teamImages as $filename => $imageConfig) {
    createPlaceholderImage(
        $imageConfig['width'],
        $imageConfig['height'],
        $imageConfig['text'],
        "img/$filename"
    );
}

// Generate all gallery images
foreach ($galleryImages as $filename => $imageConfig) {
    createPlaceholderImage(
        $imageConfig['width'],
        $imageConfig['height'],
        $imageConfig['text'],
        "img/placeholder_images/$filename"
    );
}

echo "All placeholder images have been created successfully!\n";
?> 