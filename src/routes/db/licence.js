const express = require('express');
const prisma = require('../../prisma.js');

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const licences = await prisma.licence.findMany();
        res.json(licences);
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch licences' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const licence = await prisma.licence.findUnique({
            where: { id: parseInt(id) },
        });
        if (licence) {
            res.json(licence);
        } else {
            res.status(404).json({ error: 'Licence not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch licence' });
    }
});

router.get('/:number', async (req, res) => {
    const { number } = req.params;
    try {
        const licence = await prisma.licence.findUnique({
            where: { number: number },
        });
        if (licence) {
            res.json(licence);
        } else {
            res.status(404).json({ error: 'Licence not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch licence' });
    }
});

router.get('/:types', async (req, res) => {
    const { types } = req.params;
    try {
        const licences = await prisma.licence.findMany({
            where: { type: types },
        });
        if (licences) {
            res.json(licences);
        } else {
            res.status(404).json({ error: 'Licences not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch licences' });
    }
});

router.post('/add', async (req, res) => {
    const { number, type, price } = req.body;
    try {
        const newLicence = await prisma.licence.create({
            data: { number, type, price },
        });
        res.status(201).json(newLicence);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create licence' });
    }
});

module.exports = router;