const Employe = require('../models/employe');
const Equipe = require('../models/equipe');
const nodemailer = require('nodemailer');

const employeController = {};

//Get all employees
employeController.getAllEmployes = async (req, res) => {
    try {
        const employes = await Employe.find();
        res.status(200).json({ employes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Get an employee by his id
employeController.getEmployeById = async (req, res) => {
    const { id } = req.params;

    try {
        const employe = await Employe.findById(id);
        if (!employe) {
            return res.status(404).json({ message: 'Employe not found' });
        }
        res.status(200).json({ employe });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//add new employee
employeController.createEmploye = async (req, res) => {
    const { nom, prenom, categorie, specialite, numCnss, age, disponible } = req.body;

    const employe = new Employe({ nom, prenom, categorie, specialite, numCnss, age, disponible });

    try {
        await employe.save();
        res.status(201).json({ employe });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//update an existing employee
employeController.updateEmploye = async (req, res) => {
    const { id } = req.params;

    try {
        const employe = await Employe.findByIdAndUpdate(id, req.body, { new: true });

        if (!employe) {
            return res.status(404).json({ message: 'Employe not found' });
        }

        res.status(200).json({ employe });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//delete an existing employee
employeController.deleteEmploye = async (req, res) => {
    const { id } = req.params;

    try {
        const employe = await Employe.findByIdAndDelete(id);

        if (!employe) {
            return res.status(404).json({ message: 'Employe not found' });
        }

        res.status(200).json({ message: 'Employe deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//assign an available employee to an equipe by sending him an email:
employeController.assignEmployeToEquipe = async (req, res) => {
    const { employeId, equipeId } = req.params;

    try {
        const employe = await Employe.findById(employeId);
        if (!employe) {
            return res.status(404).json({ message: 'Employe not found' });
        }

        const equipe = await Equipe.findById(equipeId);
        if (!equipe) {
            return res.status(404).json({ message: 'Equipe not found' });
        }

        if (!employe.disponible) {
            return res.status(400).json({ message: 'Employe is not available to be assigned to a team' });
        }

        equipe.employes.push(employe);
        employe.equipe = equipe;
        employe.disponible = false;

        await equipe.save();
        await employe.save();

        // Send email notification
        const transporter = nodemailer.createTransport({
            service: 'gmail',


            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: employe.email,
            subject: 'Mission Assignment',
            text: `You have been assigned to the team ${equipe.nom} for the upcoming mission.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`Email sent to ${employe.email}: ` + info.response);
            }
        });

        res.status(200).json({ message: 'Employe assigned to equipe successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

