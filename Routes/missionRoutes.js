const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');

// Get all missions
router.get('/', missionController.getAllMissions);

// Create a new mission
router.post('/', missionController.createMission);

// Update an existing mission
router.put('/:missionId', missionController.updateMission);

// Delete a mission
router.delete('/:missionId', missionController.deleteMission);

module.exports = router;
