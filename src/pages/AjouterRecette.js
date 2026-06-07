import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AjouterRecette() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: '',
    ingredients: '',
    instructions: '',
    imageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Validation stricte
    if (!formData.titre.trim() || !formData.ingredients.trim() || !formData.instructions.trim()) {
      setError('Veuillez remplir tous les champs obligatoires (*).');
      return;
    }

    setIsSubmitting(true);

    fetch('http://localhost:4000/recettes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Échec de l'enregistrement de la recette.");
        return res.json();
      })
      .then(() => {
        setIsSubmitting(false);
        navigate('/'); // Redirection vers l'accueil après succès
      })
      .catch((err) => {
        setError(err.message);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="form-container">
      <h1>Ajouter une nouvelle recette</h1>
      {error && <div className="error-alert">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titre">Nom de la recette *</label>
          <input
            type="text"
            id="titre"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            placeholder="Ex: Tarte aux pommes"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingrédients *</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Listez les ingrédients séparés par des virgules..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions *</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Étapes de préparation..."
            rows="6"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">URL de l'image (optionnel)</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://exemple.com/image.jpg"
          />
        </div>

        <button type="submit" className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Publication en cours...' : 'Publier la recette'}
        </button>
      </form>
    </div>
  );
}