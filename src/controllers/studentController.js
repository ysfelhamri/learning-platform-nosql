const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createStudent(req, res) {
  try {
    const { name, age, major } = req.body;

    if (!name || !age || !major) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    const newStudent = {
      name,
      age,
      major,
      createdAt: new Date(),
    };

    const result = await mongoService.insertOne('students', newStudent);

    if (result.insertedId) {
      const studentId = result.insertedId.toString();
      await redisService.cacheData(`student:${studentId}`, newStudent, 3600); // Cache for 1 hour
      return res.status(201).json({ message: 'Étudiant créé avec succès', studentId });
    } else {
      return res.status(500).json({ message: 'Échec de la création de l\'étudiant' });
    }
  } catch (error) {
    console.error('Erreur lors de la création de l\'étudiant:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  } 
}

async function getStudent(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID d\'étudiant invalide' });
    }

    const student = await mongoService.findOne('students', { _id: new ObjectId(id) });

    if (student) {
      return res.status(200).json(student);
    } else {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'étudiant:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  } 
}

async function getStudentStats(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID d\'étudiant invalide' });
    }

    const stats = await mongoService.aggregate('students', [
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: 'enrollments',
          localField: '_id',
          foreignField: 'studentId',
          as: 'enrollments',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          age: 1,
          major: 1,
          enrollmentCount: { $size: '$enrollments' },
        },
      },
    ]);

    if (stats.length > 0) {
      return res.status(200).json(stats[0]);
    } else {
      return res.status(404).json({ message: 'Statistiques de l\'étudiant non trouvées' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques de l\'étudiant:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  } 
}

// Export des contrôleurs
module.exports = {
  createStudent,
  getStudent,
  getStudentStats,
};
