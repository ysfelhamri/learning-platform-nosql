# Projet de fin de module NoSQL

## Introduction
Ce projet est une API qui va servir de backend à une plateforme d'apprentissage en ligne. Cette API concerne deux entités Course et Student.

---

## Modules Installés
- **Node.js** : version 22.13.0
- **MongoDB** : version 2.3.8 (local)
- **Redis** : version 7.8.2 (local)

---
## Outils Utilisés
- **Postman** : test d'API
- **Visual Studio Code** : envrionnement de développement
- **Git** : organisation de travail et la traçabilité

---

## Architecture de Projet

```
/src
   /routes         # Contient les définitions des routes de l'API
      courseRoutes.js
      studentRoutes.js
   /controllers    # Contient la logique métier des différentes routes
      courseController.js
      studentController.js
   /services       # Contient les services pour interagir avec les bases de données
      mongoService.js
      redisService.js
   /config         # Contient les fichiers de configuration de l'application
      db.js
      env.js
App.js            # Point d'entrée principal de l'application
.env              # Fichier de configuration des variables d'environnement
README.md         # Documentation du projet
```

---

## Réponses aux Questions

### app.js 
```
- Question: Comment organiser le point d'entrée de l'application ?
- Réponse: En important les dépendances, initialisant l'application Express, configurant les middleware, définissant les routes, gérant les erreurs et démarrant le serveur.

- Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
- Réponse: Configurer les middleware, définir les routes, gérer les erreurs et démarrer le serveur sur un port spécifié.
```
### .env 
```
- Question: Quelles sont les informations sensibles à ne jamais commiter ?
- Réponse : Les informations d'intentification á la base des données ou des autres service.

- Question: Pourquoi utiliser des variables d'environnement ?
- Réponse : Afin d'avoir un code plus sécurisé et de ne pas exposer les informations sensibles.
```
### db.js 
```
- Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
- Réponse : Pour assurer un couplage faible dans le cas de changement de moteur des bases de données. 

- Question : Comment gérer proprement la fermeture des connexions ?
- Réponse : On utilisant un block finally dans un try catch afin d'assurer de la fermeture de la connexion dans tous les cas.
```
### env.js 
```
- Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
- Réponse : Il est important de valider les variables d'envrionnement au démarrage pour s'assurer que l'application fonctionne correctement et pour éviter les erreurs et que toutes les informations nécessaires soient bien présentes.

- Question: Que se passe-t-il si une variable requise est manquante ?
- Réponse : Lorsque une variable requise est manquante, une erreur est levée.
```
### courseController.js 
```
- Question: Quelle est la différence entre un contrôleur et une route ?
- Réponse: Un route gére le mapping des rêquetes HTTP vers des fonctions de contrôleur et le contrôleur contient la logique pour gérer les requêtes.

- Question : Pourquoi séparer la logique métier des routes ?
- Réponse : Pour assuer un couplage faible en cas de changement de l'implémentation ou l'ajout des nouvelles fonctionalités.
```
### courseRoutes.js 
```
- Question: Pourquoi séparer les routes dans différents fichiers ?
- Réponse : Pour une meilleure organisation et maintenabilité du code et séparation des préoccupations.

- Question : Comment organiser les routes de manière cohérente ?
- Réponse: En regroupant les routes par fonctionnalités.
```
### mongoService.js 
```
- Question: Pourquoi créer des services séparés ?
- Réponse: Pour assurer un couplage faible dans le cas de changement de l'implémentation ou l'ajout des nouvelles fonctionnalités.
```
### redisService.js 
```
- Question : Comment gérer efficacement le cache avec Redis ?
- Réponse : En utilisant les clés uniques pour chaque donnée et en définissant une durée de vie appropriée pour chaque donnée.

- Question: Quelles sont les bonnes pratiques pour les clés Redis ?
- Réponse : Utiliser des clés explicites et uniques pour chaque donnée et éviter les clés génériques.
```
---
## Projet Réalisé
