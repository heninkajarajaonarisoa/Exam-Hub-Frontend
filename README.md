# Exam Hub — Prototype Frontend (routing + rôles)

Ce projet est un **prototype autonome**, séparé de votre repo actuel, pour tester la structure
de routes/rôles imposée par le sujet **avant fusion**. Il n'a pas de backend : toutes les
données sont simulées dans `src/api/mockApi.js` et persistées dans le `localStorage` du
navigateur (recharger la page ne perd rien ; effacer le localStorage relance les données de
départ).

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrez `http://localhost:5173`.

## Comptes de test

| Rôle | Email | Mot de passe |
| --- | --- | --- |
| Admin | `admin@hei.mg` | `admin123` |
| Étudiant (actif) | `rina@hei.mg` | `student123` |
| Étudiant (actif, aucun examen passé) | `tojo@hei.mg` | `student123` |
| Étudiant (désactivé, pour tester RG-11) | `fara@hei.mg` | `student123` |

## Ce que ça démontre

- Toutes les routes imposées par le sujet, déclarées avec `react-router-dom` (`/login`,
  `/admin/...`, `/student/...`).
- Protection par rôle : non connecté → redirigé vers `/login` ; connecté avec le mauvais rôle →
  redirigé vers son propre espace (`ProtectedRoute.jsx`).
- Règles de gestion simulées côté "serveur" mock (dans `mockApi.js`, pas dans les composants) :
  - RG-02 : un étudiant ne peut soumettre un examen qu'une fois.
  - RG-03 : un examen n'est visible/soumissible que dans sa fenêtre de disponibilité.
  - RG-04 : 2 à 6 choix, exactement un correct, refusé sinon.
  - RG-07 : les questions envoyées à l'étudiant ne contiennent jamais le choix correct.
  - RG-08 : questions verrouillées dès qu'il y a une tentative.
  - RG-09 : suppression bloquée si le cours a des examens / l'examen a des tentatives.
  - RG-10/RG-11 : désactivation au lieu de suppression, message distinct si compte désactivé.
  - RG-12 : note + correction affichées immédiatement après soumission.
  - RG-13 : chaque erreur simulée a un message et un statut HTTP cohérent.

## Comment fusionner avec votre repo existant

Rien ici n'est fait pour remplacer votre travail — objectif : piocher ce qui manque.

1. **Routing** : votre `App.jsx` actuel n'a pas de routing (`react-router-dom`). Le `App.jsx`
   de ce prototype montre la structure complète attendue — vous pouvez le copier tel quel dans
   votre projet et brancher vos propres pages dessus.
2. **Login** : `src/pages/auth/LoginPage.jsx` reprend exactement votre design (dégradé
   violet/rose, deux colonnes) — seul changement : le champ "Nom d'utilisateur" devient un champ
   email (le sujet impose email + mot de passe), et il est branché à `AuthContext` au lieu d'un
   `useState` local dans `App.jsx`.
3. **`AuthContext.jsx` + `ProtectedRoute.jsx`** : à copier tels quels dans `src/context/` et
   `src/components/`. C'est ce qui manquait pour distinguer admin/étudiant et protéger les
   routes.
4. **Pages admin/étudiant** : chaque fichier de `src/pages/admin/` et `src/pages/student/`
   correspond à une route du sujet. Si votre `AdminDashboard.jsx` ou `StudentDashboard.jsx`
   existant a déjà un meilleur design, gardez le vôtre et remplacez juste sa logique de données
   (mock en dur → `import * as api from "../api/mockApi"`), le reste peut rester.
5. **`src/api/mockApi.js`** : conçu pour être remplacé plus tard par de vrais appels `fetch()`
   vers l'API Express, sans changer les pages — chaque fonction a déjà le nom et la forme d'un
   futur appel réel (`login`, `getStudents`, `submitExam`, etc.).

## Ce qui n'est PAS dans ce prototype

- Pas de vrai backend, pas de JWT réel, pas de hachage bcrypt (mock uniquement).
- La landing page publique (Home/About/Services/Blog) n'est pas incluse ici — elle n'est de
  toute façon pas dans les routes imposées par le sujet, gardez votre version existante et
  branchez juste `/login` dessus.


## Le compte fonctionnel  
Email    : admin@exam-hub.test
Password : Admin123!