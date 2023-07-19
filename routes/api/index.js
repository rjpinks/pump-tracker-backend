const router = require('express').Router();
const hiitRoutes = require('./hiitRoutes');
const lissRoutes = require('./lissRoutes');
const strengthRoutes = require('./strengthRoutes');
const profileRoutes = require('./profileRoutes');

router.use('/hiit', hiitRoutes);
router.use('/strength', strengthRoutes);
router.use('/liss', lissRoutes);
router.use('/profile', profileRoutes);

module.exports = router;