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

#### app.js 
```
- Question: Comment organiser le point d'entrée de l'application ?
- Réponse: En important les dépendances, initialisant l'application Express, configurant les middleware, définissant les routes, gérant les erreurs et démarrant le serveur.

- Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
- Réponse: Configurer les middleware, définir les routes, gérer les erreurs et démarrer le serveur sur un port spécifié.
```
#### .env 
```
- Question: Quelles sont les informations sensibles à ne jamais commiter ?
- Réponse : Les informations d'intentification á la base des données ou des autres service.

- Question: Pourquoi utiliser des variables d'environnement ?
- Réponse : Afin d'avoir un code plus sécurisé et de ne pas exposer les informations sensibles.
```
#### db.js 
```
- Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
- Réponse : Pour assurer un couplage faible dans le cas de changement de moteur des bases de données. 

- Question : Comment gérer proprement la fermeture des connexions ?
- Réponse : On utilisant un block finally dans un try catch afin d'assurer de la fermeture de la connexion dans tous les cas.
```
#### env.js 
```
- Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
- Réponse : Il est important de valider les variables d'envrionnement au démarrage pour s'assurer que l'application fonctionne correctement et pour éviter les erreurs et que toutes les informations nécessaires soient bien présentes.

- Question: Que se passe-t-il si une variable requise est manquante ?
- Réponse : Lorsque une variable requise est manquante, une erreur est levée.
```
#### courseController.js 
```
- Question: Quelle est la différence entre un contrôleur et une route ?
- Réponse: Un route gére le mapping des rêquetes HTTP vers des fonctions de contrôleur et le contrôleur contient la logique pour gérer les requêtes.

- Question : Pourquoi séparer la logique métier des routes ?
- Réponse : Pour assuer un couplage faible en cas de changement de l'implémentation ou l'ajout des nouvelles fonctionalités.
```
#### courseRoutes.js 
```
- Question: Pourquoi séparer les routes dans différents fichiers ?
- Réponse : Pour une meilleure organisation et maintenabilité du code et séparation des préoccupations.

- Question : Comment organiser les routes de manière cohérente ?
- Réponse: En regroupant les routes par fonctionnalités.
```
#### mongoService.js 
```
- Question: Pourquoi créer des services séparés ?
- Réponse: Pour assurer un couplage faible dans le cas de changement de l'implémentation ou l'ajout des nouvelles fonctionnalités.
```
#### redisService.js 
```
- Question : Comment gérer efficacement le cache avec Redis ?
- Réponse : En utilisant les clés uniques pour chaque donnée et en définissant une durée de vie appropriée pour chaque donnée.

- Question: Quelles sont les bonnes pratiques pour les clés Redis ?
- Réponse : Utiliser des clés explicites et uniques pour chaque donnée et éviter les clés génériques.
```
---
## Projet Réalisé

### **Création de la Base des Données** 
![BDD](https://github.com/user-attachments/assets/321dd881-8104-40fc-a3e6-72254460742e)
_Création de la base des données_

### **Vérification de Redis**
![REDIS](https://github.com/user-attachments/assets/134a58a0-9265-49cf-91b9-fd6c5b10d52a)
_Vérification de Redis_

### **Test d'API avec Postman**
#### **Création d'un Cours**
![CREATION_COURS](https://github.com/user-attachments/assets/0e5246e6-9cce-492e-9d53-55969fa8547f)
_Création d'un cours_
![CREATION_COURS_BDD](https://github.com/user-attachments/assets/1963d72b-a82e-429a-86bd-f74362552fba)
_Le cours créé dans la base des données_

#### **Recherche d'un Cours**
![RECHERCHE_COURS](https://github.com/user-attachments/assets/8640eaf7-e080-4d47-b702-6b0bc2f04cee)
_Recherche d'un cours par ID_

#### **Statistiques d'un Cours**
![STATS_COURS](https://github.com/user-attachments/assets/32929860-f733-4641-a1e1-6f536ad2470f)
_Les statistiques d'un cours_

#### **Création d'un Etudiant**
![CREATION_ETUDIANT](https://github.com/user-attachments/assets/a9502def-9d0e-49a1-8627-13a6acbca937)
_Création d'un étudiant_
![CREATION_ETUDIANT_BDD](https://github.com/user-attachments/assets/62ef7a4b-cb6a-4286-b112-ee45c046576f)
_L'étudiant créé d'un la base des données

#### **Recherche d'un Etudiant**
![RECHERCHE_ETUDIANT](https://github.com/user-attachments/assets/0f2357f3-6595-4394-97b9-17d723f536a0)
_Recherche d'un étudiant par ID_

#### **Inscription d'un étudiant dans un cours**
![INSC_ETUDIANT_COURS](https://github.com/user-attachments/assets/25fac014-fce5-4d18-a1c5-db1b2b6968e9)
_Inscription d'un étudiant dans un cours_
![INSC_BDD](https://github.com/user-attachments/assets/dedd53ce-d24b-49e4-b219-ca797cc13801)
_L'inscription créée dans la base des données_

#### **Statistiques d'un Etudiant**
![STATS_ETUDIANT](https://github.com/user-attachments/assets/e26fb1d7-ab08-41a1-84b3-160eab195688)
_Les statistiques d'un étudiant_

---
## Réalisé par 

### Youssef EL HAMRI (II-BDCC2)
