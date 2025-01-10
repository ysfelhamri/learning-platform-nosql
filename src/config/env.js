// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : Il est important de valider les variables d'envrionnement au démarrage pour s'assurer que l'application fonctionne correctement et pour éviter les erreurs et que toutes les informations nécessaires soient bien présentes.
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : Lorsque une variable requise est manquante, une erreur est levée.

const dotenv = require('dotenv');
dotenv.config();


const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`L'environnement variable ${varName} est manquante.`);
    }
  });
  // Si une variable manque, lever une erreur explicative
}

validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};