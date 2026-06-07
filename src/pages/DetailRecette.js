import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function DetailRecette() {
  const { id } = useParams();
  const [recette, setRecette] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`http://localhost:4000/recettes/${id}`, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) throw new Error('Recette introuvable.');
          throw new Error('Une erreur réseau est survenue.');
        }
        return res.json();
      })
      .then((data) => {
        setRecette(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message);
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [id]);

  if (loading) return <div className="status-message">Chargement du détail...</div>;
  if (error) return <div className="status-message error">{error} <br /><Link to="/">Retourner à l'accueil</Link></div>;

  // On prépare le découpage des instructions en étapes si la recette existe
  const etapes = recette && recette.instructions
    ? recette.instructions
        .split('.')
        .map(etape => etape.trim())
        .filter(etape => etape.length > 0)
    : [];

  return (
    <div className="recipe-detail-container">
      <Link to="/" className="btn-back">⬅ Retour à l'accueil</Link>
      {recette && (
        <>
          <div className="recipe-detail-header">
            <h1>{recette.titre}</h1>
            {/* L'image est maintenant enveloppée dans une div wrapper pour mieux la contrôler en taille */}
            <div className="recipe-image-wrapper">
              <img src={recette.imageUrl || 'https://via.placeholder.com/600x400?text=Pas+d+image'} alt={recette.titre} />
            </div>
          </div>
          
          <div className="recipe-detail-body">
            <div className="section-ingredients">
              <h2>Ingrédients</h2>
              <p>{recette.ingredients}</p>
            </div>
            
            <div className="section-instructions">
              <h2>Instructions de préparation</h2>
              
              {/* Remplacement du paragraphe simple par la liste déroulante (Accordéon) */}
              <div className="accordion-list">
                {etapes.map((etape, index) => (
                  <details key={index} className="accordion-item" open={index === 0}>
                    <summary>Étape {index + 1}</summary>
                    <div className="accordion-content">
                      <p>{etape}.</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}