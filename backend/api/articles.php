<?php
header('Content-Type: application/json');
// CORS-Header hinzufügen
header("Access-Control-Allow-Origin: *"); // Erlaubt alle Ursprünge
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

try {
    // Verbindung zur SQLite-Datenbank herstellen
    $dbPath = '../database/database.db'; // Pfad zur SQLite-Datenbank
    $pdo = new PDO("sqlite:$dbPath");

    // SQL-Abfrage ausführen
    $query = "SELECT id, title, content FROM articles";
    $stmt = $pdo->query($query);

    // Ergebnisse sammeln
    $articles = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $articles[] = $row;
    }

    // Ergebnisse als JSON zurückgeben
    echo json_encode($articles);

} catch (PDOException $e) {
    http_response_code(500);

    // Fehlerdetails zurückgeben
    echo json_encode([
        'error' => true,
        'message' => 'Ein Fehler ist aufgetreten',
        'details' => $e->getMessage()
    ]);
}
?>
