# Exam Hub — Frontend

Interface web (React + Vite) pour Exam Hub, connectée à l'API réelle du backend
(dépôt séparé `Exam-Hub-Backend`, requis pour que cette application fonctionne).

## Prérequis

- Node.js et npm installés
- Le backend **Exam-Hub-Backend déjà installé, migré, seedé et lancé** (voir son propre
  README) — cette application ne fonctionne pas seule, elle a besoin de l'API sur
  `http://localhost:3000` par défaut.

## Installation

```bash
npm install
```

## Configuration

Copiez le fichier d'exemple :

```bash
cp .env.example .env
```

`VITE_API_URL` doit pointer vers l'API du backend (`http://localhost:3000/api` par
défaut). Adaptez uniquement si votre backend tourne sur un autre port.

## Lancement

```bash
npm run dev
```

Puis ouvrez `http://localhost:5173`.

## Comptes de test

Il n'y a pas d'auto-inscription (RG-01) : le seul compte qui existe après l'installation
du backend est l'administrateur créé par `npm run seed` côté backend — utilisez l'email et
le mot de passe affichés à ce moment-là (par défaut définis dans le `.env` du backend :
`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`).

Pour tester le côté étudiant, connectez-vous en admin puis créez un ou plusieurs comptes
étudiants depuis `/admin/students`.

## Architecture

- `src/api/client.js` — wrapper `fetch` commun : ajoute le header `Authorization: Bearer`
  à partir du token stocké après connexion, et normalise les erreurs de l'API (RG-13).
- `src/api/authApi.js` — appel de connexion (`POST /api/auth/login`).
- `src/api/realApi.js` — toutes les autres routes (étudiants, cours, examens, questions,
  résultats, espace étudiant). Chaque fonction convertit entre le format renvoyé par le
  backend et celui utilisé par les pages.
- `src/context/AuthContext.jsx` — session utilisateur (token + rôle), persistée en
  `localStorage`.
- `src/components/ProtectedRoute.jsx` — protection des routes par rôle : non connecté →
  `/login` ; connecté avec le mauvais rôle → redirigé vers son propre espace.

## Fonctionnalités

- Toutes les routes imposées par le sujet (`/login`, `/admin/...`, `/student/...`),
  déclarées avec `react-router-dom`.
- Espace admin : tableau de bord, gestion des étudiants (création, réinitialisation de mot
  de passe, désactivation/réactivation), des cours, des examens, éditeur de questions
  (verrouillage visible dès qu'il y a une tentative, RG-08), page de résultats par examen.
- Espace étudiant : liste des examens disponibles, passage d'examen (confirmation avant
  soumission), page de résultat avec correction colorée juste/faux, historique des
  résultats.
- Les erreurs renvoyées par l'API (format RG-13) sont affichées à l'utilisateur.
