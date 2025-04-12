import React, { useState, useEffect } from 'react';
import './AdminPanel.css'; // Eigene CSS-Datei für das Admin Panel

function AdminPanel({ onLogout, isLoggedIn, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [heroImages, setHeroImages] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchHeroImages();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/backend/api/admin.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    });
    const data = await response.json();
    if (data.success) {
      onLoginSuccess();
      setLoginError('');
    } else {
      setLoginError(data.error || 'Login fehlgeschlagen.');
    }
  };

  const handleLogout = async () => {
    const response = await fetch('/backend/api/admin.php?action=logout');
    const data = await response.json();
    if (data.success) {
      onLogout();
    } else {
      console.error('Logout fehlgeschlagen:', data.error);
    }
  };

  const fetchHeroImages = async () => {
    const response = await fetch('/backend/api/admin.php?action=get_hero_images');
    const data = await response.json();
    if (data.images) {
      setHeroImages(data.images);
    } else {
      console.error('Fehler beim Laden der Hero-Bilder:', data.error);
    }
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!newImage) {
      setUploadError('Bitte wähle eine Bilddatei aus.');
      return;
    }

    const formData = new FormData();
    formData.append('image', newImage);

    const response = await fetch('/backend/api/upload.php', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setUploadSuccess('Bild erfolgreich hochgeladen: ' + data.filename);
      setUploadError('');
      fetchHeroImages(); // Bilderliste neu laden
      setNewImage(null); // Eingabefeld zurücksetzen
    } else {
      setUploadError(data.error || 'Fehler beim Hochladen des Bildes.');
      setUploadSuccess('');
    }
  };

  // TODO: Implementiere Drag & Drop Sortierung der Bilder

  if (!isLoggedIn) {
    return (
      <div className="admin-login-container">
        <h2>Admin Login</h2>
        {loginError && <p className="error-message">{loginError}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Benutzername:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Passwort:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Einloggen</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-panel-container">
      <h2>Admin Bereich</h2>
      <button onClick={handleLogout}>Ausloggen</button>

      <h3>Hero Carousel Verwaltung</h3>
      <div className="image-list">
        {heroImages.map((image, index) => (
          <div key={index} className="image-item">
            <img src={`/images/herocarousel/${image}`} alt={image} style={{ maxWidth: '100px', maxHeight: '100px' }} />
            <span>{image}</span>
            {/* TODO: Buttons zum Löschen und Verschieben */}
          </div>
        ))}
      </div>

      <h4>Bild hochladen</h4>
      {uploadError && <p className="error-message">{uploadError}</p>}
      {uploadSuccess && <p className="success-message">{uploadSuccess}</p>}
      <div className="upload-form">
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleImageUpload} disabled={!newImage}>Hochladen</button>
      </div>

      {/* TODO: Weitere Verwaltungsfunktionen für Artikel */}
      <h3>Artikel Verwaltung (TODO)</h3>
      <p>Hier können Artikel erstellt, bearbeitet und gelöscht werden.</p>
    </div>
  );
}

export default AdminPanel;