import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">C&D Kitchen</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/ajouter" className="btn-nav">➕ Ajouter une recette</Link>
        </li>
      </ul>
    </nav>
  );
}