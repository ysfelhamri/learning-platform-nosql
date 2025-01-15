// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Un route gére le mapping des rêquetes HTTP vers des fonctions de contrôleur et le contrôleur contient la logique pour gérer les requêtes
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Pour assuer un couplage faible en cas de changement de l'imlémentation ou l'ajout des nouvelles fonctionalités

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
  try {
    const { title, description, instructor } = req.body;

    if (!title || !description || !instructor) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    const newCourse = {
      title,
      description,
      instructor,
      createdAt: new Date(),
    };

    const result = await mongoService.insertOne('courses', newCourse);

    if (result.insertedId) {
      const courseId = ObjectId.createFromTime(result.insertedId);
      await redisService.set(`course:${courseId}`, JSON.stringify(newCourse));
      return res.status(201).json({ message: 'Cours créé avec succès', courseId });
    } else {
      return res.status(500).json({ message: 'Échec de la création du cours' });
    }
  } catch (error) {
    console.error('Erreur lors de la création du cours:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  } finally {
    if (db) {
      db.close();
    }
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
};