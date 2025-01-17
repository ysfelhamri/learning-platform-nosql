// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : En utilisant les clés uniques pour chaque donnée et en définissant une durée de vie appropriée pour chaque donnée
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utiliser des clés explicites et uniques pour chaque donnée et éviter les clés génériques

const { getRedisClient } = require('../config/db.js');

// Initialisation du client Redis
let client;

(async () => {
  try {
    client = await getRedisClient();
    console.log('Client Redis initialisé avec succès');
  } catch (err) {
    console.error('Échec de l\'initialisation du client Redis :', err);
  }
})();

// Fonctions utilitaires pour le cache et la récupération des données
async function cacheData(key, data, ttl) {
  if (!client) {
    throw new Error('Le client Redis n\'est pas initialisé');
  }

  try {
    const result = await client.set(key, JSON.stringify(data), 'EX', ttl);
    console.log(`Données mises en cache avec succès pour la clé : ${key}`);
    return result;
  } catch (err) {
    console.error(`Échec de la mise en cache des données pour la clé : ${key}`, err);
    throw err;
  }
}

async function getData(key) {
  if (!client) {
    throw new Error('Le client Redis n\'est pas initialisé');
  }

  try {
    const reply = await client.get(key);
    if (reply === null) {
      console.log(`Aucune donnée trouvée pour la clé : ${key} (cache manquant)`);
      return null;
    }
    console.log(`Données récupérées pour la clé : ${key}`);
    return JSON.parse(reply);
  } catch (err) {
    console.error(`Échec de la récupération des données pour la clé : ${key}`, err);
    throw err;
  }
}

module.exports = {
  cacheData,
  getData,
};
