<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Für lokale Entwicklung

$galleryDir = '../../images/gallery/';
$files = scandir($galleryDir);
$images = array_filter($files, function ($file) {
    return in_array(strtolower(pathinfo($file, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'gif']);
});

echo json_encode(['images' => array_values($images)]);
?>