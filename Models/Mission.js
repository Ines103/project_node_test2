const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  tache: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  equipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipe'
  }
});

const Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission;
