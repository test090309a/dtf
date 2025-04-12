// ... vorheriger Importe
import './AdminPanel.css';

function AdminPanel({ onLogout, isLoggedIn, onLoginSuccess }) {
  // ... vorheriger Zustände und Funktionen

  const [newGalleryImage, setNewGalleryImage] = useState(null);
  const [galleryUploadError, setGalleryUploadError] = useState('');
  const [galleryUploadSuccess, setGalleryUploadSuccess] = useState('');

  const handleGalleryImageChange = (e) => {
    setNewGalleryImage(e.target.files[0]);
  };

  const handleGalleryImageUpload = async () => {
    if (!newGalleryImage) {
      setGalleryUploadError('Bitte wähle eine Bilddatei für die Galerie aus.');
      return;
    }

    const formData = new FormData();
    formData.append('image', newGalleryImage);

    const response = await fetch('/backend/api/upload_gallery.php', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setGalleryUploadSuccess('Bild erfolgreich in die Galerie hochgeladen: ' + data.filename);
      setGalleryUploadError('');
      setNewGalleryImage(null); // Eingabefeld zurücksetzen
    } else {
      setGalleryUploadError(data.error || 'Fehler beim Hochladen des Bildes in die Galerie.');
      setGalleryUploadSuccess('');
    }
  };

  // ... vorheriger JSX-Return
  return (
    <div className="admin-panel-container">
      {/* ... vorheriger Admin-Panel Inhalt */}

      <h3>Galerie Verwaltung</h3>
      <h4>Bild hochladen</h4>
      {galleryUploadError && <p className="error-message">{galleryUploadError}</p>}
      {galleryUploadSuccess && <p className="success-message">{galleryUploadSuccess}</p>}
      <div className="upload-form">
        <input type="file" onChange={handleGalleryImageChange} />
        <button onClick={handleGalleryImageUpload} disabled={!newGalleryImage}>In Galerie hochladen</button>
      </div>

      {/* TODO: Anzeige der vorhandenen Galeriebilder im Admin-Bereich */}

      {/* ... weiterer Admin-Panel Inhalt */}
    </div>
  );
}

export default AdminPanel;