<?php

class Database {
    private $db;
    private $dbFile = 'database.db';

    public function __construct() {
        try {
            $this->db = new SQLite3(dirname(__FILE__) . '/' . $this->dbFile);
        } catch (Exception $e) {
            die("Fehler beim Öffnen der Datenbank: " . $e->getMessage());
        }
    }

    public function getConnection() {
        return $this->db;
    }

    public function query($sql) {
        return $this->db->query($sql);
    }

    public function fetchArray($result) {
        return $result->fetchArray(SQLITE3_ASSOC);
    }

    public function lastInsertId() {
        return $this->db->lastInsertRowID();
    }

    public function escapeString($string) {
        return $this->db->escapeString($string);
    }

    public function close() {
        if ($this->db) {
            $this->db->close();
        }
    }
}

?>