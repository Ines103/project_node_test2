const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

const authController = {};

authController.register = async (req, res) => {
  const { nom, prenom, email, password, categorie, departement } = req.body;

  const admin = new Admin({ nom, prenom, email, password, categorie, departement });

  try {
    await admin.save();
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
    res.status(201).json({ admin, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

authController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
    res.status(200).json({ admin, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = authController;
