<?php
session_start();
header('Content-Type: application/json');
require_once '../database/Database.php';

$db = new Database();
$conn = $db->getConnection();

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'login':
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';

        if ($username === 'admin' && $password === 'sysop') {
            $_SESSION['admin'] = true;
            echo json_encode(['success' => true, 'message' => 'Login erfolgreich.']);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Ungültige Anmeldedaten.']);
        }
        break;

    case 'get_hero_images':
        $files = scandir('../../images/herocarousel/');
        $images = array_filter($files, function ($file) {
            return in_array(strtolower(pathinfo($file, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'gif']);
        });
        echo json_encode(['images' => array_values($images)]);
        break;

    // Später: case 'save_hero_order': ...

    case 'logout':
        session_destroy();
        echo json_encode(['success' => true, 'message' => 'Logout erfolgreich.']);
        break;

    default:
        http_response_code(400);
        echo json_encode(['error' => 'Ungültige Admin-Aktion.']);
        break;
}

$db->close();
?>