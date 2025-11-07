const express = require('express');
const prisma = require('../../prisma.js');

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const address = await prisma.address.findMany();
        res.json(address);
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch address' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const address = await prisma.address.findUnique({
            where: { id: parseInt(id) },
        });
        if (address) {
            res.json(address);
        } else {
            res.status(404).json({ error: 'Address not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch address' });
    }
});

router.get('/getId', async (req, res) => {
    const { address, zipcode, city } = req.body;
    try {
        const addressId = await prisma.licence.findUnique({
            where: { address: address, zipcode: zipcode, city: city },
        });
        if (addressId) {
            res.json(addressId);
        } else {
            res.status(404).json({ error: 'ID not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch ID' });
    }
});

router.post('/add', async (req, res) => {
    const { address, zipcode, city } = req.body;
    try {
        const newAddress = await prisma.address.create({
            data: { address: address, zipcode: zipcode, city: city },
        });
        res.status(201).json(newAddress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create address' });
    }
});

module.exports = router;
