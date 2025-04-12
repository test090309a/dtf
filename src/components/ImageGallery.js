import React, { useState, useEffect } from 'react';
import './ImageGallery.css'; // Eigene CSS-Datei für die Galerie

function ImageGallery() {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    fetch('/backend/api/gallery.php')
      .then(response => response.json())
      .then(data => setGalleryImages(data.images))
      .catch(error => console.error("Fehler beim Laden der Galeriebilder:", error));
  }, []);

  if (!galleryImages || galleryImages.length === 0) {
    return <div className="image-gallery">Keine Bilder in der Galerie.</div>;
  }

  return (
    <div className="image-gallery">
      <h2>Bildgalerie</h2>
      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <img
            key={index}
            src={`/images/gallery/${image}`}
            alt={`Galeriebild ${index + 1}`}
            className="gallery-image"
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;