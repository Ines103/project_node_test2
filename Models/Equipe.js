const mongoose = require('mongoose');

const equipeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  chefEquipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employe'
  },
  membres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employe'
    }
  ]
});

const Equipe = mongoose.model('Equipe', equipeSchema);

module.exports = Equipe;
