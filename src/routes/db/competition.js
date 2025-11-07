const express = require('express');
const prisma = require('../../prisma.js');

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const competitions = await prisma.competition.findMany();
        res.json(competitions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch competitions' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const competition = await prisma.competition.findUnique({
            where: { id: parseInt(id) },
        });
        if (competition) {
            res.json(competition);
        } else {
            res.status(404).json({ error: 'Competition not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch competition' });
    }
});

router.get('/byClub/:club', async (req, res) => {
    const { club } = req.params;
    try {
        const competitions = await prisma.competition.findMany({
            where: { club: club },
        });
        if (competitions.length > 0) {
            res.json(competitions);
        } else {
            res.status(404).json({ error: 'No competitions found for this club' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch competitions' });
    }
});

router.get('/byDate/:date', async (req, res) => {
    const { date } = req.params;
    try {
        const competitions = await prisma.competition.findMany({
            where: { date: date },
        });
        if (competitions.length > 0) {
            res.json(competitions);
        } else {
            res.status(404).json({ error: 'No competitions found for this date' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch competitions' });
    }
});

router.get('/byAddress/:addressId', async (req, res) => {
    const { addressId } = req.params;
    try {
        const competitions = await prisma.competition.findMany({
            where: { addressId: parseInt(addressId) },
        });
        if (competitions.length > 0) {
            res.json(competitions);
        } else {
            res.status(404).json({ error: 'No competitions found for this address' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch competitions' });
    }
});

router.post('/add', async (req, res) => {
    const {club, date, addressId } = req.body;
    try {
        const newCompetition = await prisma.competition.create({
            data: { club: club, date: date, addressId: addressId },
        });
        res.status(201).json(newCompetition);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create competition' });
    }
});

module.exports = router;