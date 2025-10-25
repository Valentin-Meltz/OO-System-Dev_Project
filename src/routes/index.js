const express = require('express');
const router  = express.Router();

const membersRoutes = require('./db/member.js');

router.get('/', (req, res) => {
  res.send('Ça marche !');
});

router.use('/members', membersRoutes);

module.exports = router;