import React, { useState, useEffect } from 'react';
import './Navigation.css'; // Eigene CSS-Datei für die Navigation

function Navigation({ onAdminClick }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  let lastScrollY = 0;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`main-nav ${navHidden ? 'hidden' : ''}`}>
      <div className="logo">DTF-Site</div>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`nav-links ${showMenu ? 'show' : ''}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/galerie">Galerie</a></li> {/* Platzhalter-Link */}
        <li onClick={onAdminClick} style={{ cursor: 'pointer' }}>Admin</li>
      </ul>
      {showScrollTop && (
        <div className="scroll-top" onClick={scrollToTop}>
          ↑
        </div>
      )}
    </nav>
  );
}

export default Navigation;