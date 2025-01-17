const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController.js');

// Routes pour les étudiants
router.post('/', studentController.createStudent);
router.get('/:id', studentController.getStudent);
router.get('/stats/:id', studentController.getStudentStats);
router.get('/enroll/:studentId/:courseId', studentController.enrollStudent);


module.exports = router;