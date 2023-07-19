const router = require('express').Router();
const hiitRoutes = require('./hiitRoutes');
const lissRoutes = require('./lissRoutes');
const strengthRoutes = require('./strengthRoutes');

router.use('/hiit', hiitRoutes);
router.use('/strength', strengthRoutes);
router.use('/liss', lissRoutes);

module.exports = router;