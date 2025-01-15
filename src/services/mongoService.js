// Question: Pourquoi créer des services séparés ?
// Réponse: Pour assurer un couplage faible dans le cas de changement de l'implémentation ou l'ajout des nouvelles fonctionnalités

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  try {
    const objectId = ObjectId.createFromTime(id);
    const result = await collection.findOne({ _id: objectId });
    return result;
  } catch (error) {
    console.error('Erreur lors de la recherche du document par ID :', error);
    throw error;
  }
}

// Export des services
module.exports = {
  findOneById
};