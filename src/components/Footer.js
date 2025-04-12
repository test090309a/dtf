import React from 'react';
import './Footer.css'; // Eigene CSS-Datei für den Footer

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  // Funktion zur Umwandlung in römische Zahlen (einfache Implementierung für das Jahr)
  const toRoman = (num) => {
    const romanMap = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };
    let roman = "";
    for (let i in romanMap) {
      while (num >= romanMap[i]) {
        roman += i;
        num -= romanMap[i];
      }
    }
    return roman;
  };

  const romanYear = toRoman(year);

  return (
    <footer className="main-footer">
      <p>&copy; DTF-Site {romanYear}</p>
    </footer>
  );
}

export default Footer;