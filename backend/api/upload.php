<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Für lokale Entwicklung
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['image'])) {
    $uploadDir = '../../images/herocarousel/';
    $uploadedFile = $_FILES['image']['tmp_name'];
    $filename = basename($_FILES['image']['name']);
    $targetPath = $uploadDir . $filename;

    if (move_uploaded_file($uploadedFile, $targetPath)) {
        echo json_encode(['success' => true, 'filename' => $filename]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Fehler beim Hochladen der Datei.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Ungültige Anfrage.']);
}
?>