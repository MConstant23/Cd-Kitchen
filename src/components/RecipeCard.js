import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recette }) {
  return (
    <div className="recipe-card">
      <img src={recette.imageUrl || 'https://via.placeholder.com/300x200?text=Pas+d+image'} alt={recette.titre} />
      <div className="recipe-card-content">
        <h3>{recette.titre}</h3>
        <Link to={`/recette/${recette.id}`} className="btn-detail">Voir la recette</Link>
      </div>
    </div>
  );
}