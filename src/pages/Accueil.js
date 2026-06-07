import React, { useState, useEffect } from 'react'; // useState gère la mémoire de la page, useEffect gère les actions au chargement.
import RecipeCard from '../components/RecipeCard'; // On importe le "moule" de carte créé plus haut.

export default function Accueil() {
  // --- LES BOÎTES DE MÉMOIRE (STATES) ---
  const [recettes, setRecettes] = useState([]); // Une boîte pour stocker le tableau de recettes (vide au début : []).
  const [loading, setLoading] = useState(true); // Une boîte pour savoir si on est en train de charger (vrai au début).
  const [error, setError] = useState(null);    // Une boîte pour stocker un message d'erreur s'il y a un problème (rien au début).

  // --- LE CHARGEMENT DES DONNÉES ---
  // useEffect s'exécute automatiquement AU MOMENT OÙ LA PAGE S'AFFICHE pour la première fois.
  useEffect(() => {
    // AbortController est comme un bouton "Annuler" pour les requêtes réseau. 
    // Si l'utilisateur clique vite sur une autre page, on annule la recherche pour ne pas faire travailler le site pour rien.
    const abortController = new AbortController();

    // On va chercher les recettes sur notre serveur local (port 4000)
    fetch('http://localhost:4000/recettes', { signal: abortController.signal })
      .then((res) => {
        // "res" est la réponse du serveur. Si la réponse n'est pas "OK" (ex: erreur 404), on déclenche une erreur.
        if (!res.ok) {
          throw new Error('Impossible de récupérer les recettes.');
        }
        return res.json(); // Si c'est OK, on transforme la réponse en un format lisible (JSON).
      })
      .then((data) => {
        // "data" contient maintenant la vraie liste des recettes.
        setRecettes(data); // On range cette liste dans notre boîte "recettes".
        setLoading(false); // Le chargement est fini, on passe "loading" à faux.
      })
      .catch((err) => {
        // Ce bloc s'exécute UNIQUEMENT s'il y a eu un problème dans le fetch.
        
        // Si l'erreur est juste due au fait qu'on a sciemment "annulé" la requête, on ne fait rien.
        if (err.name === 'AbortError') {
          return;
        }
        // Pour les vraies erreurs (serveur éteint, etc.), on enregistre le message et on arrête le chargement.
        setError(err.message);
        setLoading(false);
      });

    // Cette fonction de retour est magique : elle s'exécute si l'utilisateur quitte la page. 
    // C'est elle qui appuie sur le bouton "Annuler".
    return () => {
      abortController.abort();
    };
  }, []); // Les crochets vides [] signifient : "ne fait tout ça qu'une seule fois au chargement".

  // --- L'AFFICHAGE CONDITIONNEL ---
  // 1. Si on charge encore, on affiche ce message et on s'arrête là.
  if (loading) return <div className="status-message">Chargement des recettes...</div>;
  
  // 2. S'il y a une erreur, on affiche l'erreur et on s'arrête là.
  if (error) return <div className="status-message error">Erreur : {error}</div>;

  // 3. Si tout va bien, on affiche la page normale.
  return (
    <div>
      <h1 className="page-title">Découvrez nos Recettes</h1>
      
      {/* On vérifie s'il n'y a aucune recette dans notre boîte */}
      {recettes.length === 0 ? (
        <p className="no-data">Aucune recette disponible pour le moment.</p>
      ) : (
        // Sinon, on affiche une grille de recettes
        <div className="recipes-grid">
          {/* .map() est une boucle. Pour CHAQUE "recette" présente dans le tableau "recettes", 
              on va fabriquer un composant <RecipeCard />.
              Le "key" est obligatoire en React pour qu'il s'y retrouve dans la liste (on lui donne l'ID). */}
          {recettes.map((recette) => (
            <RecipeCard key={recette.id} recette={recette} />
          ))}
        </div>
      )}
    </div>
  );
}