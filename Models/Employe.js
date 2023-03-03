const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  categorie: {
    type: String,
    required: true
  },
  specialite: {
    type: String,
    required: true
  },
  numCnss: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  disponible: {
    type: Boolean,
    default: true
  },
  equipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipe'
  }
});

const Employe = mongoose.model('Employe', employeSchema);

module.exports = Employe;
