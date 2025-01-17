// Question: Pourquoi créer des services séparés ?
// Réponse: Pour assurer un couplage faible dans le cas de changement de l'implémentation ou l'ajout des nouvelles fonctionnalités

import { ObjectId } from 'mongodb';
import { getDb } from '../config/db.js';


async function findOneById(collectionName, id) {
  try {
    const db = await getDb();
    const collection = db.collection(collectionName);
    const objectId = new ObjectId(id);
    const result = await collection.findOne({ _id: objectId });
    return result;
  } catch (error) {
    console.error('Erreur lors de la recherche du document par ID :', error);
    throw error;
  }
}

async function insertOne(collectionName, document) {
  try {
    const db = await  getDb();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(document);
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'insertion du document :', error);
    throw error;
  }
}

async function updateOneById(collectionName, id, update) {
  try {
    const db = await getDb();
    const collection = db.collection(collectionName);
    const objectId = new ObjectId(id);
    const result = await collection.updateOne({ _id: objectId }, { $set: update });
    return result;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du document par ID :', error);
    throw error;
  }
}

async function deleteOneById(collectionName, id) {
  try {
    const db = await getDb();
    const collection = db.collection(collectionName);
    const objectId = new ObjectId(id);
    const result = await collection.deleteOne({ _id: objectId });
    return result;
  }catch (error) {
    console.error('Erreur lors de la suppression du document par ID :', error);
    throw error;
  }
}
async function aggregate(collection, pipeline) {

  const db = await getDb();

  return db.collection(collection).aggregate(pipeline).toArray();

}


// Export des services
export {
  findOneById,
  insertOne,
  updateOneById,
  deleteOneById,
  aggregate,
};