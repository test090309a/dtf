import React, { useState, useEffect } from 'react';
import './HeroCarousel.css'; // Eigene CSS-Datei für das Carousel

function HeroCarousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/backend/api/admin.php?action=get_hero_images')
      .then(response => response.json())
      .then(data => setImages(data.images))
      .catch(error => console.error("Fehler beim Laden der Hero-Bilder:", error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Bildwechsel alle 5 Sekunden
    return () => clearInterval(interval); // Cleanup bei Unmount
  }, [images.length]);

  if (!images || images.length === 0) {
    return <div className="hero-carousel">Keine Bilder im Carousel.</div>;
  }

  const currentImage = images[currentIndex];
  const imageUrl = `/images/herocarousel/${currentImage}`;

  return (
    <div className="hero-carousel">
      <img src={imageUrl} alt={`Hero Bild ${currentIndex + 1}`} className="hero-image" />
    </div>
  );
}

export default HeroCarousel;