import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Accueil from './pages/Accueil';
import DetailRecette from './pages/DetailRecette';
import AjouterRecette from './pages/AjouterRecette';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/ajouter" element={<AjouterRecette />} />
            <Route path="/recette/:id" element={<DetailRecette />} />
            {/* Route 404 facultative */}
            <Route path="*" element={
              <div className="status-message">
                <h2>⚠️ Page non trouvée (404)</h2>
                <p>La page que vous recherchez n'existe pas.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;