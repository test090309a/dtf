import React, { useState, useEffect } from 'react';
import ImageGallery from './components/ImageGallery';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import HeroCarousel from './components/HeroCarousel';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import './style.css'; // Globale Stile
import './responsive.css'; // Responsive Stile
import './style.css';
import './responsive.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // Zustand für Fehlermeldungen
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/backend/api/articles.php?action=list')
      .then(response => {
        console.log("Rohe Antwort:", response); // Logge die rohe Antwort
        if (!response.ok) {
          throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }
        return response.text(); // Hole die Antwort als Text
      })
      .then(text => {
        console.log("Antwort als Text:", text); // Logge die Antwort als Text
        try {
          const data = JSON.parse(text); // Versuche, das JSON zu parsen
          console.log("Geparste Daten:", data);
          if (data.error) {
            throw new Error(data.message || "Ein Fehler ist aufgetreten.");
          }
          setArticles(data);
        } catch (error) {
          console.error("Fehler beim Parsen von JSON:", error);
          setErrorMessage("Fehler beim Laden der Daten: Ungültiges JSON.");
        }
      })
      .catch(error => {
        console.error("Fehler beim Laden der Artikel:", error);
        setErrorMessage(error.message); // Speichere die Fehlermeldung im Zustand
      });
  }, []);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleBackClick = () => {
    setSelectedArticle(null);
  };

  const handleAdminClick = () => {
    setShowAdmin(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setShowAdmin(false);
  };

  if (showAdmin) {
    return <AdminPanel onLogout={handleAdminLogout} isLoggedIn={isAdminLoggedIn} onLoginSuccess={() => setIsAdminLoggedIn(true)} />;
  }

  if (selectedArticle) {
    return (
      <div>
        <button onClick={handleBackClick}>Zurück zur Übersicht</button>
        <h2>{selectedArticle.title}</h2>
        <p>{selectedArticle.content}</p>
      </div>
    );
  }

  return ( /*********AUSGABE***************/



<div className="article-list">
      {errorMessage ? (
        <div className="error-message" style={{ color: 'red' }}>
          <h2>Fehler</h2>
          <p>{errorMessage}</p>
          <p style={{ color: 'grey', fontSize: '0.75em' }}>Lauft der PHP Server?</p>
        </div>
      ) : (
        articles.map(article => (
          <div key={article.id} className="article-card" onClick={() => handleArticleClick(article)}>
            <h3>{article.title}</h3>
            <p>{article.content.substring(0, 100)}...</p>
            <button>Mehr lesen</button>
          </div>
        ))
      )}
    </div>
  );


  return (
    <div>
      <Navigation onAdminClick={handleAdminClick} />
      <HeroCarousel />
      <div className="content-wrapper">
        {selectedArticle ? (
          <ArticleDetail article={selectedArticle} onBack={handleBackClick} />
        ) : (
          <ArticleList articles={articles} onArticleClick={handleArticleClick} />
        )}
        <ImageGallery /> {/* Hier wird die Bildgalerie angezeigt */}
      </div>
      <Footer />
    </div>
  );

}

export default App;
