const express = require('express');
const router = express.Router();
const equipeController = require('../controllers/equipeController');

// Get all equipes
router.get('/', equipeController.getAllEquipes);

// Create a new equipe
router.post('/', equipeController.createEquipe);

// Update an existing equipe
router.put('/:equipeId', equipeController.updateEquipe);

// Delete an equipe
router.delete('/:equipeId', equipeController.deleteEquipe);

module.exports = router;
