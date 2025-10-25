const express = require('express');
const prisma = require('../../prisma.js');

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const members = await prisma.member.findMany();
    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const member = await prisma.member.findUnique({
      where: { id: parseInt(id) },
    });
    if (member) {
      res.json(member);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.get('/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const member = await prisma.member.findUnique({
      where: { email: email },
    });
    if (member) {
      res.json(member);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.member.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

router.post('/create', async (req, res) => {
  const { email, firstname, lastname, birthdate, phoneNumber, equipment, addressId, membershipId, licenceId, contactId } = req.body;
  try {
    const newMember = await prisma.member.create({
      data: { email, firstname, lastname, birthdate, phoneNumber, equipment, addressId, membershipId, licenceId, contactId },
    });
    res.status(201).json(newMember);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { email, firstname, lastname, birthdate, phoneNumber, equipment, addressId, membershipId, licenceId, contactId } = req.body;
  try {
    const updatedMember = await prisma.member.update({
      where: { id: parseInt(id) },
      data: { email, firstname, lastname, birthdate, phoneNumber, equipment, addressId, membershipId, licenceId, contactId },
    });
    res.json(updatedMember);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

module.exports = router;
