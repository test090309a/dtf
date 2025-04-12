import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route für die Startseite */}
        <Route path="/" element={<Startseite />} />
      </Routes>
    </Router>
  );
}

function Startseite() {
  return (
    <div>
      <h1>Hallo!</h1>
    </div>
  );
}

export default App;
