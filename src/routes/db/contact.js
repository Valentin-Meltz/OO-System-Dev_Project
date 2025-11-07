const express = require('express');
const prisma = require('../../prisma.js');

const router = express.Router();

router.get('/name', async (req, res) => {
    const { firstname, lastname } = req.body;
    try {
        const contact = await prisma.contact.findUnique({
            where: { firstname: firstname, lastname: lastname },
        });
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch contact' });
    }
});

router.get('/:phoneNumber', async (req, res) => {
    const { phoneNumber } = req.params;
    try {
        const contact = await prisma.contact.findUnique({
            where: { phoneNumber: phoneNumber },
        });
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch contact' });
    }
});

router.post('/add', async (req, res) => {
    const { firstname, lastname, phoneNumber } = req.body;
    try {
        const newContact = await prisma.contact.create({
            data: { firstname: firstname, lastname: lastname, phoneNumber: phoneNumber },
        });
        res.status(201).json(newContact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create contact' });
    }
});

module.exports = router;
