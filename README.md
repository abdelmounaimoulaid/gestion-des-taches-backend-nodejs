# 📋 API de Gestion des Tâches

API REST développée avec Node.js, Express et MongoDB pour la gestion de tâches avec authentification JWT.

**Auteur:** OULAID Abdelmounaim

## 🚀 Démarrage Rapide

### Prérequis
- Node.js (v14+)
- MongoDB

### Installation

```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos paramètres

# Démarrer le serveur
npm start
```

Le serveur démarre sur `http://localhost:5000`

## 📖 Documentation

Ouvrez le fichier **`Documentation API Gestion des Tâches Abdelmounaim Oulaid.html`** dans votre navigateur pour consulter la documentation complète de l'API.

La documentation inclut :
- Architecture MVC détaillée
- Structure du projet
- Schémas de données (Mongoose)
- Endpoints API avec exemples
- Sécurité et authentification
- Diagrammes de flux

## 🔧 Technologies Utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification
- **Bcrypt** - Hachage des mots de passe

## 🔐 Sécurité

- Protection CORS
- Authentification JWT
- Hachage bcrypt
- Protection NoSQL Injection
- Protection XSS
- Rate Limiting
- Validation des données

## 📂 Structure du Projet

```
tasks/
├── src/
│   ├── models/          # Schémas Mongoose
│   ├── controllers/     # Logique métier
│   ├── routes/          # Définition des routes
│   └── middlewares/     # Middlewares personnalisés
├── server.js            # Point d'entrée
└── Documentation API Gestion des Tâches Abdelmounaim Oulaid.html
```

## 📝 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Tâches (Auth requise)
- `GET /api/tasks` - Liste des tâches
- `POST /api/tasks` - Créer une tâche
- `PUT /api/tasks/:id` - Modifier une tâche
- `DELETE /api/tasks/:id` - Supprimer une tâche

## 🔗 Liens

**Repository GitHub:** [https://github.com/abdelmounaimoulaid/gestions-des-taches](https://github.com/abdelmounaimoulaid/gestions-des-taches)

---

© 2026 OULAID Abdelmounaim - ISMAGI
