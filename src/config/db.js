// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Pour assurer un couplage faible dans le cas de changement de moteur des bases de données 
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : On utilisant un block finally dans un try catch afin d'assurer de la fermeture de la connexion dans tous les cas
const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    mongoClient = new MongoClient(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db(config.mongoDbName);
    console.log('Connecxion à MongoDB reussie');
  } catch (error) {
    console.error('Erreur de la connexion à MongoDB:', error);
    throw error;
  }
}

async function connectRedis() {
  try {
    redisClient = redis.createClient({ url: config.redisUri });
    redisClient.on('error', (err) => console.error('Erreur de client Redis', err));
    await redisClient.connect();
    console.log('Connection à Redis reussie');
  } catch (error) {
    console.error('Erreur de la connexion à Redis:', error);
    throw error;
  }
}

// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis,
  getMongoClient: () => mongoClient,
  getRedisClient: () => redisClient,
  getDb: () => db
};