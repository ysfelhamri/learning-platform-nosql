// Question: Comment organiser le point d'entrée de l'application ?
// Réponse: En important les dépendances, initialisant l'application Express, configurant les middleware, définissant les routes, gérant les erreurs et démarrant le serveur.
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
// Réponse: Configurer les middleware, définir les routes, gérer les erreurs et démarrer le serveur sur un port spécifié.

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();


startServer();
async function startServer() {
  try {
    // Initialiser les connexions aux bases de données
    await db.connect();

    // Configurer les middlewares Express
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Monter les routes
    app.use('/courses', courseRoutes);
    app.use('/students', studentRoutes);

    // Démarrer le serveur
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  try {
    await db.disconnect();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to close database connection:', error);
    process.exit(1);
  }
});

startServer();