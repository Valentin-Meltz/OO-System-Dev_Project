const express = require('express');
const router  = express.Router();

const membersRoutes = require('./db/member.js');
const membershipRoutes = require('./db/membership.js');
const licencesRoutes = require('./db/licence.js');
const contactsRoutes = require('./db/contact.js');
const competitionsRoutes = require('./db/competition.js');
const addressRoutes = require('./db/address.js');

router.get('/', (req, res) => {
  res.send('Efrei 2025 project developed by Valentin Meltz and Paul Monie')
});

router.use('/member', membersRoutes);
router.use('/membership', membershipRoutes);
router.use('/licence', licencesRoutes);
router.use('/contact', contactsRoutes);
router.use('/competition', competitionsRoutes);
router.use('/address', addressRoutes);

module.exports = router;
