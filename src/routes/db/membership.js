const express = require('express');
const prisma = require('../../prisma.js');

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const memberships = await prisma.membership.findMany();
        res.json(memberships);
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch memberships' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const membership = await prisma.membership.findUnique({
            where: { id: parseInt(id) },
        });
        if (membership) {
            res.json(membership);
        } else {
            res.status(404).json({ error: 'Membership not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch membership' });
    }
});

router.get('/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const membership = await prisma.membership.findUnique({
            where: { name: name },
        });
        if (membership) {
            res.json(membership);
        } else {
            res.status(404).json({ error: 'Membership not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch membership' });
    }
});

router.post('/add', async (req, res) => {
    const { name, price } = req.body;
    try {
        const newMembership = await prisma.membership.create({
            data: { name, price },
        });
        res.status(201).json(newMembership);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create mebership' });
    }
});

module.exports = router;
