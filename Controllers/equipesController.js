const Equipe = require('../models/Equipe');

// Create new equipe
exports.createEquipe = async (req, res) => {
  try {
    const { nom, chefEquipe } = req.body;
    const equipe = await Equipe.create({
      nom,
      chefEquipe,
    });
    res.status(201).json({
      success: true,
      data: equipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// Get all equipes
exports.getAllEquipes = async (req, res) => {
  try {
    const equipes = await Equipe.find();
    res.status(200).json({
      success: true,
      data: equipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// Get equipe by id
exports.getEquipeById = async (req, res) => {
  try {
    const equipe = await Equipe.findById(req.params.id);
    if (!equipe) {
      return res.status(404).json({
        success: false,
        error: 'Equipe not found',
      });
    }
    res.status(200).json({
      success: true,
      data: equipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// Update equipe by id
exports.updateEquipe = async (req, res) => {
  try {
    const { nom, chefEquipe } = req.body;
    let equipe = await Equipe.findById(req.params.id);
    if (!equipe) {
      return res.status(404).json({
        success: false,
        error: 'Equipe not found',
      });
    }
    equipe.nom = nom;
    equipe.chefEquipe = chefEquipe;
    await equipe.save();
    res.status(200).json({
      success: true,
      data: equipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

// Delete equipe by id
exports.deleteEquipe = async (req, res) => {
  try {
    const equipe = await Equipe.findById(req.params.id);
    if (!equipe) {
      return res.status(404).json({
        success: false,
        error: 'Equipe not found',
      });
    }
    await equipe.remove();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
