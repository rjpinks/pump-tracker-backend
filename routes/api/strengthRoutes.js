const router = require('express').Router();
const Strength = require('../../models/Strength');

router.get('/', async (req, res) => {
    try {
      const strengthData = await Strength.findAll();
      res.status(200).json(strengthData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;