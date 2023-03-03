const express = require('express');
const router = express.Router();
const employeController = require('../controllers/employeController');

// GET all employes
router.get('/', employeController.getAllEmployes);

// GET a single employe by id
router.get('/:id', employeController.getEmployeById);

// POST a new employe
router.post('/', employeController.createEmploye);

// PUT/PATCH update an existing employe by id
router.put('/:id', employeController.updateEmploye);

// DELETE an employe by id
router.delete('/:id', employeController.deleteEmploye);

// Assign an employe to an equipe
router.post('/:employeId/equipe/:equipeId', employeController.assignEmployeToEquipe);

module.exports = router;
