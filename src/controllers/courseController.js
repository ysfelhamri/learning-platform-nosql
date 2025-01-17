// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Un route gére le mapping des rêquetes HTTP vers des fonctions de contrôleur et le contrôleur contient la logique pour gérer les requêtes
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Pour assuer un couplage faible en cas de changement de l'implémentation ou l'ajout des nouvelles fonctionalités

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
      return res.status(400).json({ message: 'Tous les champs sont obligatoires: title, description, instructor' });
    }

    const newCourse = {
      title,
      description,
      instructor,
      createdAt: new Date(),
    };

    const result = await mongoService.insertOne('courses', newCourse);

    if (result.insertedId) {
      const courseId = result.insertedId.toString();
      await redisService.cacheData(`course:${courseId}`, newCourse, 3600); // Cache for 1 hour
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
async function getCourse(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de cours invalide' });
    }

    const course = await mongoService.findOne('courses', { _id: new ObjectId(id) });

    if (course) {
      return res.status(200).json(course);
    } else {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du cours:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  } finally {
    if (db) {
      db.close();
    }
  }
}

async function getCourseStats(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de cours invalide' });
    }

    const stats = await mongoService.aggregate('courses', [
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: 'enrollments',
          localField: '_id',
          foreignField: 'courseId',
          as: 'enrollments',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          instructor: 1,
          enrollmentCount: { $size: '$enrollments' },
        },
      },
    ]);

    if (stats.length > 0) {
      return res.status(200).json(stats[0]);
    } else {
      return res.status(404).json({ message: 'Statistiques du cours non trouvées' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques du cours:', error);
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
  getCourse,
  getCourseStats,
};