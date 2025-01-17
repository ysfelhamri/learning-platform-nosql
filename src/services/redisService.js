const redis = require('redis');

// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : En utilisant les clés uniques pour chaque donnée et en définissant une durée de vie appropriée pour chaque donnée
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utiliser des clés explicites et uniques pour chaque donnée et éviter les clés génériques

const client = redis.createClient();

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
  return new Promise((resolve, reject) => {
    client.setex(key, ttl, JSON.stringify(data), (err, reply) => {
      if (err) {
        return reject(err);
      }
      resolve(reply);
    });
  });
}

async function getData(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(reply));
    });
  });
}

module.exports = {
  cacheData,
  getData
};