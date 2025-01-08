// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : 
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : 

const dotenv = require('dotenv');
dotenv.config();
validateEnv();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`L'environnement variable ${varName} est manquante.`);
    }
  });
  // Si une variable manque, lever une erreur explicative
  

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