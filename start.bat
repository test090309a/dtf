@echo off
echo Starte DTV my-app Frontend
echo --------------------------

:: Startet npm in einem neuen Fenster
start cmd /k "npm start"

:: Wartet 5 Sekunden, damit npm starten kann (optional, falls nötig)
timeout /t 5 /nobreak >nul

:: Startet den PHP-Webserver
start cmd /k "d:\xampp\php\php.exe -S localhost:8000"

echo Beide Prozesse wurden gestartet.
