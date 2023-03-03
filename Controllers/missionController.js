const Mission = require("../models/mission");

const missionController = {
  // Create a new mission
  createMission: async (req, res) => {
    try {
      const mission = new Mission({
        tache: req.body.tache,
        description: req.body.description,
        dateDebut: req.body.dateDebut,
        dateFin: req.body.dateFin,
        equipe: req.body.equipe,
      });

      await mission.save();
      res.status(201).json({ message: "Mission created successfully.", mission });
    } catch (error) {
      res.status(500).json({ message: "Error occurred while creating the mission.", error });
    }
  },

  // Get all missions
  getAllMissions: async (req, res) => {
    try {
      const missions = await Mission.find().populate("equipe", "nom");
      res.status(200).json({ missions });
    } catch (error) {
      res.status(500).json({ message: "Error occurred while retrieving the missions.", error });
    }
  },

  // Get a single mission by ID
  getMissionById: async (req, res) => {
    try {
      const mission = await Mission.findById(req.params.id).populate("equipe", "nom");
      if (!mission) {
        return res.status(404).json({ message: "Mission not found." });
      }
      res.status(200).json({ mission });
    } catch (error) {
      res.status(500).json({ message: "Error occurred while retrieving the mission.", error });
    }
  },

  // Update a mission by ID
  updateMissionById: async (req, res) => {
    try {
      const mission = await Mission.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!mission) {
        return res.status(404).json({ message: "Mission not found." });
      }
      res.status(200).json({ message: "Mission updated successfully.", mission });
    } catch (error) {
      res.status(500).json({ message: "Error occurred while updating the mission.", error });
    }
  },

  // Delete a mission by ID
  deleteMissionById: async (req, res) => {
    try {
      const mission = await Mission.findByIdAndDelete(req.params.id);
      if (!mission) {
        return res.status(404).json({ message: "Mission not found." });
      }
      res.status(200).json({ message: "Mission deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Error occurred while deleting the mission.", error });
    }
  },
};

module.exports = missionController;
