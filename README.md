# 🏠 Application Mobile de Location de Logements

> Plateforme mobile multiplateforme facilitant la recherche et la location de logements à travers différents pays et villes.

[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-blue)]()
[![License](https://img.shields.io/badge/License-MIT-green.svg)]()
[![Status](https://img.shields.io/badge/Status-En%20développement-yellow)]()

## 📋 Table des matières

- [À propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Architecture](#architecture)
- [Captures d'écran](#captures-décran)
- [Roadmap](#roadmap)
- [Contribution](#contribution)
- [Licence](#licence)
- [Contact](#contact)

## 🎯 À propos

Cette application mobile vise à simplifier le processus de recherche de logements à louer, particulièrement pour les personnes en mobilité géographique (étudiants, travailleurs, expatriés, voyageurs).

### Problème résolu

La recherche de logements à louer est souvent :
- ❌ Compliquée et chronophage
- ❌ Peu fiable (annonces frauduleuses)
- ❌ Difficile lors de changements de ville ou pays

### Notre solution

Une plateforme mobile intuitive offrant :
- ✅ Recherche géolocalisée simplifiée
- ✅ Filtres personnalisés
- ✅ Processus de validation des annonces
- ✅ Contact direct avec les propriétaires
- ✅ Interface multiplateforme (Android & iOS)

## ✨ Fonctionnalités

### Version actuelle (MVP)

#### Pour les locataires
- 🔐 **Authentification sécurisée**
  - Inscription par email/téléphone
  - Connexion via Google/Apple (optionnel)
  
- 🔍 **Recherche intelligente**
  - Sélection pays/ville
  - Affichage automatique des logements disponibles
  
- 🎚️ **Filtres avancés**
  - Budget (min/max)
  - Type de logement (chambre, studio, maison)
  - Meublé/non meublé
  - Durée de location (court/long séjour)
  
- 📱 **Consultation d'annonces**
  - Galerie photos
  - Description détaillée
  - Prix et localisation
  - Informations propriétaire
  
- 💬 **Contact propriétaire**
  - Appel téléphonique
  - Message/Chat intégré
  
- ⭐ **Gestion des favoris**
  - Sauvegarde d'annonces
  - Accès rapide aux logements présélectionnés

#### Pour les administrateurs
- 👥 Gestion des utilisateurs
- 📝 Validation/suppression des annonces
- 🛡️ Modération du contenu
- 📊 Statistiques d'utilisation

## 🛠 Technologies utilisées

### Frontend
- **Framework** : Flutter / React Native *(à définir)*
- **Langages** : Dart / JavaScript / TypeScript
- **State Management** : Provider / Redux *(à définir)*

### Backend
- **Service** : Firebase / Supabase / Node.js *(à définir)*
- **Base de données** : Cloud Database (temps réel)
- **Authentification** : Firebase Auth / Custom JWT

### Outils de développement
- **Version Control** : Git & GitHub
- **CI/CD** : GitHub Actions / Fastlane
- **Design** : Figma
- **Project Management** : Trello / Jira *(à définir)*

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

```bash
# Pour Flutter (si choisi)
- Flutter SDK (>= 3.0.0)
- Dart SDK
- Android Studio / Xcode

# Pour React Native (si choisi)
- Node.js (>= 16.x)
- npm ou Yarn
- React Native CLI
- Android Studio / Xcode

# Commun
- Git
- Un éditeur de code (VS Code recommandé)
```

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/app-location-logements.git
cd app-location-logements
```

### 2. Installer les dépendances

#### Pour Flutter
```bash
flutter pub get
```

#### Pour React Native
```bash
npm install
# ou
yarn install
```

### 3. Configuration de l'environnement

Créer un fichier `.env` à la racine du projet :

```env
# Firebase / Backend Configuration
API_KEY=votre_api_key
AUTH_DOMAIN=votre_auth_domain
PROJECT_ID=votre_project_id
STORAGE_BUCKET=votre_storage_bucket

# Autres configurations
GOOGLE_MAPS_API_KEY=votre_google_maps_key
```

### 4. Lancer l'application

#### Pour Flutter
```bash
# Android
flutter run -d android

# iOS
flutter run -d ios
```

#### Pour React Native
```bash
# Android
npm run android

# iOS
npm run ios
```

## ⚙️ Configuration

### Configuration Firebase

1. Créer un projet Firebase sur [console.firebase.google.com](https://console.firebase.google.com)
2. Télécharger les fichiers de configuration :
   - `google-services.json` (Android) → `/android/app/`
   - `GoogleService-Info.plist` (iOS) → `/ios/Runner/`
3. Activer les services nécessaires :
   - Authentication
   - Cloud Firestore
   - Storage
   - Analytics (optionnel)

### Configuration des API tierces

- **Google Maps** : Obtenir une clé API depuis Google Cloud Console
- **Social Login** : Configurer OAuth pour Google/Apple

## 📖 Utilisation

### Pour les développeurs

```bash
# Lancer les tests
npm test  # ou flutter test

# Build de production
npm run build  # ou flutter build apk/ios

# Linter et formatage
npm run lint  # ou flutter analyze
```

### Pour les utilisateurs

1. **Inscription** : Créer un compte avec email ou connexion sociale
2. **Recherche** : Sélectionner pays et ville
3. **Filtres** : Affiner la recherche selon vos critères
4. **Consultation** : Parcourir les annonces disponibles
5. **Contact** : Contacter directement les propriétaires
6. **Favoris** : Sauvegarder vos logements préférés

## 🏗 Architecture

```
app-location-logements/
├── android/                 # Configuration Android
├── ios/                     # Configuration iOS
├── lib/                     # Code source Flutter
│   ├── models/             # Modèles de données
│   ├── screens/            # Écrans de l'application
│   ├── widgets/            # Composants réutilisables
│   ├── services/           # Services (API, Auth, etc.)
│   ├── utils/              # Utilitaires et helpers
│   └── main.dart           # Point d'entrée
├── assets/                  # Images, fonts, etc.
├── test/                    # Tests unitaires et d'intégration
├── docs/                    # Documentation
│   └── cahier-des-charges.pdf
├── .env                     # Variables d'environnement
├── pubspec.yaml            # Dépendances Flutter
└── README.md               # Ce fichier
```

## 📸 Captures d'écran

> *À venir - Les captures d'écran seront ajoutées après le développement de l'interface*

## 🗺 Roadmap

### Phase 1 : Analyse & Préparation (2 semaines) ✅
- [x] Validation du cahier des charges
- [ ] Définition du MVP
- [ ] Choix des technologies
- [ ] Architecture technique

### Phase 2 : UX/UI Design (2 semaines) 🔄
- [ ] Wireframes des écrans
- [ ] Design de l'interface
- [ ] Validation des parcours utilisateurs

### Phase 3 : Développement (6-8 semaines) ⏳
- [ ] Frontend Android & iOS
- [ ] Backend et API
- [ ] Intégration base de données
- [ ] Système d'authentification
- [ ] Recherche et filtres

### Phase 4 : Tests & Corrections (2 semaines)
- [ ] Tests fonctionnels
- [ ] Tests de performance
- [ ] Correction des bugs
- [ ] Optimisation UX

### Phase 5 : Déploiement (1 semaine)
- [ ] Publication Google Play Store
- [ ] Publication Apple App Store
- [ ] Mise en place analytics

### Fonctionnalités futures
- 🗺️ Carte interactive
- 💬 Chat interne propriétaire/locataire
- ⭐ Système de notation et avis
- 💳 Paiement et réservation en ligne
- 👑 Abonnements premium
- 🌍 Support multilingue (anglais, espagnol, etc.)

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/NouvelleFonctionnalite`)
3. **Commit** vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. **Push** vers la branche (`git push origin feature/NouvelleFonctionnalite`)
5. Ouvrir une **Pull Request**

### Guidelines de contribution

- Respecter les conventions de code du projet
- Ajouter des tests pour les nouvelles fonctionnalités
- Mettre à jour la documentation si nécessaire
- Décrire clairement vos modifications dans la PR

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Votre Nom**
- GitHub: [@votre-username](https://github.com/votre-username)
- Email: votre.email@example.com

## 📞 Contact & Support

Pour toute question ou suggestion :
- 📧 Email: support@app-location.com
- 🐛 Issues: [GitHub Issues](https://github.com/votre-username/app-location-logements/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/votre-username/app-location-logements/discussions)

---

<div align="center">
  <p>Développé avec ❤️ pour simplifier la recherche de logements</p>
  <p>© 2025 Application de Location de Logements. Tous droits réservés.</p>
</div>
