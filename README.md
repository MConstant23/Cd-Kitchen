# 🍳 C&D KITCHEN - Application de Recettes de Cuisine
PROJET DE JAVASCRIPT_REACT
PROF: Mme SOGNON
-CONSTANT ADOUKONOU & JEAN_DORICE DEGBESSE-
SCHOOL: KEYCE.

Bienvenue sur le dépôt du projet **C&D KITCHEN**, une application React moderne permettant de découvrir et de gérer des recettes gourmandes (Crêpes, Burgers, Poulet Yassa, etc.).

Projet d'évaluation réalisé dans le cadre du cursus **Bachelor 2 - Intelligence Artificielle et Big Data**.

---

## 🚀 Guide d'Installation et de Lancement Local

Pour que l'application fonctionne correctement et charge toutes les données des recettes, vous devez lancer à la fois le serveur frontend (React) et le serveur d'API local (JSON Server).

### 🛠️ Étape 1 : Installer les dépendances
Ouvrez votre terminal dans le dossier du projet (`recethon`) et exécutez :
```bash
npm install

### Lancer le serveur de données (API)
npx json-server --watch db.json --port 4000

### Lancer l'app React: Ouvrez un second terminal dans le même dossier et lancez le serveur de développement :

npm start